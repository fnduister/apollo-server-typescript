import {
  UserInput,
  MutationCreateUserArgs,
  AuthData,
  MutationLoginArgs,
  QueryUserArgs,
  User,
  UserResolvers,
  MutationFollowUserArgs,
  MutationUnfollowUserArgs,
  MutationLikePostArgs
} from '../generated/graphql';
import bcrypt from 'bcryptjs';

import UserModel, { UserOmitId, UserDb } from '../models/userModel';
import jwt from 'jsonwebtoken';

import environment from './../environment';
import { Model } from './../models/index';
import { dateToString } from './helpers';
import { Context } from './../main.d';
import { PostDb } from '../models/postModel';

export const UserTransformResolvers: UserResolvers = {
  lastSeen: ({ lastSeen }: User) => { console.log(dateToString(lastSeen)); return dateToString(lastSeen) },
  posts: async ({ posts, id }: User, _args, { loaders }: Context) => {
    try {
      const foundPosts = await loaders.post.loadMany(posts) as PostDb[];
      if (!foundPosts) {
        throw new Error('post not found for user: ' + id);
      }
      return Promise.resolve(foundPosts);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  following: async ({ following, id }: User, _args, { loaders }: Context) => {
    try {
      const foundFollowing = (await loaders.user.loadMany(following) as UserDb[]);
      if (!foundFollowing) {
        throw new Error('following not found for user: ' + id);
      }
      return Promise.resolve(foundFollowing);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  followers: async ({ followers, id }: User, _args, { loaders }: Context) => {
    try {
      const foundFollowers = (await loaders.user.loadMany(
        followers
      )) as UserDb[];
      if (!foundFollowers) {
        throw new Error('followers not found for user: ' + id);
      }
      return Promise.resolve(foundFollowers);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export const batchUsers = async (keys: readonly unknown[], models: Model) => {
  try {
    const users: UserDb[] = await models.User.find({ _id: { $in: keys } });
    if (!users) {
      throw new Error('no users was found with those ids');
    }
    return users;
  } catch (err) {
    console.error(err);
    throw err;
  }
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

export const follow = async (_parent: any, { userId }:MutationFollowUserArgs, { user, models }: Context) => {
  if (!user) {
    throw new Error('you need to be connected to follow someone');
  }
  if (user.userId === userId) {
    throw new Error("you can't unfollow yourself");
  }

  // test if you're already following that user.
  // if ()) {
  //   throw new Error('you\'re already following that user ');
  // };

  const userToFollow = await models.User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { followers: user.userId } }, { new: true }
  );

  if (!userToFollow) {
    throw new Error('no user found');
  }

  await models.User.update(
    { _id: user.userId },
    { $addToSet: { following: userToFollow.id } }

  );

  return userToFollow.followers.length;
}

/**
 * @param {*} _parent
 * @param {MutationUnfollowUserArgs} { userId }
 * @param {Context} { user, models }
 * @returns how many poeple are following
 */
export const unfollow = async (
  _parent: any,
  { userId }: MutationUnfollowUserArgs,
  { user, models }: Context
) => {
  if (!user) {
    throw new Error('you need to be connected to unfollow someone');
  }
  if (user.userId === userId) {
    throw new Error('you can\'t unfollow yourself');
  }
  const userToUnfollow = await models.User.findOneAndUpdate(
    { _id: userId },
    { $pull: { followers: user.userId } },
    {
      new: true
    }
  );

  if (!userToUnfollow) {
    throw new Error('this user does not exist anymore: ' + userId);
  };

  await models.User.update(
    { _id: user.userId },
    { $pull: { following: userToUnfollow.id } }

  );

  return userToUnfollow.followers.length;
};

/**
 * @param {*} _parent
 * @param {MutationLikePostArgs} { postId }
 * @param {Context} { user, models }
 * @returns the amount of likes from the post
 */
export const likePost = async (
  _parent: any,
  { postId }: MutationLikePostArgs,
  { user, models }: Context
) => {
  if (!user) {
    throw new Error('you need to be connected to like a post');
  }

  const postToLike = await models.Post.findOneAndUpdate(
    { _id: postId },
    { $addToSet: { likedBy: user.userId } },
    {
      new: true
    }
  );

  if (!postToLike) {
    throw new Error('this post does not exist anymore: ' + postId);
  }

  return postToLike.likedBy.length;
};

/**
 * @param {*} _parent
 * @param {MutationLoginArgs} { username, password }
 * @returns {Promise<AuthData>}
 */
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
