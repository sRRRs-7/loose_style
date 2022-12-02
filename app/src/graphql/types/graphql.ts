import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

export type Address = Node & {
  __typename?: 'Address';
  address_id: Scalars['Int'];
  building: Scalars['String'];
  city: Scalars['String'];
  destination_family_name: Scalars['String'];
  destination_first_name: Scalars['String'];
  id: Scalars['ID'];
  phone: Scalars['String'];
  postcode: Scalars['Int'];
  prefecture_code: Scalars['String'];
  street: Scalars['String'];
};

export type Address_User = {
  __typename?: 'Address_user';
  address_id: Scalars['Int'];
  id: Scalars['ID'];
  user_id: Scalars['String'];
};

export type AuthUser = Node & {
  __typename?: 'AuthUser';
  id: Scalars['ID'];
  sex: Scalars['String'];
  username: Scalars['String'];
};

export type Cart_Item = Node & {
  __typename?: 'Cart_item';
  id: Scalars['ID'];
  product_id: Scalars['Int'];
  user_id: Scalars['Int'];
};

export enum Category {
  Chair = 'chair',
  Fashion = 'fashion',
  Interior = 'interior',
  LifeStyle = 'lifeStyle',
  Shoes = 'shoes'
}

export type Media = Node & {
  __typename?: 'Media';
  contents: Scalars['String'];
  created_at: Scalars['Time'];
  id: Scalars['ID'];
  img: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['Time'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAdminCart: MutationResponse;
  createAdminToken: Scalars['String'];
  createAdminUser: MutationResponse;
  createBrand: MutationResponse;
  createCart: MutationResponse;
  createCategory: MutationResponse;
  createMedia: MutationResponse;
  createOrder: MutationResponse;
  createPost: MutationResponse;
  createProducts: MutationResponse;
  createToken: Scalars['String'];
  createUser: MutationResponse;
  deleteCart: MutationResponse;
  getAdmin: AdminUserResponse;
  getAllProductsByCategory: Array<Product>;
  getAllProductsByKeyword: Array<Product>;
  getCartItem: Product;
  getProduct: Product;
  loginUser: Scalars['Boolean'];
  updateMedia: MutationResponse;
  updatePost: MutationResponse;
};


export type MutationCreateAdminCartArgs = {
  product_id: Scalars['Int'];
  user_id: Scalars['Int'];
};


export type MutationCreateAdminTokenArgs = {
  user_id: Scalars['String'];
};


export type MutationCreateAdminUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateBrandArgs = {
  brand: Scalars['String'];
};


export type MutationCreateCartArgs = {
  product_id: Scalars['Int'];
};


export type MutationCreateCategoryArgs = {
  category: Scalars['String'];
};


export type MutationCreateMediaArgs = {
  contents: Scalars['String'];
  img: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateOrderArgs = {
  postage: Scalars['Int'];
  price: Scalars['Int'];
  product_id: Scalars['Int'];
  quantity: Scalars['Int'];
  status: Scalars['Boolean'];
  user_id: Scalars['String'];
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
  url: Scalars['String'];
};


export type MutationCreateProductsArgs = {
  brand: Scalars['Int'];
  category: Scalars['Int'];
  description: Scalars['String'];
  discount: Scalars['Float'];
  img: Scalars['String'];
  product_name: Scalars['String'];
  stock: Scalars['Int'];
  unit_price: Scalars['Int'];
};


export type MutationCreateTokenArgs = {
  user_id: Scalars['String'];
};


export type MutationCreateUserArgs = {
  building: Scalars['String'];
  city: Scalars['String'];
  date_of_birth: Scalars['String'];
  destination_family_name: Scalars['String'];
  destination_first_name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  postcode: Scalars['Int'];
  prefecture_code: Scalars['String'];
  sex: Scalars['String'];
  street: Scalars['String'];
  user_id: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteCartArgs = {
  id: Scalars['Int'];
};


export type MutationGetAdminArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationGetAllProductsByCategoryArgs = {
  category: Scalars['String'];
  first: Scalars['Int'];
  skip: Scalars['Int'];
};


export type MutationGetAllProductsByKeywordArgs = {
  first: Scalars['Int'];
  keyword: Scalars['String'];
  skip: Scalars['Int'];
  sortBy: SortBy;
};


export type MutationGetCartItemArgs = {
  id: Scalars['Int'];
};


export type MutationGetProductArgs = {
  product_id: Scalars['Int'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationUpdateMediaArgs = {
  contents: Scalars['String'];
  id: Scalars['ID'];
  img: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'];
  votes: Scalars['Int'];
};

export type MutationResponse = Node & {
  __typename?: 'MutationResponse';
  id: Scalars['ID'];
  is_error: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Order = Node & {
  __typename?: 'Order';
  created_at: Scalars['Time'];
  id: Scalars['ID'];
  postage: Scalars['Int'];
  price: Scalars['Int'];
  product_id: Scalars['Int'];
  quantity: Scalars['Int'];
  status: Scalars['Boolean'];
  user_id: Scalars['String'];
};

export enum OrderBy {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC'
}

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  url: Scalars['String'];
  votes: Scalars['Int'];
};

export type PostsMeta = {
  __typename?: 'PostsMeta';
  count: Scalars['Int'];
};

export type Product = Node & {
  __typename?: 'Product';
  brand: Scalars['Int'];
  category: Scalars['String'];
  created_at: Scalars['Time'];
  description: Scalars['String'];
  discount: Scalars['Float'];
  id: Scalars['ID'];
  img: Scalars['String'];
  product_name: Scalars['String'];
  stock: Scalars['Int'];
  unit_price: Scalars['Int'];
  updated_at: Scalars['Time'];
};

export type Product_CartId = Node & {
  __typename?: 'Product_cartId';
  brand: Scalars['Int'];
  cart_id: Scalars['Int'];
  category: Scalars['String'];
  created_at: Scalars['Time'];
  description: Scalars['String'];
  discount: Scalars['Float'];
  id: Scalars['ID'];
  img: Scalars['String'];
  product_name: Scalars['String'];
  stock: Scalars['Int'];
  unit_price: Scalars['Int'];
  updated_at: Scalars['Time'];
};

export type Query = {
  __typename?: 'Query';
  _allPostsMeta: PostsMeta;
  getAllCartItems: Array<Product_CartId>;
  getAllMedia: Array<Maybe<Media>>;
  getAllOrders: Array<Order>;
  getAllPosts: Array<Post>;
  getAllProducts: Array<Product>;
  getOrder: Order;
  getUserList: Array<Maybe<User>>;
};


export type QueryGetAllCartItemsArgs = {
  first: Scalars['Int'];
  skip: Scalars['Int'];
};


export type QueryGetAllMediaArgs = {
  first: Scalars['Int'];
  skip: Scalars['Int'];
};


export type QueryGetAllOrdersArgs = {
  user_id: Scalars['String'];
};


export type QueryGetAllPostsArgs = {
  first: Scalars['Int'];
  orderBy?: InputMaybe<OrderBy>;
  skip: Scalars['Int'];
};


export type QueryGetAllProductsArgs = {
  first: Scalars['Int'];
  skip: Scalars['Int'];
};


export type QueryGetOrderArgs = {
  product_id: Scalars['Int'];
  user_id: Scalars['String'];
};


export type QueryGetUserListArgs = {
  first: Scalars['Int'];
  skip: Scalars['Int'];
};

export enum SortBy {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type User = Node & {
  __typename?: 'User';
  building: Scalars['String'];
  city: Scalars['String'];
  created_at: Scalars['Time'];
  date_of_birth: Scalars['String'];
  destination_family_name: Scalars['String'];
  destination_first_name: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  phone: Scalars['String'];
  postcode: Scalars['Int'];
  prefecture_code: Scalars['String'];
  sex: Scalars['String'];
  street: Scalars['String'];
  updated_at: Scalars['Time'];
  user_id: Scalars['String'];
  username: Scalars['String'];
};

export type AdminUser = Node & {
  __typename?: 'adminUser';
  id: Scalars['ID'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type AdminUserResponse = Node & {
  __typename?: 'adminUserResponse';
  id: Scalars['ID'];
  is_password: Scalars['Boolean'];
  is_username: Scalars['Boolean'];
};

export type CreateAdminUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateAdminUserMutation = { __typename?: 'Mutation', createAdminUser: { __typename?: 'MutationResponse', is_error: boolean, message: string } };

export type GetAdminMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type GetAdminMutation = { __typename?: 'Mutation', getAdmin: { __typename?: 'adminUserResponse', id: string, is_username: boolean, is_password: boolean } };

export type CreateBrandMutationVariables = Exact<{
  brand: Scalars['String'];
}>;


export type CreateBrandMutation = { __typename?: 'Mutation', createBrand: { __typename?: 'MutationResponse', is_error: boolean, message: string } };

export type CreateCartMutationVariables = Exact<{
  product_id: Scalars['Int'];
}>;


export type CreateCartMutation = { __typename?: 'Mutation', createCart: { __typename?: 'MutationResponse', is_error: boolean, message: string } };

export type CreateAdminCartMutationVariables = Exact<{
  user_id: Scalars['Int'];
  product_id: Scalars['Int'];
}>;


export type CreateAdminCartMutation = { __typename?: 'Mutation', createAdminCart: { __typename?: 'MutationResponse', is_error: boolean, message: string } };

export type GetCartItemMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetCartItemMutation = { __typename?: 'Mutation', getCartItem: { __typename?: 'Product', id: string, product_name: string, description: string, img: string, unit_price: number, discount: number, stock: number, brand: number, category: string, created_at: any } };

export type DeleteCartMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCartMutation = { __typename?: 'Mutation', deleteCart: { __typename?: 'MutationResponse', is_error: boolean, message: string } };

export type GetAllCartItemsQueryVariables = Exact<{
  first: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetAllCartItemsQuery = { __typename?: 'Query', getAllCartItems: Array<{ __typename?: 'Product_cartId', id: string, product_name: string, description: string, img: string, unit_price: number, discount: number, stock: number, brand: number, category: string, created_at: any, cart_id: number }> };

export type CreateCategoryMutationVariables = Exact<{
  category: Scalars['String'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'MutationResponse', is_error: boolean, message: string } };

export type CreateMediaMutationVariables = Exact<{
  title: Scalars['String'];
  contents: Scalars['String'];
  img: Scalars['String'];
}>;


export type CreateMediaMutation = { __typename?: 'Mutation', createMedia: { __typename?: 'MutationResponse', is_error: boolean, message: string } };

export type UpdateMediaMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
  contents: Scalars['String'];
  img: Scalars['String'];
}>;


export type UpdateMediaMutation = { __typename?: 'Mutation', updateMedia: { __typename?: 'MutationResponse', is_error: boolean, message: string } };

export type GetAllMediaQueryVariables = Exact<{
  first: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetAllMediaQuery = { __typename?: 'Query', getAllMedia: Array<{ __typename?: 'Media', id: string, title: string, contents: string, img: string, created_at: any } | null> };

export type CreateOrderMutationVariables = Exact<{
  user_id: Scalars['String'];
  product_id: Scalars['Int'];
  quantity: Scalars['Int'];
  postage: Scalars['Int'];
  price: Scalars['Int'];
  status: Scalars['Boolean'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'MutationResponse', is_error: boolean, message: string } };

export type GetAllOrdersQueryVariables = Exact<{
  user_id: Scalars['String'];
}>;


export type GetAllOrdersQuery = { __typename?: 'Query', getAllOrders: Array<{ __typename?: 'Order', id: string, user_id: string, product_id: number, quantity: number, postage: number, price: number, status: boolean, created_at: any }> };

export type GetOrderQueryVariables = Exact<{
  user_id: Scalars['String'];
  product_id: Scalars['Int'];
}>;


export type GetOrderQuery = { __typename?: 'Query', getOrder: { __typename?: 'Order', id: string, user_id: string, product_id: number, quantity: number, postage: number, price: number, status: boolean, created_at: any } };

export type CreateProductMutationVariables = Exact<{
  product_name: Scalars['String'];
  description: Scalars['String'];
  img: Scalars['String'];
  unit_price: Scalars['Int'];
  discount: Scalars['Float'];
  stock: Scalars['Int'];
  brand: Scalars['Int'];
  category: Scalars['Int'];
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProducts: { __typename?: 'MutationResponse', id: string, is_error: boolean, message: string } };

export type GetProductMutationVariables = Exact<{
  product_id: Scalars['Int'];
}>;


export type GetProductMutation = { __typename?: 'Mutation', getProduct: { __typename?: 'Product', id: string, product_name: string, description: string, img: string, unit_price: number, discount: number, stock: number, brand: number, category: string, created_at: any } };

export type GetAllProductByCategoryMutationVariables = Exact<{
  category: Scalars['String'];
  first: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetAllProductByCategoryMutation = { __typename?: 'Mutation', getAllProductsByCategory: Array<{ __typename?: 'Product', id: string, product_name: string, description: string, img: string, unit_price: number, discount: number, stock: number, brand: number, category: string, created_at: any }> };

export type GetAllProductsByKeywordMutationVariables = Exact<{
  keyword: Scalars['String'];
  sortBy: SortBy;
  first: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetAllProductsByKeywordMutation = { __typename?: 'Mutation', getAllProductsByKeyword: Array<{ __typename?: 'Product', id: string, product_name: string, description: string, img: string, unit_price: number, discount: number, stock: number, brand: number, category: string, created_at: any }> };

export type GetAllProductsQueryVariables = Exact<{
  first: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetAllProductsQuery = { __typename?: 'Query', getAllProducts: Array<{ __typename?: 'Product', id: string, product_name: string, description: string, img: string, unit_price: number, discount: number, stock: number, brand: number, category: string, created_at: any }> };

export type CreateTokenMutationVariables = Exact<{
  user_id: Scalars['String'];
}>;


export type CreateTokenMutation = { __typename?: 'Mutation', createToken: string };

export type CreateAdminTokenMutationVariables = Exact<{
  user_id: Scalars['String'];
}>;


export type CreateAdminTokenMutation = { __typename?: 'Mutation', createAdminToken: string };

export type CreateUserMutationVariables = Exact<{
  user_id: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  sex: Scalars['String'];
  date_of_birth: Scalars['String'];
  destination_family_name: Scalars['String'];
  destination_first_name: Scalars['String'];
  postcode: Scalars['Int'];
  prefecture_code: Scalars['String'];
  city: Scalars['String'];
  street: Scalars['String'];
  building: Scalars['String'];
  phone: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'MutationResponse', is_error: boolean, message: string } };

export type LoginUserMutationVariables = Exact<{
  user_id: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: boolean };

export type GetUserListQueryVariables = Exact<{
  first: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetUserListQuery = { __typename?: 'Query', getUserList: Array<{ __typename?: 'User', id: string, user_id: string, password: string, username: string, email: string, sex: string, date_of_birth: string, destination_family_name: string, destination_first_name: string, postcode: number, prefecture_code: string, city: string, street: string, building: string, phone: string, created_at: any } | null> };


export const CreateAdminUserDocument = `
    mutation createAdminUser($username: String!, $password: String!) {
  createAdminUser(username: $username, password: $password) {
    is_error
    message
  }
}
    `;
export const useCreateAdminUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateAdminUserMutation, TError, CreateAdminUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateAdminUserMutation, TError, CreateAdminUserMutationVariables, TContext>(
      ['createAdminUser'],
      (variables?: CreateAdminUserMutationVariables) => fetcher<CreateAdminUserMutation, CreateAdminUserMutationVariables>(client, CreateAdminUserDocument, variables, headers)(),
      options
    );
export const GetAdminDocument = `
    mutation getAdmin($username: String!, $password: String!) {
  getAdmin(username: $username, password: $password) {
    id
    is_username
    is_password
  }
}
    `;
export const useGetAdminMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<GetAdminMutation, TError, GetAdminMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<GetAdminMutation, TError, GetAdminMutationVariables, TContext>(
      ['getAdmin'],
      (variables?: GetAdminMutationVariables) => fetcher<GetAdminMutation, GetAdminMutationVariables>(client, GetAdminDocument, variables, headers)(),
      options
    );
export const CreateBrandDocument = `
    mutation createBrand($brand: String!) {
  createBrand(brand: $brand) {
    is_error
    message
  }
}
    `;
export const useCreateBrandMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateBrandMutation, TError, CreateBrandMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateBrandMutation, TError, CreateBrandMutationVariables, TContext>(
      ['createBrand'],
      (variables?: CreateBrandMutationVariables) => fetcher<CreateBrandMutation, CreateBrandMutationVariables>(client, CreateBrandDocument, variables, headers)(),
      options
    );
export const CreateCartDocument = `
    mutation createCart($product_id: Int!) {
  createCart(product_id: $product_id) {
    is_error
    message
  }
}
    `;
export const useCreateCartMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCartMutation, TError, CreateCartMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCartMutation, TError, CreateCartMutationVariables, TContext>(
      ['createCart'],
      (variables?: CreateCartMutationVariables) => fetcher<CreateCartMutation, CreateCartMutationVariables>(client, CreateCartDocument, variables, headers)(),
      options
    );
export const CreateAdminCartDocument = `
    mutation createAdminCart($user_id: Int!, $product_id: Int!) {
  createAdminCart(user_id: $user_id, product_id: $product_id) {
    is_error
    message
  }
}
    `;
export const useCreateAdminCartMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateAdminCartMutation, TError, CreateAdminCartMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateAdminCartMutation, TError, CreateAdminCartMutationVariables, TContext>(
      ['createAdminCart'],
      (variables?: CreateAdminCartMutationVariables) => fetcher<CreateAdminCartMutation, CreateAdminCartMutationVariables>(client, CreateAdminCartDocument, variables, headers)(),
      options
    );
export const GetCartItemDocument = `
    mutation getCartItem($id: Int!) {
  getCartItem(id: $id) {
    id
    product_name
    description
    img
    unit_price
    discount
    stock
    brand
    category
    created_at
  }
}
    `;
export const useGetCartItemMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<GetCartItemMutation, TError, GetCartItemMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<GetCartItemMutation, TError, GetCartItemMutationVariables, TContext>(
      ['getCartItem'],
      (variables?: GetCartItemMutationVariables) => fetcher<GetCartItemMutation, GetCartItemMutationVariables>(client, GetCartItemDocument, variables, headers)(),
      options
    );
export const DeleteCartDocument = `
    mutation deleteCart($id: Int!) {
  deleteCart(id: $id) {
    is_error
    message
  }
}
    `;
export const useDeleteCartMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCartMutation, TError, DeleteCartMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCartMutation, TError, DeleteCartMutationVariables, TContext>(
      ['deleteCart'],
      (variables?: DeleteCartMutationVariables) => fetcher<DeleteCartMutation, DeleteCartMutationVariables>(client, DeleteCartDocument, variables, headers)(),
      options
    );
export const GetAllCartItemsDocument = `
    query getAllCartItems($first: Int!, $skip: Int!) {
  getAllCartItems(first: $first, skip: $skip) {
    id
    product_name
    description
    img
    unit_price
    discount
    stock
    brand
    category
    created_at
    cart_id
  }
}
    `;
export const useGetAllCartItemsQuery = <
      TData = GetAllCartItemsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetAllCartItemsQueryVariables,
      options?: UseQueryOptions<GetAllCartItemsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllCartItemsQuery, TError, TData>(
      ['getAllCartItems', variables],
      fetcher<GetAllCartItemsQuery, GetAllCartItemsQueryVariables>(client, GetAllCartItemsDocument, variables, headers),
      options
    );

useGetAllCartItemsQuery.getKey = (variables: GetAllCartItemsQueryVariables) => ['getAllCartItems', variables];
;

export const CreateCategoryDocument = `
    mutation createCategory($category: String!) {
  createCategory(category: $category) {
    is_error
    message
  }
}
    `;
export const useCreateCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCategoryMutation, TError, CreateCategoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCategoryMutation, TError, CreateCategoryMutationVariables, TContext>(
      ['createCategory'],
      (variables?: CreateCategoryMutationVariables) => fetcher<CreateCategoryMutation, CreateCategoryMutationVariables>(client, CreateCategoryDocument, variables, headers)(),
      options
    );
export const CreateMediaDocument = `
    mutation createMedia($title: String!, $contents: String!, $img: String!) {
  createMedia(title: $title, contents: $contents, img: $img) {
    is_error
    message
  }
}
    `;
export const useCreateMediaMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateMediaMutation, TError, CreateMediaMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateMediaMutation, TError, CreateMediaMutationVariables, TContext>(
      ['createMedia'],
      (variables?: CreateMediaMutationVariables) => fetcher<CreateMediaMutation, CreateMediaMutationVariables>(client, CreateMediaDocument, variables, headers)(),
      options
    );
export const UpdateMediaDocument = `
    mutation updateMedia($id: ID!, $title: String!, $contents: String!, $img: String!) {
  updateMedia(id: $id, title: $title, contents: $contents, img: $img) {
    is_error
    message
  }
}
    `;
export const useUpdateMediaMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateMediaMutation, TError, UpdateMediaMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateMediaMutation, TError, UpdateMediaMutationVariables, TContext>(
      ['updateMedia'],
      (variables?: UpdateMediaMutationVariables) => fetcher<UpdateMediaMutation, UpdateMediaMutationVariables>(client, UpdateMediaDocument, variables, headers)(),
      options
    );
export const GetAllMediaDocument = `
    query getAllMedia($first: Int!, $skip: Int!) {
  getAllMedia(first: $first, skip: $skip) {
    id
    title
    contents
    img
    created_at
  }
}
    `;
export const useGetAllMediaQuery = <
      TData = GetAllMediaQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetAllMediaQueryVariables,
      options?: UseQueryOptions<GetAllMediaQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllMediaQuery, TError, TData>(
      ['getAllMedia', variables],
      fetcher<GetAllMediaQuery, GetAllMediaQueryVariables>(client, GetAllMediaDocument, variables, headers),
      options
    );

useGetAllMediaQuery.getKey = (variables: GetAllMediaQueryVariables) => ['getAllMedia', variables];
;

export const CreateOrderDocument = `
    mutation createOrder($user_id: String!, $product_id: Int!, $quantity: Int!, $postage: Int!, $price: Int!, $status: Boolean!) {
  createOrder(
    user_id: $user_id
    product_id: $product_id
    quantity: $quantity
    postage: $postage
    price: $price
    status: $status
  ) {
    is_error
    message
  }
}
    `;
export const useCreateOrderMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateOrderMutation, TError, CreateOrderMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateOrderMutation, TError, CreateOrderMutationVariables, TContext>(
      ['createOrder'],
      (variables?: CreateOrderMutationVariables) => fetcher<CreateOrderMutation, CreateOrderMutationVariables>(client, CreateOrderDocument, variables, headers)(),
      options
    );
export const GetAllOrdersDocument = `
    query getAllOrders($user_id: String!) {
  getAllOrders(user_id: $user_id) {
    id
    user_id
    product_id
    quantity
    postage
    price
    status
    created_at
  }
}
    `;
export const useGetAllOrdersQuery = <
      TData = GetAllOrdersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetAllOrdersQueryVariables,
      options?: UseQueryOptions<GetAllOrdersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllOrdersQuery, TError, TData>(
      ['getAllOrders', variables],
      fetcher<GetAllOrdersQuery, GetAllOrdersQueryVariables>(client, GetAllOrdersDocument, variables, headers),
      options
    );

useGetAllOrdersQuery.getKey = (variables: GetAllOrdersQueryVariables) => ['getAllOrders', variables];
;

export const GetOrderDocument = `
    query getOrder($user_id: String!, $product_id: Int!) {
  getOrder(user_id: $user_id, product_id: $product_id) {
    id
    user_id
    product_id
    quantity
    postage
    price
    status
    created_at
  }
}
    `;
export const useGetOrderQuery = <
      TData = GetOrderQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetOrderQueryVariables,
      options?: UseQueryOptions<GetOrderQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetOrderQuery, TError, TData>(
      ['getOrder', variables],
      fetcher<GetOrderQuery, GetOrderQueryVariables>(client, GetOrderDocument, variables, headers),
      options
    );

useGetOrderQuery.getKey = (variables: GetOrderQueryVariables) => ['getOrder', variables];
;

export const CreateProductDocument = `
    mutation createProduct($product_name: String!, $description: String!, $img: String!, $unit_price: Int!, $discount: Float!, $stock: Int!, $brand: Int!, $category: Int!) {
  createProducts(
    product_name: $product_name
    description: $description
    img: $img
    unit_price: $unit_price
    discount: $discount
    stock: $stock
    brand: $brand
    category: $category
  ) {
    id
    is_error
    message
  }
}
    `;
export const useCreateProductMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateProductMutation, TError, CreateProductMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateProductMutation, TError, CreateProductMutationVariables, TContext>(
      ['createProduct'],
      (variables?: CreateProductMutationVariables) => fetcher<CreateProductMutation, CreateProductMutationVariables>(client, CreateProductDocument, variables, headers)(),
      options
    );
export const GetProductDocument = `
    mutation getProduct($product_id: Int!) {
  getProduct(product_id: $product_id) {
    id
    product_name
    description
    img
    unit_price
    discount
    stock
    brand
    category
    created_at
  }
}
    `;
export const useGetProductMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<GetProductMutation, TError, GetProductMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<GetProductMutation, TError, GetProductMutationVariables, TContext>(
      ['getProduct'],
      (variables?: GetProductMutationVariables) => fetcher<GetProductMutation, GetProductMutationVariables>(client, GetProductDocument, variables, headers)(),
      options
    );
export const GetAllProductByCategoryDocument = `
    mutation getAllProductByCategory($category: String!, $first: Int!, $skip: Int!) {
  getAllProductsByCategory(category: $category, first: $first, skip: $skip) {
    id
    product_name
    description
    img
    unit_price
    discount
    stock
    brand
    category
    created_at
  }
}
    `;
export const useGetAllProductByCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<GetAllProductByCategoryMutation, TError, GetAllProductByCategoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<GetAllProductByCategoryMutation, TError, GetAllProductByCategoryMutationVariables, TContext>(
      ['getAllProductByCategory'],
      (variables?: GetAllProductByCategoryMutationVariables) => fetcher<GetAllProductByCategoryMutation, GetAllProductByCategoryMutationVariables>(client, GetAllProductByCategoryDocument, variables, headers)(),
      options
    );
export const GetAllProductsByKeywordDocument = `
    mutation getAllProductsByKeyword($keyword: String!, $sortBy: SortBy!, $first: Int!, $skip: Int!) {
  getAllProductsByKeyword(
    keyword: $keyword
    sortBy: $sortBy
    first: $first
    skip: $skip
  ) {
    id
    product_name
    description
    img
    unit_price
    discount
    stock
    brand
    category
    created_at
  }
}
    `;
export const useGetAllProductsByKeywordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<GetAllProductsByKeywordMutation, TError, GetAllProductsByKeywordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<GetAllProductsByKeywordMutation, TError, GetAllProductsByKeywordMutationVariables, TContext>(
      ['getAllProductsByKeyword'],
      (variables?: GetAllProductsByKeywordMutationVariables) => fetcher<GetAllProductsByKeywordMutation, GetAllProductsByKeywordMutationVariables>(client, GetAllProductsByKeywordDocument, variables, headers)(),
      options
    );
export const GetAllProductsDocument = `
    query getAllProducts($first: Int!, $skip: Int!) {
  getAllProducts(first: $first, skip: $skip) {
    id
    product_name
    description
    img
    unit_price
    discount
    stock
    brand
    category
    created_at
  }
}
    `;
export const useGetAllProductsQuery = <
      TData = GetAllProductsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetAllProductsQueryVariables,
      options?: UseQueryOptions<GetAllProductsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllProductsQuery, TError, TData>(
      ['getAllProducts', variables],
      fetcher<GetAllProductsQuery, GetAllProductsQueryVariables>(client, GetAllProductsDocument, variables, headers),
      options
    );

useGetAllProductsQuery.getKey = (variables: GetAllProductsQueryVariables) => ['getAllProducts', variables];
;

export const CreateTokenDocument = `
    mutation createToken($user_id: String!) {
  createToken(user_id: $user_id)
}
    `;
export const useCreateTokenMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateTokenMutation, TError, CreateTokenMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateTokenMutation, TError, CreateTokenMutationVariables, TContext>(
      ['createToken'],
      (variables?: CreateTokenMutationVariables) => fetcher<CreateTokenMutation, CreateTokenMutationVariables>(client, CreateTokenDocument, variables, headers)(),
      options
    );
export const CreateAdminTokenDocument = `
    mutation createAdminToken($user_id: String!) {
  createAdminToken(user_id: $user_id)
}
    `;
export const useCreateAdminTokenMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateAdminTokenMutation, TError, CreateAdminTokenMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateAdminTokenMutation, TError, CreateAdminTokenMutationVariables, TContext>(
      ['createAdminToken'],
      (variables?: CreateAdminTokenMutationVariables) => fetcher<CreateAdminTokenMutation, CreateAdminTokenMutationVariables>(client, CreateAdminTokenDocument, variables, headers)(),
      options
    );
export const CreateUserDocument = `
    mutation createUser($user_id: String!, $password: String!, $username: String!, $email: String!, $sex: String!, $date_of_birth: String!, $destination_family_name: String!, $destination_first_name: String!, $postcode: Int!, $prefecture_code: String!, $city: String!, $street: String!, $building: String!, $phone: String!) {
  createUser(
    user_id: $user_id
    password: $password
    username: $username
    email: $email
    sex: $sex
    date_of_birth: $date_of_birth
    destination_family_name: $destination_family_name
    destination_first_name: $destination_first_name
    postcode: $postcode
    prefecture_code: $prefecture_code
    city: $city
    street: $street
    building: $building
    phone: $phone
  ) {
    is_error
    message
  }
}
    `;
export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['createUser'],
      (variables?: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(client, CreateUserDocument, variables, headers)(),
      options
    );
export const LoginUserDocument = `
    mutation loginUser($user_id: String!, $password: String!) {
  loginUser(user_id: $user_id, password: $password)
}
    `;
export const useLoginUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginUserMutation, TError, LoginUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginUserMutation, TError, LoginUserMutationVariables, TContext>(
      ['loginUser'],
      (variables?: LoginUserMutationVariables) => fetcher<LoginUserMutation, LoginUserMutationVariables>(client, LoginUserDocument, variables, headers)(),
      options
    );
export const GetUserListDocument = `
    query getUserList($first: Int!, $skip: Int!) {
  getUserList(first: $first, skip: $skip) {
    id
    user_id
    password
    username
    email
    sex
    date_of_birth
    destination_family_name
    destination_first_name
    postcode
    prefecture_code
    city
    street
    building
    phone
    created_at
  }
}
    `;
export const useGetUserListQuery = <
      TData = GetUserListQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetUserListQueryVariables,
      options?: UseQueryOptions<GetUserListQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUserListQuery, TError, TData>(
      ['getUserList', variables],
      fetcher<GetUserListQuery, GetUserListQueryVariables>(client, GetUserListDocument, variables, headers),
      options
    );

useGetUserListQuery.getKey = (variables: GetUserListQueryVariables) => ['getUserList', variables];
;
