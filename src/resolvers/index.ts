import {
  DateTimeResolver,
  EmailAddressResolver,
  UnsignedIntResolver
} from 'graphql-scalars';
import * as userResolvers from './userResolver';
import * as postResolvers from './postResolver';
import { Resolvers, MutationResolvers, QueryResolvers } from '../generated/graphql';

const mutationResolvers: MutationResolvers = {
  ...userResolvers,
  ...postResolvers
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
