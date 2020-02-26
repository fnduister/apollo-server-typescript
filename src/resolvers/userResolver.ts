import { UserInput, User, MutationCreateUserArgs } from '../generated/graphql';
import bcrypt from 'bcryptjs';

import UserModel from '../models/userModel';
// import jwt from 'jsonwebtoken';
// import transformUser from './merge';
// import { UserDb } from './../models/userModel';

// export const users = async () => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const users = await UserModel.find().populate('createdEvents');
//     return users.map(transformUser);
//   } catch (err) {
//     throw err;
//   }
// };

export const createUser = async (
  _parent: any,
  { userInput }: MutationCreateUserArgs
): Promise<User> => {
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
      const infoUser: Omit<User, 'id'> = {
        username: userInput.username,
        lastSeen: Date(),
        email: userInput.email,
        password: cryptedPassword,
        posts: [],
        followers: [],
        following: []
      };
      const newUser = new UserModel(infoUser);
      const result = await newUser.save();
      return result as User;
    } else {
      throw new Error('user already exist');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// export const login = async ({ username, password }: {username: string, password: string}) => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const currentUser = await UserModel.findOne({ username });
//     if (!currentUser) {
//       throw new Error('username or password not valid');
//     }
//     if (!(await bcrypt.compare(password, currentUser.password))) {
//       throw new Error('username or password not valid');
//     }
//     const token = jwt.sign(
//       { userId: currentUser.id, username: currentUser.username },
//       'somereallysuperkeybro',
//       { expiresIn: '1h' }
//     );
//     return { userId: currentUser.id, token, tokenExpiration: 1 };
//   } catch (err) {
//     throw err;
//   }
// };
