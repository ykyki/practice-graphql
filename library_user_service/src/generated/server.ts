import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  LibraryUserId: { input: any; output: any; }
  MutationKey: { input: any; output: any; }
};

export type AddLibraryUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type IsLibraryUser = {
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['LibraryUserId']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type LibraryUser = LibraryUserActive | LibraryUserInactive;

export type LibraryUserActive = IsLibraryUser & {
  __typename?: 'LibraryUserActive';
  activatedAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['LibraryUserId']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type LibraryUserInactive = IsLibraryUser & {
  __typename?: 'LibraryUserInactive';
  activatedAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['LibraryUserId']['output'];
  inactivatedAt: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addLibraryUser: LibraryUser;
  createMutationKey: Scalars['MutationKey']['output'];
  deleteLibraryUser: Scalars['Boolean']['output'];
};


export type MutationAddLibraryUserArgs = {
  input: AddLibraryUserInput;
};


export type MutationDeleteLibraryUserArgs = {
  id: Scalars['LibraryUserId']['input'];
};

export type Query = {
  __typename?: 'Query';
  libraryUser?: Maybe<LibraryUser>;
  libraryUsers: Array<LibraryUser>;
  verifyMutationKey: Scalars['Boolean']['output'];
};


export type QueryLibraryUserArgs = {
  id: Scalars['LibraryUserId']['input'];
};


export type QueryVerifyMutationKeyArgs = {
  key: Scalars['MutationKey']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  LibraryUser: ( LibraryUserActive ) | ( LibraryUserInactive );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  IsLibraryUser: ( LibraryUserActive ) | ( LibraryUserInactive );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddLibraryUserInput: AddLibraryUserInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  IsLibraryUser: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['IsLibraryUser']>;
  LibraryUser: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['LibraryUser']>;
  LibraryUserActive: ResolverTypeWrapper<LibraryUserActive>;
  LibraryUserId: ResolverTypeWrapper<Scalars['LibraryUserId']['output']>;
  LibraryUserInactive: ResolverTypeWrapper<LibraryUserInactive>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationKey: ResolverTypeWrapper<Scalars['MutationKey']['output']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddLibraryUserInput: AddLibraryUserInput;
  Boolean: Scalars['Boolean']['output'];
  IsLibraryUser: ResolversInterfaceTypes<ResolversParentTypes>['IsLibraryUser'];
  LibraryUser: ResolversUnionTypes<ResolversParentTypes>['LibraryUser'];
  LibraryUserActive: LibraryUserActive;
  LibraryUserId: Scalars['LibraryUserId']['output'];
  LibraryUserInactive: LibraryUserInactive;
  Mutation: {};
  MutationKey: Scalars['MutationKey']['output'];
  Query: {};
  String: Scalars['String']['output'];
};

export type IsLibraryUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['IsLibraryUser'] = ResolversParentTypes['IsLibraryUser']> = {
  __resolveType: TypeResolveFn<'LibraryUserActive' | 'LibraryUserInactive', ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['LibraryUserId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type LibraryUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['LibraryUser'] = ResolversParentTypes['LibraryUser']> = {
  __resolveType: TypeResolveFn<'LibraryUserActive' | 'LibraryUserInactive', ParentType, ContextType>;
};

export type LibraryUserActiveResolvers<ContextType = any, ParentType extends ResolversParentTypes['LibraryUserActive'] = ResolversParentTypes['LibraryUserActive']> = {
  activatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['LibraryUserId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface LibraryUserIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LibraryUserId'], any> {
  name: 'LibraryUserId';
}

export type LibraryUserInactiveResolvers<ContextType = any, ParentType extends ResolversParentTypes['LibraryUserInactive'] = ResolversParentTypes['LibraryUserInactive']> = {
  activatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['LibraryUserId'], ParentType, ContextType>;
  inactivatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addLibraryUser?: Resolver<ResolversTypes['LibraryUser'], ParentType, ContextType, RequireFields<MutationAddLibraryUserArgs, 'input'>>;
  createMutationKey?: Resolver<ResolversTypes['MutationKey'], ParentType, ContextType>;
  deleteLibraryUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteLibraryUserArgs, 'id'>>;
};

export interface MutationKeyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MutationKey'], any> {
  name: 'MutationKey';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  libraryUser?: Resolver<Maybe<ResolversTypes['LibraryUser']>, ParentType, ContextType, RequireFields<QueryLibraryUserArgs, 'id'>>;
  libraryUsers?: Resolver<Array<ResolversTypes['LibraryUser']>, ParentType, ContextType>;
  verifyMutationKey?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryVerifyMutationKeyArgs, 'key'>>;
};

export type Resolvers<ContextType = any> = {
  IsLibraryUser?: IsLibraryUserResolvers<ContextType>;
  LibraryUser?: LibraryUserResolvers<ContextType>;
  LibraryUserActive?: LibraryUserActiveResolvers<ContextType>;
  LibraryUserId?: GraphQLScalarType;
  LibraryUserInactive?: LibraryUserInactiveResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationKey?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
};

