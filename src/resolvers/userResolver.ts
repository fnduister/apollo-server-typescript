import {
  UserInput,
  MutationCreateUserArgs,
  AuthData,
  MutationLoginArgs,
  QueryUserArgs,
  User,
  UserResolvers
} from '../generated/graphql';
import bcrypt from 'bcryptjs';

import UserModel, { UserOmitId, UserDb } from '../models/userModel';
import jwt from 'jsonwebtoken';

import environment from './../environment';
import { Model } from './../models/index';
import { dateToString } from './helpers';
import { Context } from './../main.d';

export const UserTransformResolvers: UserResolvers = {
  lastSeen: ({ lastSeen }: User) => { console.log(dateToString(lastSeen)); return dateToString(lastSeen) },
  posts: async ({ posts }: User, _args, { models }: Context) => {
    const foundPosts = models.Post.find({ _id: { $in: posts } });
    console.log('TCL: foundPosts', foundPosts)
    return Promise.resolve(foundPosts);
  },
  following: async ({ following }: User, _args, { loaders }) => {
    return loaders.post.load(following);
  },
  followers: async ({ followers }: User, _args, { loaders }) => {
    return loaders.post.load(followers);
  }
};

export const batchUsers = async (keys: readonly unknown[], models: Model) => {
  const users: UserDb[] = await models.User.find({ _id: { $in: keys } });
  return keys.map(key => users.find(user => user.id === key));
};

export const user = async (_parent: any, { id }: QueryUserArgs, { models }:{models: Model}): Promise<UserDb> => {
  try {
    const foundUser = await models.User.findById(id);
    if (!foundUser) {
      throw new Error("this user doesn't exit!!");
    }
    return Promise.resolve(foundUser);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const users = async (): Promise<UserDb[]> => {
  try {
    const foundUsers = await UserModel.find();
    return Promise.resolve(foundUsers);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createUser = async (
  _parent: any,
  { userInput }: MutationCreateUserArgs
): Promise<UserDb> => {
  try {
    if (
      !(await UserModel.findOne({
        username: userInput?.username,
        email: userInput?.email
      } as UserInput))
    ) {
      if (!userInput?.password) {
        throw new Error('no password was provided');
      }
      const cryptedPassword: string = await bcrypt.hash(
        userInput.password,
        12
      );
      const infoUser: UserOmitId = {
        username: userInput.username,
        lastSeen: Date(),
        email: userInput.email,
        password: cryptedPassword,
        posts: [],
        followers: [],
        following: []
      };
      const newUser = new UserModel(infoUser);
      return await newUser.save();
    } else {
      throw new Error('user already exist');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const login = async (
  _parent: any
  , { username, password }: MutationLoginArgs
): Promise<AuthData> => {
  try {
    const currentUser = await UserModel.findOne({ username });
    if (!currentUser) {
      throw new Error('username or password not valid');
    }
    if (
      currentUser.password &&
             !(await bcrypt.compare(password, currentUser.password))
    ) {
      throw new Error('username or password not valid');
    }
    if (!environment.passwordDecripter) {
      throw new Error('not able to connect: environement error');
    }
    const token = jwt.sign(
      { userId: currentUser.id, username: currentUser.username },
      environment.passwordDecripter,
      { expiresIn: '1h' }
    );
    return Promise.resolve({
      userId: currentUser.id,
      token,
      tokenExpiration: 1
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
