import UserModel, { UserDb } from '../models/userModel';
import PostModel, { PostDb } from '../models/postModel';
import mongoose from 'mongoose';

export interface Model {
  Post: mongoose.Model<PostDb, {}>;
  User: mongoose.Model<UserDb, {}>;
}

const models: Model = {
  Post: PostModel,
  User: UserModel
}

export default models;
