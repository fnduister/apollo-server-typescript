import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ObjectID } from 'mongodb';

import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  EmailAddress: any,
  DateTime: any,
  UnsignedInt: any,
};

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  /** Publish post. */
  publishPost: Post,
  /**
 * Follow user.
   * Returns the updated number of followers.
 */
  followUser: Scalars['Int'],
  /**
 * Unfollow user.
   * Returns the updated number of followers.
 */
  unfollowUser: Scalars['UnsignedInt'],
  /**
 * Like post.
   * Returns the updated number of likes received.
 */
  likePost: Scalars['Int'],
};

export type MutationPublishPostArgs = {
  input: PublishPostInput
};

export type MutationFollowUserArgs = {
  userId: Scalars['ID']
};

export type MutationUnfollowUserArgs = {
  userId: Scalars['ID']
};

export type MutationLikePostArgs = {
  postId: Scalars['ID']
};

export type Post = {
   __typename?: 'Post',
  /** Post ID. */
  id: Scalars['ID'],
  /** Post title. */
  title: Scalars['String'],
  /** Post content. */
  content: Scalars['String'],
  /** Post Author. */
  author: User,
  /** Post published timestamp. */
  publishedAt?: Maybe<Scalars['DateTime']>,
  /** Users who like this post. */
  likedBy?: Maybe<Array<Maybe<User>>>,
};

/** Publish post input. */
export type PublishPostInput = {
  /** Post title. */
  title: Scalars['String'],
  /** Post content. */
  content: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  /** Get post by ID. */
  post?: Maybe<Post>,
};

export type QueryPostArgs = {
  id: Scalars['ID']
};

export type User = {
   __typename?: 'User',
  /** User ID. */
  id: Scalars['ID'],
  /** User's username. */
  username: Scalars['String'],
  /** User's email address. */
  email: Scalars['EmailAddress'],
  /** User's password. */
  password: Scalars['String'],
  /** Date last seen. */
  lastSeen: Scalars['DateTime'],
  /** User's last name. */
  lastName: Scalars['String'],
  /** Posts published by user. */
  posts: Array<Maybe<Post>>,
  /** Users that this user is following. */
  following: Array<Maybe<User>>,
  /** Users that this user is followed by. */
  followers: Array<Maybe<User>>,
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Post: ResolverTypeWrapper<Post>,
  String: ResolverTypeWrapper<Scalars['String']>,
  User: ResolverTypeWrapper<User>,
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  Mutation: ResolverTypeWrapper<{}>,
  PublishPostInput: PublishPostInput,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  AdditionalEntityFields: AdditionalEntityFields,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Post: Post,
  String: Scalars['String'],
  User: User,
  EmailAddress: Scalars['EmailAddress'],
  DateTime: Scalars['DateTime'],
  Mutation: {},
  PublishPostInput: PublishPostInput,
  Int: Scalars['Int'],
  UnsignedInt: Scalars['UnsignedInt'],
  Boolean: Scalars['Boolean'],
  AdditionalEntityFields: AdditionalEntityFields,
};

export type UnionDirectiveArgs = { discriminatorField?: Maybe<Scalars['String']>,
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>> };

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = { discriminatorField: Scalars['String'],
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>> };

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = { embedded?: Maybe<Scalars['Boolean']>,
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>> };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = { overrideType?: Maybe<Scalars['String']> };

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = { overrideType?: Maybe<Scalars['String']> };

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = { path: Scalars['String'] };

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  publishPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationPublishPostArgs, 'input'>>,
  followUser?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationFollowUserArgs, 'userId'>>,
  unfollowUser?: Resolver<ResolversTypes['UnsignedInt'], ParentType, ContextType, RequireFields<MutationUnfollowUserArgs, 'userId'>>,
  likePost?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationLikePostArgs, 'postId'>>,
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  publishedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  likedBy?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>,
};

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt'
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>,
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lastSeen?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  posts?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType>,
  following?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  followers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType,
  EmailAddress?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  UnsignedInt?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>,
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>,
  entity?: EntityDirectiveResolver<any, any, ContextType>,
  column?: ColumnDirectiveResolver<any, any, ContextType>,
  id?: IdDirectiveResolver<any, any, ContextType>,
  link?: LinkDirectiveResolver<any, any, ContextType>,
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>,
  map?: MapDirectiveResolver<any, any, ContextType>,
};

/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
export type PostDbObject = {
  _id: ObjectID,
  title: string,
  content: string,
  author: UserDbObject['_id'],
  publishedAt?: Date,
  likedBy?: Maybe<Array<Maybe<UserDbObject['_id']>>>,
};

export type UserDbObject = {
  _id: ObjectID,
  username: string,
  email: string,
  password: string,
  lastSeen: any,
  lastName: Date,
  posts: Array<Maybe<PostDbObject['_id']>>,
  following: Array<Maybe<UserDbObject['_id']>>,
  followers: Array<Maybe<UserDbObject['_id']>>,
};
