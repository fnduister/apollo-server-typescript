import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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

export type AuthData = {
   __typename?: 'AuthData',
  /** jwt token for authentication. */
  token: Scalars['String'],
  /** expiration time for the jwt token. */
  tokenExpiration: Scalars['Int'],
  /** user identification. */
  userId: Scalars['ID'],
};



export type Mutation = {
   __typename?: 'Mutation',
  /** Publish post. */
  publishPost: Post,
  /** login user. */
  login: AuthData,
  /** create new user. */
  createUser?: Maybe<User>,
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
  postInput: PublishPostInput
};


export type MutationLoginArgs = {
  username: Scalars['String'],
  password: Scalars['String']
};


export type MutationCreateUserArgs = {
  userInput?: Maybe<UserInput>
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
  publishedAt: Scalars['DateTime'],
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
  /** Get post by ID. */
  posts?: Maybe<Array<Maybe<Post>>>,
  /** Get post by ID. */
  user?: Maybe<User>,
  /** Get post by ID. */
  users?: Maybe<Array<Maybe<User>>>,
};


export type QueryPostArgs = {
  id: Scalars['ID']
};


export type QueryPostsArgs = {
  id: Scalars['ID']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};


export type QueryUsersArgs = {
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
  password?: Maybe<Scalars['String']>,
  /** Date last seen. */
  lastSeen: Scalars['DateTime'],
  /** Posts published by user. */
  posts: Array<Maybe<Post>>,
  /** Users that this user is following. */
  following: Array<Maybe<User>>,
  /** Users that this user is followed by. */
  followers: Array<Maybe<User>>,
};

export type UserInput = {
  /** user's username. */
  username: Scalars['String'],
  /** user's password. */
  password?: Maybe<Scalars['String']>,
  /** user's email. */
  email: Scalars['String'],
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Post: ResolverTypeWrapper<Post>,
  String: ResolverTypeWrapper<Scalars['String']>,
  User: ResolverTypeWrapper<User>,
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  Mutation: ResolverTypeWrapper<{}>,
  PublishPostInput: PublishPostInput,
  AuthData: ResolverTypeWrapper<AuthData>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  UserInput: UserInput,
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  ID: Scalars['ID'],
  Post: Post,
  String: Scalars['String'],
  User: User,
  EmailAddress: Scalars['EmailAddress'],
  DateTime: Scalars['DateTime'],
  Mutation: {},
  PublishPostInput: PublishPostInput,
  AuthData: AuthData,
  Int: Scalars['Int'],
  UserInput: UserInput,
  UnsignedInt: Scalars['UnsignedInt'],
  Boolean: Scalars['Boolean'],
}>;

export type AuthDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthData'] = ResolversParentTypes['AuthData']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  tokenExpiration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  publishPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationPublishPostArgs, 'postInput'>>,
  login?: Resolver<ResolversTypes['AuthData'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'username' | 'password'>>,
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, MutationCreateUserArgs>,
  followUser?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationFollowUserArgs, 'userId'>>,
  unfollowUser?: Resolver<ResolversTypes['UnsignedInt'], ParentType, ContextType, RequireFields<MutationUnfollowUserArgs, 'userId'>>,
  likePost?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationLikePostArgs, 'postId'>>,
}>;

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  publishedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  likedBy?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>,
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType, RequireFields<QueryPostsArgs, 'id'>>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryUsersArgs, 'id'>>,
}>;

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt'
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>,
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastSeen?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  posts?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType>,
  following?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  followers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AuthData?: AuthDataResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
  EmailAddress?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  UnsignedInt?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

import gql from 'graphql-tag';
