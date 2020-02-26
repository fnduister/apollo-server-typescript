import {
  DateTimeResolver,
  EmailAddressResolver,
  UnsignedIntResolver
} from 'graphql-scalars';
import * as userResolvers from './userResolver';
import { Resolvers, MutationResolvers } from '../generated/graphql';

const mutationResolvers: MutationResolvers = {
  ...userResolvers
}

const resolvers:Resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  UnsignedInt: UnsignedIntResolver,
  Mutation: mutationResolvers
};

export default resolvers;
