import { Model } from './models/index';
import DataLoader from 'dataloader';
import { UserDb } from './models/userModel';
import { PostDb } from './models/postModel';
import { AuthData } from './generated/graphql';

export interface Context {
  user: JWTResponse | null;
  models: Model;
  loader: Loaders;
}

export interface Loaders {
    user: DataLoader<unknown, UserDb | undefined, unknown>;
    post: DataLoader<unknown, PostDb | undefined, unknown>;
}

export interface JWTResponse {
    userId: string;
    username: string;
    iat: number;
    exp: number;
}
