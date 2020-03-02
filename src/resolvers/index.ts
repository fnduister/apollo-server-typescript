import {
  DateTimeResolver,
  EmailAddressResolver,
  UnsignedIntResolver
} from 'graphql-scalars';
import { createUser, login } from './userResolver';
import { publishPost } from './postResolver';
import { Resolvers, MutationResolvers, QueryResolvers } from '../generated/graphql';

const mutationResolvers: MutationResolvers = {
  createUser,
  login,
  publishPost
}

const queryResolvers: QueryResolvers = {
  // ...userResolvers
}

const resolvers:Resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  UnsignedInt: UnsignedIntResolver,
  Mutation: mutationResolvers,
  Query: queryResolvers
};

export default resolvers;
