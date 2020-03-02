import { UserInput, MutationCreateUserArgs, AuthData, MutationLoginArgs } from '../generated/graphql';
import bcrypt from 'bcryptjs';

import UserModel, { UserOmitId, UserDb } from '../models/userModel';
import jwt from 'jsonwebtoken';

// import transformUser from './merge';
// import { UserDb } from './../models/userModel';
import environment from './../environment';

export const users = async (userIds: string[]) => {
  try {
    const users = await UserModel.find({ _id: { $in: userIds } });
    return Promise.resolve(users);
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
    console.log('TCL: currentUser', currentUser);
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
