import {
  DateTimeResolver,
  EmailAddressResolver,
  UnsignedIntResolver
} from 'graphql-scalars';
import {
  createUser,
  login,
  users,
  follow,
  likePost,
  unfollow,
  user,
  UserTransformResolvers
} from './userResolver';
import { publishPost } from './postResolver';
import { Resolvers, MutationResolvers, QueryResolvers } from '../generated/graphql';

const mutationResolvers: MutationResolvers = {
  createUser,
  login,
  publishPost,
  followUser: follow,
  unfollowUser: unfollow,
  likePost
}

const queryResolvers: QueryResolvers = {
  // ...userResolvers
  users, user
};

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  UnsignedInt: UnsignedIntResolver,
  Mutation: mutationResolvers,
  Query: queryResolvers,
  User: UserTransformResolvers
};

export default resolvers;
