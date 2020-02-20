// eslint-disable-next-line no-unused-vars
import { User, UserInput, UserDbObject } from '../generated/graphql';
import bcrypt from 'bcryptjs';

import UserModel, { IUser } from '../models/userModel';
const jwt = require('jsonwebtoken');
const { transformUser } = require('./merge');

exports.users = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const users = await UserModel.find().populate(
      'createdEvents'
    );
    return users.map(transformUser);
  } catch (err) {
    throw err;
  }
};

exports.createUser = async ({ userInput }: { userInput: UserInput }) => {
  try {
    if (
      !(await UserModel.findOne({
        username: userInput.username,
        email: userInput.email
      }))
    ) {
      if (userInput) { }
      let cryptedPassword: string;
      if (userInput.password) {
        cryptedPassword = await bcrypt.hash(userInput.password, 12);
      }
      const newUser = new UserModel({
        username: userInput.username,
        lastSeen: Date(),
        email: userInput.email,
        password: cryptedPassword,
        createEvents: []
      });
      const result = await newUser.save();
      return transformUser(result);
    } else {
      throw new Error('user already exist');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.login = async ({ username, password }: {username: string, password: string}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const currentUser = await UserModel.findOne({ username });
    if (!currentUser) {
      throw new Error('username or password not valid');
    }
    if (!(await bcrypt.compare(password, currentUser.password))) {
      throw new Error('username or password not valid');
    }
    const token = jwt.sign(
      { userId: currentUser.id, username: currentUser.username },
      'somereallysuperkeybro',
      { expiresIn: '1h' }
    );
    return { userId: currentUser.id, token, tokenExpiration: 1 };
  } catch (err) {
    throw err;
  }
};
