export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: unknown; output: unknown; }
  Decimal: { input: unknown; output: unknown; }
  JSON: { input: unknown; output: unknown; }
  Upload: { input: unknown; output: unknown; }
};

export type AuthenticatedItem = User;

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
};

export type Cart = {
  __typename: 'Cart';
  cartItems: Maybe<Array<CartItem>>;
  cartItemsCount: Maybe<Scalars['Int']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  sessionId: Maybe<Scalars['String']['output']>;
  subTotal: Maybe<Scalars['Int']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  user: Maybe<User>;
};


export type CartCartItemsArgs = {
  cursor?: InputMaybe<CartItemWhereUniqueInput>;
  orderBy?: Array<CartItemOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CartItemWhereInput;
};


export type CartCartItemsCountArgs = {
  where?: CartItemWhereInput;
};

export type CartCreateInput = {
  cartItems?: InputMaybe<CartItemRelateToManyForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
  subTotal?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type CartItem = {
  __typename: 'CartItem';
  cart: Maybe<Cart>;
  compositions: Maybe<Scalars['JSON']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  customizations: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  product: Maybe<Product>;
  quantity: Maybe<Scalars['Int']['output']>;
  subTotal: Maybe<Scalars['Int']['output']>;
  toppingOption: Maybe<ToppingOption>;
  unitPrice: Maybe<Scalars['Int']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  variant: Maybe<ProductVariant>;
};

export type CartItemCreateInput = {
  cart?: InputMaybe<CartRelateToOneForCreateInput>;
  compositions?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customizations?: InputMaybe<Scalars['JSON']['input']>;
  product?: InputMaybe<ProductRelateToOneForCreateInput>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  subTotal?: InputMaybe<Scalars['Int']['input']>;
  toppingOption?: InputMaybe<ToppingOptionRelateToOneForCreateInput>;
  unitPrice?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  variant?: InputMaybe<ProductVariantRelateToOneForCreateInput>;
};

export type CartItemManyRelationFilter = {
  every?: InputMaybe<CartItemWhereInput>;
  none?: InputMaybe<CartItemWhereInput>;
  some?: InputMaybe<CartItemWhereInput>;
};

export type CartItemOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  quantity?: InputMaybe<OrderDirection>;
  subTotal?: InputMaybe<OrderDirection>;
  unitPrice?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type CartItemRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CartItemWhereUniqueInput>>;
  create?: InputMaybe<Array<CartItemCreateInput>>;
};

export type CartItemRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CartItemWhereUniqueInput>>;
  create?: InputMaybe<Array<CartItemCreateInput>>;
  disconnect?: InputMaybe<Array<CartItemWhereUniqueInput>>;
  set?: InputMaybe<Array<CartItemWhereUniqueInput>>;
};

export type CartItemUpdateArgs = {
  data: CartItemUpdateInput;
  where: CartItemWhereUniqueInput;
};

export type CartItemUpdateInput = {
  cart?: InputMaybe<CartRelateToOneForUpdateInput>;
  compositions?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customizations?: InputMaybe<Scalars['JSON']['input']>;
  product?: InputMaybe<ProductRelateToOneForUpdateInput>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  subTotal?: InputMaybe<Scalars['Int']['input']>;
  toppingOption?: InputMaybe<ToppingOptionRelateToOneForUpdateInput>;
  unitPrice?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  variant?: InputMaybe<ProductVariantRelateToOneForUpdateInput>;
};

export type CartItemWhereInput = {
  AND?: InputMaybe<Array<CartItemWhereInput>>;
  NOT?: InputMaybe<Array<CartItemWhereInput>>;
  OR?: InputMaybe<Array<CartItemWhereInput>>;
  cart?: InputMaybe<CartWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  product?: InputMaybe<ProductWhereInput>;
  quantity?: InputMaybe<IntNullableFilter>;
  subTotal?: InputMaybe<IntNullableFilter>;
  toppingOption?: InputMaybe<ToppingOptionWhereInput>;
  unitPrice?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  variant?: InputMaybe<ProductVariantWhereInput>;
};

export type CartItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CartOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  sessionId?: InputMaybe<OrderDirection>;
  subTotal?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type CartRelateToOneForCreateInput = {
  connect?: InputMaybe<CartWhereUniqueInput>;
  create?: InputMaybe<CartCreateInput>;
};

export type CartRelateToOneForUpdateInput = {
  connect?: InputMaybe<CartWhereUniqueInput>;
  create?: InputMaybe<CartCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CartUpdateArgs = {
  data: CartUpdateInput;
  where: CartWhereUniqueInput;
};

export type CartUpdateInput = {
  cartItems?: InputMaybe<CartItemRelateToManyForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
  subTotal?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type CartWhereInput = {
  AND?: InputMaybe<Array<CartWhereInput>>;
  NOT?: InputMaybe<Array<CartWhereInput>>;
  OR?: InputMaybe<Array<CartWhereInput>>;
  cartItems?: InputMaybe<CartItemManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  sessionId?: InputMaybe<StringNullableFilter>;
  subTotal?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type CartWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserWhereUniqueInput>;
};

export type Category = {
  __typename: 'Category';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isAvailable: Maybe<Scalars['Boolean']['output']>;
  name: Maybe<Scalars['String']['output']>;
  parent: Maybe<Category>;
  products: Maybe<Array<Product>>;
  productsCount: Maybe<Scalars['Int']['output']>;
  slug: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type CategoryProductsArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>;
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductWhereInput;
};


export type CategoryProductsCountArgs = {
  where?: ProductWhereInput;
};

export type CategoryCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  isAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<CategoryRelateToOneForCreateInput>;
  products?: InputMaybe<ProductRelateToManyForCreateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryManyRelationFilter = {
  every?: InputMaybe<CategoryWhereInput>;
  none?: InputMaybe<CategoryWhereInput>;
  some?: InputMaybe<CategoryWhereInput>;
};

export type CategoryOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isAvailable?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type CategoryRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
};

export type CategoryRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
  disconnect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  set?: InputMaybe<Array<CategoryWhereUniqueInput>>;
};

export type CategoryRelateToOneForCreateInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  create?: InputMaybe<CategoryCreateInput>;
};

export type CategoryRelateToOneForUpdateInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  create?: InputMaybe<CategoryCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CategoryUpdateArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  isAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<CategoryRelateToOneForUpdateInput>;
  products?: InputMaybe<ProductRelateToManyForUpdateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  isAvailable?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  parent?: InputMaybe<CategoryWhereInput>;
  products?: InputMaybe<ProductManyRelationFilter>;
  slug?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type CategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CompositionOptionInput = {
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type CustomizationInput = {
  imagesId?: InputMaybe<Array<Scalars['String']['input']>>;
  inscriptionText?: InputMaybe<Scalars['String']['input']>;
  optionId: Scalars['String']['input'];
  valueId: Scalars['String']['input'];
};

export type CustomizationOption = {
  __typename: 'CustomizationOption';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  customValues: Maybe<Array<CustomizationOptionValue>>;
  customValuesCount: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name: Maybe<Scalars['String']['output']>;
  product: Maybe<Array<Product>>;
  productCount: Maybe<Scalars['Int']['output']>;
  slug: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type CustomizationOptionCustomValuesArgs = {
  cursor?: InputMaybe<CustomizationOptionValueWhereUniqueInput>;
  orderBy?: Array<CustomizationOptionValueOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CustomizationOptionValueWhereInput;
};


export type CustomizationOptionCustomValuesCountArgs = {
  where?: CustomizationOptionValueWhereInput;
};


export type CustomizationOptionProductArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>;
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductWhereInput;
};


export type CustomizationOptionProductCountArgs = {
  where?: ProductWhereInput;
};

export type CustomizationOptionCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customValues?: InputMaybe<CustomizationOptionValueRelateToManyForCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  product?: InputMaybe<ProductRelateToManyForCreateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CustomizationOptionManyRelationFilter = {
  every?: InputMaybe<CustomizationOptionWhereInput>;
  none?: InputMaybe<CustomizationOptionWhereInput>;
  some?: InputMaybe<CustomizationOptionWhereInput>;
};

export type CustomizationOptionOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type CustomizationOptionRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CustomizationOptionWhereUniqueInput>>;
  create?: InputMaybe<Array<CustomizationOptionCreateInput>>;
};

export type CustomizationOptionRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CustomizationOptionWhereUniqueInput>>;
  create?: InputMaybe<Array<CustomizationOptionCreateInput>>;
  disconnect?: InputMaybe<Array<CustomizationOptionWhereUniqueInput>>;
  set?: InputMaybe<Array<CustomizationOptionWhereUniqueInput>>;
};

export type CustomizationOptionRelateToOneForCreateInput = {
  connect?: InputMaybe<CustomizationOptionWhereUniqueInput>;
  create?: InputMaybe<CustomizationOptionCreateInput>;
};

export type CustomizationOptionRelateToOneForUpdateInput = {
  connect?: InputMaybe<CustomizationOptionWhereUniqueInput>;
  create?: InputMaybe<CustomizationOptionCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CustomizationOptionUpdateArgs = {
  data: CustomizationOptionUpdateInput;
  where: CustomizationOptionWhereUniqueInput;
};

export type CustomizationOptionUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customValues?: InputMaybe<CustomizationOptionValueRelateToManyForUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  product?: InputMaybe<ProductRelateToManyForUpdateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CustomizationOptionValue = {
  __typename: 'CustomizationOptionValue';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  extraPrice: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  option: Maybe<CustomizationOption>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  value: Maybe<Scalars['String']['output']>;
};

export type CustomizationOptionValueCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  extraPrice?: InputMaybe<Scalars['Int']['input']>;
  option?: InputMaybe<CustomizationOptionRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CustomizationOptionValueManyRelationFilter = {
  every?: InputMaybe<CustomizationOptionValueWhereInput>;
  none?: InputMaybe<CustomizationOptionValueWhereInput>;
  some?: InputMaybe<CustomizationOptionValueWhereInput>;
};

export type CustomizationOptionValueOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  extraPrice?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  value?: InputMaybe<OrderDirection>;
};

export type CustomizationOptionValueRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CustomizationOptionValueWhereUniqueInput>>;
  create?: InputMaybe<Array<CustomizationOptionValueCreateInput>>;
};

export type CustomizationOptionValueRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CustomizationOptionValueWhereUniqueInput>>;
  create?: InputMaybe<Array<CustomizationOptionValueCreateInput>>;
  disconnect?: InputMaybe<Array<CustomizationOptionValueWhereUniqueInput>>;
  set?: InputMaybe<Array<CustomizationOptionValueWhereUniqueInput>>;
};

export type CustomizationOptionValueUpdateArgs = {
  data: CustomizationOptionValueUpdateInput;
  where: CustomizationOptionValueWhereUniqueInput;
};

export type CustomizationOptionValueUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  extraPrice?: InputMaybe<Scalars['Int']['input']>;
  option?: InputMaybe<CustomizationOptionRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CustomizationOptionValueWhereInput = {
  AND?: InputMaybe<Array<CustomizationOptionValueWhereInput>>;
  NOT?: InputMaybe<Array<CustomizationOptionValueWhereInput>>;
  OR?: InputMaybe<Array<CustomizationOptionValueWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  extraPrice?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IdFilter>;
  option?: InputMaybe<CustomizationOptionWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  value?: InputMaybe<StringFilter>;
};

export type CustomizationOptionValueWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CustomizationOptionWhereInput = {
  AND?: InputMaybe<Array<CustomizationOptionWhereInput>>;
  NOT?: InputMaybe<Array<CustomizationOptionWhereInput>>;
  OR?: InputMaybe<Array<CustomizationOptionWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  customValues?: InputMaybe<CustomizationOptionValueManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringNullableFilter>;
  product?: InputMaybe<ProductManyRelationFilter>;
  slug?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type CustomizationOptionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CustomizeImage = {
  __typename: 'CustomizeImage';
  altText: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image: Maybe<ImageFieldOutput>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type CustomizeImageCreateInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CustomizeImageOrderByInput = {
  altText?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type CustomizeImageUpdateArgs = {
  data: CustomizeImageUpdateInput;
  where: CustomizeImageWhereUniqueInput;
};

export type CustomizeImageUpdateInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CustomizeImageWhereInput = {
  AND?: InputMaybe<Array<CustomizeImageWhereInput>>;
  NOT?: InputMaybe<Array<CustomizeImageWhereInput>>;
  OR?: InputMaybe<Array<CustomizeImageWhereInput>>;
  altText?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type CustomizeImageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DecimalNullableFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<DecimalNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type DelivaryAddress = {
  __typename: 'DelivaryAddress';
  address: Maybe<Scalars['String']['output']>;
  apartmentNumber: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  floor: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  intercomCode: Maybe<Scalars['String']['output']>;
  orders: Maybe<Array<Order>>;
  ordersCount: Maybe<Scalars['Int']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  user: Maybe<User>;
};


export type DelivaryAddressOrdersArgs = {
  cursor?: InputMaybe<OrderWhereUniqueInput>;
  orderBy?: Array<OrderOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderWhereInput;
};


export type DelivaryAddressOrdersCountArgs = {
  where?: OrderWhereInput;
};

export type DelivaryAddressCreateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  apartmentNumber?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  floor?: InputMaybe<Scalars['String']['input']>;
  intercomCode?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<OrderRelateToManyForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type DelivaryAddressOrderByInput = {
  address?: InputMaybe<OrderDirection>;
  apartmentNumber?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  floor?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  intercomCode?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type DelivaryAddressRelateToOneForCreateInput = {
  connect?: InputMaybe<DelivaryAddressWhereUniqueInput>;
  create?: InputMaybe<DelivaryAddressCreateInput>;
};

export type DelivaryAddressRelateToOneForUpdateInput = {
  connect?: InputMaybe<DelivaryAddressWhereUniqueInput>;
  create?: InputMaybe<DelivaryAddressCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DelivaryAddressUpdateArgs = {
  data: DelivaryAddressUpdateInput;
  where: DelivaryAddressWhereUniqueInput;
};

export type DelivaryAddressUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  apartmentNumber?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  floor?: InputMaybe<Scalars['String']['input']>;
  intercomCode?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<OrderRelateToManyForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type DelivaryAddressWhereInput = {
  AND?: InputMaybe<Array<DelivaryAddressWhereInput>>;
  NOT?: InputMaybe<Array<DelivaryAddressWhereInput>>;
  OR?: InputMaybe<Array<DelivaryAddressWhereInput>>;
  address?: InputMaybe<StringFilter>;
  apartmentNumber?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  floor?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  intercomCode?: InputMaybe<StringFilter>;
  orders?: InputMaybe<OrderManyRelationFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type DelivaryAddressWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<UserWhereUniqueInput>;
};

export type FeaturedProduct = {
  __typename: 'FeaturedProduct';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  products: Maybe<Array<Product>>;
  productsCount: Maybe<Scalars['Int']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type FeaturedProductProductsArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>;
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductWhereInput;
};


export type FeaturedProductProductsCountArgs = {
  where?: ProductWhereInput;
};

export type FeaturedProductCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  products?: InputMaybe<ProductRelateToManyForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FeaturedProductOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type FeaturedProductUpdateArgs = {
  data: FeaturedProductUpdateInput;
  where: FeaturedProductWhereUniqueInput;
};

export type FeaturedProductUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  products?: InputMaybe<ProductRelateToManyForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FeaturedProductWhereInput = {
  AND?: InputMaybe<Array<FeaturedProductWhereInput>>;
  NOT?: InputMaybe<Array<FeaturedProductWhereInput>>;
  OR?: InputMaybe<Array<FeaturedProductWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  products?: InputMaybe<ProductManyRelationFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type FeaturedProductWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type FileFieldInput = {
  upload: Scalars['Upload']['input'];
};

export type FileFieldOutput = {
  __typename: 'FileFieldOutput';
  filename: Scalars['String']['output'];
  filesize: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export enum ImageExtension {
  Gif = 'gif',
  Jpg = 'jpg',
  Png = 'png',
  Webp = 'webp'
}

export type ImageFieldInput = {
  upload: Scalars['Upload']['input'];
};

export type ImageFieldOutput = {
  __typename: 'ImageFieldOutput';
  extension: ImageExtension;
  filesize: Scalars['Int']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type KeystoneAdminMeta = {
  __typename: 'KeystoneAdminMeta';
  list: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename: 'KeystoneAdminUIFieldGroupMeta';
  description: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String']['output'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex: Maybe<Scalars['Int']['output']>;
  description: Maybe<Scalars['String']['output']>;
  fieldMeta: Maybe<Scalars['JSON']['output']>;
  isFilterable: Scalars['Boolean']['output'];
  isNonNull: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars['Boolean']['output'];
  itemView: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String']['output'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String']['output'];
  search: Maybe<QueryMode>;
  viewsIndex: Scalars['Int']['output'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = 'create',
  Read = 'read',
  Update = 'update'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiGraphQl = {
  __typename: 'KeystoneAdminUIGraphQL';
  names: KeystoneAdminUiGraphQlNames;
};

export type KeystoneAdminUiGraphQlNames = {
  __typename: 'KeystoneAdminUIGraphQLNames';
  createInputName: Scalars['String']['output'];
  createManyMutationName: Scalars['String']['output'];
  createMutationName: Scalars['String']['output'];
  deleteManyMutationName: Scalars['String']['output'];
  deleteMutationName: Scalars['String']['output'];
  itemQueryName: Scalars['String']['output'];
  listOrderName: Scalars['String']['output'];
  listQueryCountName: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  outputTypeName: Scalars['String']['output'];
  relateToManyForCreateInputName: Scalars['String']['output'];
  relateToManyForUpdateInputName: Scalars['String']['output'];
  relateToOneForCreateInputName: Scalars['String']['output'];
  relateToOneForUpdateInputName: Scalars['String']['output'];
  updateInputName: Scalars['String']['output'];
  updateManyInputName: Scalars['String']['output'];
  updateManyMutationName: Scalars['String']['output'];
  updateMutationName: Scalars['String']['output'];
  whereInputName: Scalars['String']['output'];
  whereUniqueInputName: Scalars['String']['output'];
};

export type KeystoneAdminUiListMeta = {
  __typename: 'KeystoneAdminUIListMeta';
  description: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  graphql: KeystoneAdminUiGraphQl;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean']['output'];
  hideDelete: Scalars['Boolean']['output'];
  initialColumns: Array<Scalars['String']['output']>;
  initialSearchFields: Array<Scalars['String']['output']>;
  initialSort: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean']['output'];
  isSingleton: Scalars['Boolean']['output'];
  itemQueryName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  labelField: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  pageSize: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  singular: Scalars['String']['output'];
};

export type KeystoneAdminUiSort = {
  __typename: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String']['output'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type MixBoxProduct = {
  __typename: 'MixBoxProduct';
  compositions: Maybe<Array<Product>>;
  compositionsCount: Maybe<Scalars['Int']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  product: Maybe<Product>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type MixBoxProductCompositionsArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>;
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductWhereInput;
};


export type MixBoxProductCompositionsCountArgs = {
  where?: ProductWhereInput;
};

export type MixBoxProductCreateInput = {
  compositions?: InputMaybe<ProductRelateToManyForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  product?: InputMaybe<ProductRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MixBoxProductOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type MixBoxProductRelateToOneForCreateInput = {
  connect?: InputMaybe<MixBoxProductWhereUniqueInput>;
  create?: InputMaybe<MixBoxProductCreateInput>;
};

export type MixBoxProductRelateToOneForUpdateInput = {
  connect?: InputMaybe<MixBoxProductWhereUniqueInput>;
  create?: InputMaybe<MixBoxProductCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MixBoxProductUpdateArgs = {
  data: MixBoxProductUpdateInput;
  where: MixBoxProductWhereUniqueInput;
};

export type MixBoxProductUpdateInput = {
  compositions?: InputMaybe<ProductRelateToManyForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  product?: InputMaybe<ProductRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MixBoxProductWhereInput = {
  AND?: InputMaybe<Array<MixBoxProductWhereInput>>;
  NOT?: InputMaybe<Array<MixBoxProductWhereInput>>;
  OR?: InputMaybe<Array<MixBoxProductWhereInput>>;
  compositions?: InputMaybe<ProductManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  product?: InputMaybe<ProductWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type MixBoxProductWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  product?: InputMaybe<ProductWhereUniqueInput>;
};

export type Mutation = {
  __typename: 'Mutation';
  addToCart: Cart;
  authenticateUserWithPassword: Maybe<UserAuthenticationWithPasswordResult>;
  authorizedUser: User;
  checkOut: Payment;
  connectCartToUser: Maybe<Cart>;
  createCart: Maybe<Cart>;
  createCartItem: Maybe<CartItem>;
  createCartItems: Maybe<Array<Maybe<CartItem>>>;
  createCarts: Maybe<Array<Maybe<Cart>>>;
  createCategories: Maybe<Array<Maybe<Category>>>;
  createCategory: Maybe<Category>;
  createCustomizationOption: Maybe<CustomizationOption>;
  createCustomizationOptionValue: Maybe<CustomizationOptionValue>;
  createCustomizationOptionValues: Maybe<Array<Maybe<CustomizationOptionValue>>>;
  createCustomizationOptions: Maybe<Array<Maybe<CustomizationOption>>>;
  createCustomizeImage: Maybe<CustomizeImage>;
  createCustomizeImages: Maybe<Array<Maybe<CustomizeImage>>>;
  createDelivaryAddress: Maybe<DelivaryAddress>;
  createDelivaryAddresses: Maybe<Array<Maybe<DelivaryAddress>>>;
  createFeaturedProduct: Maybe<FeaturedProduct>;
  createFeaturedProducts: Maybe<Array<Maybe<FeaturedProduct>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createMixBoxProduct: Maybe<MixBoxProduct>;
  createMixBoxProducts: Maybe<Array<Maybe<MixBoxProduct>>>;
  createOrder: Maybe<Order>;
  createOrderIntent: Maybe<OrderIntent>;
  createOrderIntents: Maybe<Array<Maybe<OrderIntent>>>;
  createOrderItem: Maybe<OrderItem>;
  createOrderItems: Maybe<Array<Maybe<OrderItem>>>;
  createOrderReceiver: Maybe<OrderReceiver>;
  createOrderReceivers: Maybe<Array<Maybe<OrderReceiver>>>;
  createOrders: Maybe<Array<Maybe<Order>>>;
  createPayment: Maybe<Payment>;
  createPayments: Maybe<Array<Maybe<Payment>>>;
  createProduct: Maybe<Product>;
  createProductFilling: Maybe<ProductFilling>;
  createProductFillings: Maybe<Array<Maybe<ProductFilling>>>;
  createProductHomeBanner: Maybe<ProductHomeBanner>;
  createProductHomeBanners: Maybe<Array<Maybe<ProductHomeBanner>>>;
  createProductImage: Maybe<ProductImage>;
  createProductImages: Maybe<Array<Maybe<ProductImage>>>;
  createProductVariant: Maybe<ProductVariant>;
  createProductVariants: Maybe<Array<Maybe<ProductVariant>>>;
  createProductVideo: Maybe<ProductVideo>;
  createProductVideos: Maybe<Array<Maybe<ProductVideo>>>;
  createProducts: Maybe<Array<Maybe<Product>>>;
  createTopping: Maybe<Topping>;
  createToppingOption: Maybe<ToppingOption>;
  createToppingOptions: Maybe<Array<Maybe<ToppingOption>>>;
  createToppings: Maybe<Array<Maybe<Topping>>>;
  createUser: Maybe<User>;
  createUsers: Maybe<Array<Maybe<User>>>;
  decreaseCartItem: Maybe<Cart>;
  deleteCart: Maybe<Cart>;
  deleteCartItem: Maybe<CartItem>;
  deleteCartItems: Maybe<Array<Maybe<CartItem>>>;
  deleteCarts: Maybe<Array<Maybe<Cart>>>;
  deleteCategories: Maybe<Array<Maybe<Category>>>;
  deleteCategory: Maybe<Category>;
  deleteCustomizationOption: Maybe<CustomizationOption>;
  deleteCustomizationOptionValue: Maybe<CustomizationOptionValue>;
  deleteCustomizationOptionValues: Maybe<Array<Maybe<CustomizationOptionValue>>>;
  deleteCustomizationOptions: Maybe<Array<Maybe<CustomizationOption>>>;
  deleteCustomizeImage: Maybe<CustomizeImage>;
  deleteCustomizeImages: Maybe<Array<Maybe<CustomizeImage>>>;
  deleteDelivaryAddress: Maybe<DelivaryAddress>;
  deleteDelivaryAddresses: Maybe<Array<Maybe<DelivaryAddress>>>;
  deleteFeaturedProduct: Maybe<FeaturedProduct>;
  deleteFeaturedProducts: Maybe<Array<Maybe<FeaturedProduct>>>;
  deleteMixBoxProduct: Maybe<MixBoxProduct>;
  deleteMixBoxProducts: Maybe<Array<Maybe<MixBoxProduct>>>;
  deleteOrder: Maybe<Order>;
  deleteOrderIntent: Maybe<OrderIntent>;
  deleteOrderIntents: Maybe<Array<Maybe<OrderIntent>>>;
  deleteOrderItem: Maybe<OrderItem>;
  deleteOrderItems: Maybe<Array<Maybe<OrderItem>>>;
  deleteOrderReceiver: Maybe<OrderReceiver>;
  deleteOrderReceivers: Maybe<Array<Maybe<OrderReceiver>>>;
  deleteOrders: Maybe<Array<Maybe<Order>>>;
  deletePayment: Maybe<Payment>;
  deletePayments: Maybe<Array<Maybe<Payment>>>;
  deleteProduct: Maybe<Product>;
  deleteProductFilling: Maybe<ProductFilling>;
  deleteProductFillings: Maybe<Array<Maybe<ProductFilling>>>;
  deleteProductHomeBanner: Maybe<ProductHomeBanner>;
  deleteProductHomeBanners: Maybe<Array<Maybe<ProductHomeBanner>>>;
  deleteProductImage: Maybe<ProductImage>;
  deleteProductImages: Maybe<Array<Maybe<ProductImage>>>;
  deleteProductVariant: Maybe<ProductVariant>;
  deleteProductVariants: Maybe<Array<Maybe<ProductVariant>>>;
  deleteProductVideo: Maybe<ProductVideo>;
  deleteProductVideos: Maybe<Array<Maybe<ProductVideo>>>;
  deleteProducts: Maybe<Array<Maybe<Product>>>;
  deleteTopping: Maybe<Topping>;
  deleteToppingOption: Maybe<ToppingOption>;
  deleteToppingOptions: Maybe<Array<Maybe<ToppingOption>>>;
  deleteToppings: Maybe<Array<Maybe<Topping>>>;
  deleteUser: Maybe<User>;
  deleteUsers: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean']['output'];
  increaseCartItem: Cart;
  redeemUserVerificationToken: VerifyUserResponse;
  registerUser: User;
  removeFromCart: Maybe<Cart>;
  requestCall: Scalars['String']['output'];
  resendUserVerificationToken: Scalars['String']['output'];
  sendPasswordResetToken: Scalars['String']['output'];
  updateCart: Maybe<Cart>;
  updateCartItem: Maybe<CartItem>;
  updateCartItems: Maybe<Array<Maybe<CartItem>>>;
  updateCarts: Maybe<Array<Maybe<Cart>>>;
  updateCategories: Maybe<Array<Maybe<Category>>>;
  updateCategory: Maybe<Category>;
  updateCustomizationOption: Maybe<CustomizationOption>;
  updateCustomizationOptionValue: Maybe<CustomizationOptionValue>;
  updateCustomizationOptionValues: Maybe<Array<Maybe<CustomizationOptionValue>>>;
  updateCustomizationOptions: Maybe<Array<Maybe<CustomizationOption>>>;
  updateCustomizeImage: Maybe<CustomizeImage>;
  updateCustomizeImages: Maybe<Array<Maybe<CustomizeImage>>>;
  updateDelivaryAddress: Maybe<DelivaryAddress>;
  updateDelivaryAddresses: Maybe<Array<Maybe<DelivaryAddress>>>;
  updateFeaturedProduct: Maybe<FeaturedProduct>;
  updateFeaturedProducts: Maybe<Array<Maybe<FeaturedProduct>>>;
  updateMixBoxProduct: Maybe<MixBoxProduct>;
  updateMixBoxProducts: Maybe<Array<Maybe<MixBoxProduct>>>;
  updateOrder: Maybe<Order>;
  updateOrderIntent: Maybe<OrderIntent>;
  updateOrderIntents: Maybe<Array<Maybe<OrderIntent>>>;
  updateOrderItem: Maybe<OrderItem>;
  updateOrderItems: Maybe<Array<Maybe<OrderItem>>>;
  updateOrderReceiver: Maybe<OrderReceiver>;
  updateOrderReceivers: Maybe<Array<Maybe<OrderReceiver>>>;
  updateOrders: Maybe<Array<Maybe<Order>>>;
  updatePassword: User;
  updatePayment: Maybe<Payment>;
  updatePayments: Maybe<Array<Maybe<Payment>>>;
  updateProduct: Maybe<Product>;
  updateProductFilling: Maybe<ProductFilling>;
  updateProductFillings: Maybe<Array<Maybe<ProductFilling>>>;
  updateProductHomeBanner: Maybe<ProductHomeBanner>;
  updateProductHomeBanners: Maybe<Array<Maybe<ProductHomeBanner>>>;
  updateProductImage: Maybe<ProductImage>;
  updateProductImages: Maybe<Array<Maybe<ProductImage>>>;
  updateProductVariant: Maybe<ProductVariant>;
  updateProductVariants: Maybe<Array<Maybe<ProductVariant>>>;
  updateProductVideo: Maybe<ProductVideo>;
  updateProductVideos: Maybe<Array<Maybe<ProductVideo>>>;
  updateProducts: Maybe<Array<Maybe<Product>>>;
  updateTopping: Maybe<Topping>;
  updateToppingOption: Maybe<ToppingOption>;
  updateToppingOptions: Maybe<Array<Maybe<ToppingOption>>>;
  updateToppings: Maybe<Array<Maybe<Topping>>>;
  updateUser: Maybe<User>;
  updateUsers: Maybe<Array<Maybe<User>>>;
  uploadImageCustomization: Array<CustomizeImage>;
};


export type MutationAddToCartArgs = {
  compositionOptions?: InputMaybe<Array<CompositionOptionInput>>;
  customizations?: InputMaybe<Array<CustomizationInput>>;
  productId: Scalars['String']['input'];
  toppingOptionId?: InputMaybe<Scalars['String']['input']>;
  variantId: Scalars['String']['input'];
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationAuthorizedUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCheckOutArgs = {
  customerNote?: InputMaybe<Scalars['String']['input']>;
  deliveryAddressId?: InputMaybe<Scalars['String']['input']>;
  deliveryDate: Scalars['DateTime']['input'];
  deliveryOption: Scalars['String']['input'];
  orderReceiver?: InputMaybe<OrderReceiverInput>;
  paymentMethod: Scalars['String']['input'];
  shippingCost: Scalars['Int']['input'];
};


export type MutationConnectCartToUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationCreateCartArgs = {
  data: CartCreateInput;
};


export type MutationCreateCartItemArgs = {
  data: CartItemCreateInput;
};


export type MutationCreateCartItemsArgs = {
  data: Array<CartItemCreateInput>;
};


export type MutationCreateCartsArgs = {
  data: Array<CartCreateInput>;
};


export type MutationCreateCategoriesArgs = {
  data: Array<CategoryCreateInput>;
};


export type MutationCreateCategoryArgs = {
  data: CategoryCreateInput;
};


export type MutationCreateCustomizationOptionArgs = {
  data: CustomizationOptionCreateInput;
};


export type MutationCreateCustomizationOptionValueArgs = {
  data: CustomizationOptionValueCreateInput;
};


export type MutationCreateCustomizationOptionValuesArgs = {
  data: Array<CustomizationOptionValueCreateInput>;
};


export type MutationCreateCustomizationOptionsArgs = {
  data: Array<CustomizationOptionCreateInput>;
};


export type MutationCreateCustomizeImageArgs = {
  data: CustomizeImageCreateInput;
};


export type MutationCreateCustomizeImagesArgs = {
  data: Array<CustomizeImageCreateInput>;
};


export type MutationCreateDelivaryAddressArgs = {
  data: DelivaryAddressCreateInput;
};


export type MutationCreateDelivaryAddressesArgs = {
  data: Array<DelivaryAddressCreateInput>;
};


export type MutationCreateFeaturedProductArgs = {
  data: FeaturedProductCreateInput;
};


export type MutationCreateFeaturedProductsArgs = {
  data: Array<FeaturedProductCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateMixBoxProductArgs = {
  data: MixBoxProductCreateInput;
};


export type MutationCreateMixBoxProductsArgs = {
  data: Array<MixBoxProductCreateInput>;
};


export type MutationCreateOrderArgs = {
  data: OrderCreateInput;
};


export type MutationCreateOrderIntentArgs = {
  data: OrderIntentCreateInput;
};


export type MutationCreateOrderIntentsArgs = {
  data: Array<OrderIntentCreateInput>;
};


export type MutationCreateOrderItemArgs = {
  data: OrderItemCreateInput;
};


export type MutationCreateOrderItemsArgs = {
  data: Array<OrderItemCreateInput>;
};


export type MutationCreateOrderReceiverArgs = {
  data: OrderReceiverCreateInput;
};


export type MutationCreateOrderReceiversArgs = {
  data: Array<OrderReceiverCreateInput>;
};


export type MutationCreateOrdersArgs = {
  data: Array<OrderCreateInput>;
};


export type MutationCreatePaymentArgs = {
  data: PaymentCreateInput;
};


export type MutationCreatePaymentsArgs = {
  data: Array<PaymentCreateInput>;
};


export type MutationCreateProductArgs = {
  data: ProductCreateInput;
};


export type MutationCreateProductFillingArgs = {
  data: ProductFillingCreateInput;
};


export type MutationCreateProductFillingsArgs = {
  data: Array<ProductFillingCreateInput>;
};


export type MutationCreateProductHomeBannerArgs = {
  data: ProductHomeBannerCreateInput;
};


export type MutationCreateProductHomeBannersArgs = {
  data: Array<ProductHomeBannerCreateInput>;
};


export type MutationCreateProductImageArgs = {
  data: ProductImageCreateInput;
};


export type MutationCreateProductImagesArgs = {
  data: Array<ProductImageCreateInput>;
};


export type MutationCreateProductVariantArgs = {
  data: ProductVariantCreateInput;
};


export type MutationCreateProductVariantsArgs = {
  data: Array<ProductVariantCreateInput>;
};


export type MutationCreateProductVideoArgs = {
  data: ProductVideoCreateInput;
};


export type MutationCreateProductVideosArgs = {
  data: Array<ProductVideoCreateInput>;
};


export type MutationCreateProductsArgs = {
  data: Array<ProductCreateInput>;
};


export type MutationCreateToppingArgs = {
  data: ToppingCreateInput;
};


export type MutationCreateToppingOptionArgs = {
  data: ToppingOptionCreateInput;
};


export type MutationCreateToppingOptionsArgs = {
  data: Array<ToppingOptionCreateInput>;
};


export type MutationCreateToppingsArgs = {
  data: Array<ToppingCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDecreaseCartItemArgs = {
  cartItemId: Scalars['String']['input'];
};


export type MutationDeleteCartArgs = {
  where: CartWhereUniqueInput;
};


export type MutationDeleteCartItemArgs = {
  where: CartItemWhereUniqueInput;
};


export type MutationDeleteCartItemsArgs = {
  where: Array<CartItemWhereUniqueInput>;
};


export type MutationDeleteCartsArgs = {
  where: Array<CartWhereUniqueInput>;
};


export type MutationDeleteCategoriesArgs = {
  where: Array<CategoryWhereUniqueInput>;
};


export type MutationDeleteCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type MutationDeleteCustomizationOptionArgs = {
  where: CustomizationOptionWhereUniqueInput;
};


export type MutationDeleteCustomizationOptionValueArgs = {
  where: CustomizationOptionValueWhereUniqueInput;
};


export type MutationDeleteCustomizationOptionValuesArgs = {
  where: Array<CustomizationOptionValueWhereUniqueInput>;
};


export type MutationDeleteCustomizationOptionsArgs = {
  where: Array<CustomizationOptionWhereUniqueInput>;
};


export type MutationDeleteCustomizeImageArgs = {
  where: CustomizeImageWhereUniqueInput;
};


export type MutationDeleteCustomizeImagesArgs = {
  where: Array<CustomizeImageWhereUniqueInput>;
};


export type MutationDeleteDelivaryAddressArgs = {
  where: DelivaryAddressWhereUniqueInput;
};


export type MutationDeleteDelivaryAddressesArgs = {
  where: Array<DelivaryAddressWhereUniqueInput>;
};


export type MutationDeleteFeaturedProductArgs = {
  where: FeaturedProductWhereUniqueInput;
};


export type MutationDeleteFeaturedProductsArgs = {
  where: Array<FeaturedProductWhereUniqueInput>;
};


export type MutationDeleteMixBoxProductArgs = {
  where: MixBoxProductWhereUniqueInput;
};


export type MutationDeleteMixBoxProductsArgs = {
  where: Array<MixBoxProductWhereUniqueInput>;
};


export type MutationDeleteOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type MutationDeleteOrderIntentArgs = {
  where: OrderIntentWhereUniqueInput;
};


export type MutationDeleteOrderIntentsArgs = {
  where: Array<OrderIntentWhereUniqueInput>;
};


export type MutationDeleteOrderItemArgs = {
  where: OrderItemWhereUniqueInput;
};


export type MutationDeleteOrderItemsArgs = {
  where: Array<OrderItemWhereUniqueInput>;
};


export type MutationDeleteOrderReceiverArgs = {
  where: OrderReceiverWhereUniqueInput;
};


export type MutationDeleteOrderReceiversArgs = {
  where: Array<OrderReceiverWhereUniqueInput>;
};


export type MutationDeleteOrdersArgs = {
  where: Array<OrderWhereUniqueInput>;
};


export type MutationDeletePaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type MutationDeletePaymentsArgs = {
  where: Array<PaymentWhereUniqueInput>;
};


export type MutationDeleteProductArgs = {
  where: ProductWhereUniqueInput;
};


export type MutationDeleteProductFillingArgs = {
  where: ProductFillingWhereUniqueInput;
};


export type MutationDeleteProductFillingsArgs = {
  where: Array<ProductFillingWhereUniqueInput>;
};


export type MutationDeleteProductHomeBannerArgs = {
  where: ProductHomeBannerWhereUniqueInput;
};


export type MutationDeleteProductHomeBannersArgs = {
  where: Array<ProductHomeBannerWhereUniqueInput>;
};


export type MutationDeleteProductImageArgs = {
  where: ProductImageWhereUniqueInput;
};


export type MutationDeleteProductImagesArgs = {
  where: Array<ProductImageWhereUniqueInput>;
};


export type MutationDeleteProductVariantArgs = {
  where: ProductVariantWhereUniqueInput;
};


export type MutationDeleteProductVariantsArgs = {
  where: Array<ProductVariantWhereUniqueInput>;
};


export type MutationDeleteProductVideoArgs = {
  where: ProductVideoWhereUniqueInput;
};


export type MutationDeleteProductVideosArgs = {
  where: Array<ProductVideoWhereUniqueInput>;
};


export type MutationDeleteProductsArgs = {
  where: Array<ProductWhereUniqueInput>;
};


export type MutationDeleteToppingArgs = {
  where: ToppingWhereUniqueInput;
};


export type MutationDeleteToppingOptionArgs = {
  where: ToppingOptionWhereUniqueInput;
};


export type MutationDeleteToppingOptionsArgs = {
  where: Array<ToppingOptionWhereUniqueInput>;
};


export type MutationDeleteToppingsArgs = {
  where: Array<ToppingWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationIncreaseCartItemArgs = {
  cartItemId: Scalars['String']['input'];
};


export type MutationRedeemUserVerificationTokenArgs = {
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  registerData: RegisterUserInput;
};


export type MutationRemoveFromCartArgs = {
  cartItemId: Scalars['String']['input'];
};


export type MutationRequestCallArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type MutationResendUserVerificationTokenArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendPasswordResetTokenArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateCartArgs = {
  data: CartUpdateInput;
  where: CartWhereUniqueInput;
};


export type MutationUpdateCartItemArgs = {
  data: CartItemUpdateInput;
  where: CartItemWhereUniqueInput;
};


export type MutationUpdateCartItemsArgs = {
  data: Array<CartItemUpdateArgs>;
};


export type MutationUpdateCartsArgs = {
  data: Array<CartUpdateArgs>;
};


export type MutationUpdateCategoriesArgs = {
  data: Array<CategoryUpdateArgs>;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};


export type MutationUpdateCustomizationOptionArgs = {
  data: CustomizationOptionUpdateInput;
  where: CustomizationOptionWhereUniqueInput;
};


export type MutationUpdateCustomizationOptionValueArgs = {
  data: CustomizationOptionValueUpdateInput;
  where: CustomizationOptionValueWhereUniqueInput;
};


export type MutationUpdateCustomizationOptionValuesArgs = {
  data: Array<CustomizationOptionValueUpdateArgs>;
};


export type MutationUpdateCustomizationOptionsArgs = {
  data: Array<CustomizationOptionUpdateArgs>;
};


export type MutationUpdateCustomizeImageArgs = {
  data: CustomizeImageUpdateInput;
  where: CustomizeImageWhereUniqueInput;
};


export type MutationUpdateCustomizeImagesArgs = {
  data: Array<CustomizeImageUpdateArgs>;
};


export type MutationUpdateDelivaryAddressArgs = {
  data: DelivaryAddressUpdateInput;
  where: DelivaryAddressWhereUniqueInput;
};


export type MutationUpdateDelivaryAddressesArgs = {
  data: Array<DelivaryAddressUpdateArgs>;
};


export type MutationUpdateFeaturedProductArgs = {
  data: FeaturedProductUpdateInput;
  where: FeaturedProductWhereUniqueInput;
};


export type MutationUpdateFeaturedProductsArgs = {
  data: Array<FeaturedProductUpdateArgs>;
};


export type MutationUpdateMixBoxProductArgs = {
  data: MixBoxProductUpdateInput;
  where: MixBoxProductWhereUniqueInput;
};


export type MutationUpdateMixBoxProductsArgs = {
  data: Array<MixBoxProductUpdateArgs>;
};


export type MutationUpdateOrderArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};


export type MutationUpdateOrderIntentArgs = {
  data: OrderIntentUpdateInput;
  where: OrderIntentWhereUniqueInput;
};


export type MutationUpdateOrderIntentsArgs = {
  data: Array<OrderIntentUpdateArgs>;
};


export type MutationUpdateOrderItemArgs = {
  data: OrderItemUpdateInput;
  where: OrderItemWhereUniqueInput;
};


export type MutationUpdateOrderItemsArgs = {
  data: Array<OrderItemUpdateArgs>;
};


export type MutationUpdateOrderReceiverArgs = {
  data: OrderReceiverUpdateInput;
  where: OrderReceiverWhereUniqueInput;
};


export type MutationUpdateOrderReceiversArgs = {
  data: Array<OrderReceiverUpdateArgs>;
};


export type MutationUpdateOrdersArgs = {
  data: Array<OrderUpdateArgs>;
};


export type MutationUpdatePasswordArgs = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationUpdatePaymentArgs = {
  data: PaymentUpdateInput;
  where: PaymentWhereUniqueInput;
};


export type MutationUpdatePaymentsArgs = {
  data: Array<PaymentUpdateArgs>;
};


export type MutationUpdateProductArgs = {
  data: ProductUpdateInput;
  where: ProductWhereUniqueInput;
};


export type MutationUpdateProductFillingArgs = {
  data: ProductFillingUpdateInput;
  where: ProductFillingWhereUniqueInput;
};


export type MutationUpdateProductFillingsArgs = {
  data: Array<ProductFillingUpdateArgs>;
};


export type MutationUpdateProductHomeBannerArgs = {
  data: ProductHomeBannerUpdateInput;
  where: ProductHomeBannerWhereUniqueInput;
};


export type MutationUpdateProductHomeBannersArgs = {
  data: Array<ProductHomeBannerUpdateArgs>;
};


export type MutationUpdateProductImageArgs = {
  data: ProductImageUpdateInput;
  where: ProductImageWhereUniqueInput;
};


export type MutationUpdateProductImagesArgs = {
  data: Array<ProductImageUpdateArgs>;
};


export type MutationUpdateProductVariantArgs = {
  data: ProductVariantUpdateInput;
  where: ProductVariantWhereUniqueInput;
};


export type MutationUpdateProductVariantsArgs = {
  data: Array<ProductVariantUpdateArgs>;
};


export type MutationUpdateProductVideoArgs = {
  data: ProductVideoUpdateInput;
  where: ProductVideoWhereUniqueInput;
};


export type MutationUpdateProductVideosArgs = {
  data: Array<ProductVideoUpdateArgs>;
};


export type MutationUpdateProductsArgs = {
  data: Array<ProductUpdateArgs>;
};


export type MutationUpdateToppingArgs = {
  data: ToppingUpdateInput;
  where: ToppingWhereUniqueInput;
};


export type MutationUpdateToppingOptionArgs = {
  data: ToppingOptionUpdateInput;
  where: ToppingOptionWhereUniqueInput;
};


export type MutationUpdateToppingOptionsArgs = {
  data: Array<ToppingOptionUpdateArgs>;
};


export type MutationUpdateToppingsArgs = {
  data: Array<ToppingUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};


export type MutationUploadImageCustomizationArgs = {
  files: Array<Scalars['Upload']['input']>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Order = {
  __typename: 'Order';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  deliveryAddress: Maybe<DelivaryAddress>;
  deliveryDate: Maybe<Scalars['DateTime']['output']>;
  deliveryOption: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  note: Maybe<Scalars['String']['output']>;
  orderDetails: Maybe<Scalars['String']['output']>;
  orderIntent: Maybe<OrderIntent>;
  orderItems: Maybe<Array<OrderItem>>;
  orderItemsCount: Maybe<Scalars['Int']['output']>;
  orderNumber: Maybe<Scalars['String']['output']>;
  orderReceiver: Maybe<OrderReceiver>;
  payment: Maybe<Payment>;
  shippingCost: Maybe<Scalars['Int']['output']>;
  status: Maybe<Scalars['String']['output']>;
  subTotalAmount: Maybe<Scalars['Int']['output']>;
  totalAmount: Maybe<Scalars['Int']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  user: Maybe<User>;
  virtualDeliveryDate: Maybe<Scalars['String']['output']>;
};


export type OrderOrderItemsArgs = {
  cursor?: InputMaybe<OrderItemWhereUniqueInput>;
  orderBy?: Array<OrderItemOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderItemWhereInput;
};


export type OrderOrderItemsCountArgs = {
  where?: OrderItemWhereInput;
};

export type OrderCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveryAddress?: InputMaybe<DelivaryAddressRelateToOneForCreateInput>;
  deliveryDate?: InputMaybe<Scalars['DateTime']['input']>;
  deliveryOption?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  orderIntent?: InputMaybe<OrderIntentRelateToOneForCreateInput>;
  orderItems?: InputMaybe<OrderItemRelateToManyForCreateInput>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  orderReceiver?: InputMaybe<OrderReceiverRelateToOneForCreateInput>;
  payment?: InputMaybe<PaymentRelateToOneForCreateInput>;
  shippingCost?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  subTotalAmount?: InputMaybe<Scalars['Int']['input']>;
  totalAmount?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type OrderIntent = {
  __typename: 'OrderIntent';
  cart: Maybe<Cart>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  deliveryAddress: Maybe<DelivaryAddress>;
  deliveryDate: Maybe<Scalars['DateTime']['output']>;
  deliveryOption: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  intentId: Maybe<Scalars['String']['output']>;
  note: Maybe<Scalars['String']['output']>;
  order: Maybe<Order>;
  orderReceiver: Maybe<OrderReceiver>;
  paymentId: Maybe<Scalars['String']['output']>;
  paymentStatus: Maybe<Scalars['String']['output']>;
  shippingCost: Maybe<Scalars['Int']['output']>;
  totalAmount: Maybe<Scalars['Int']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  user: Maybe<User>;
  yooMoneyId: Maybe<Scalars['String']['output']>;
};

export type OrderIntentCreateInput = {
  cart?: InputMaybe<CartRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveryAddress?: InputMaybe<DelivaryAddressRelateToOneForCreateInput>;
  deliveryDate?: InputMaybe<Scalars['DateTime']['input']>;
  deliveryOption?: InputMaybe<Scalars['String']['input']>;
  intentId?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<OrderRelateToOneForCreateInput>;
  orderReceiver?: InputMaybe<OrderReceiverRelateToOneForCreateInput>;
  paymentId?: InputMaybe<Scalars['String']['input']>;
  paymentStatus?: InputMaybe<Scalars['String']['input']>;
  shippingCost?: InputMaybe<Scalars['Int']['input']>;
  totalAmount?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
  yooMoneyId?: InputMaybe<Scalars['String']['input']>;
};

export type OrderIntentOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  deliveryDate?: InputMaybe<OrderDirection>;
  deliveryOption?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  intentId?: InputMaybe<OrderDirection>;
  note?: InputMaybe<OrderDirection>;
  paymentId?: InputMaybe<OrderDirection>;
  paymentStatus?: InputMaybe<OrderDirection>;
  shippingCost?: InputMaybe<OrderDirection>;
  totalAmount?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  yooMoneyId?: InputMaybe<OrderDirection>;
};

export type OrderIntentRelateToOneForCreateInput = {
  connect?: InputMaybe<OrderIntentWhereUniqueInput>;
  create?: InputMaybe<OrderIntentCreateInput>;
};

export type OrderIntentRelateToOneForUpdateInput = {
  connect?: InputMaybe<OrderIntentWhereUniqueInput>;
  create?: InputMaybe<OrderIntentCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OrderIntentUpdateArgs = {
  data: OrderIntentUpdateInput;
  where: OrderIntentWhereUniqueInput;
};

export type OrderIntentUpdateInput = {
  cart?: InputMaybe<CartRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveryAddress?: InputMaybe<DelivaryAddressRelateToOneForUpdateInput>;
  deliveryDate?: InputMaybe<Scalars['DateTime']['input']>;
  deliveryOption?: InputMaybe<Scalars['String']['input']>;
  intentId?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<OrderRelateToOneForUpdateInput>;
  orderReceiver?: InputMaybe<OrderReceiverRelateToOneForUpdateInput>;
  paymentId?: InputMaybe<Scalars['String']['input']>;
  paymentStatus?: InputMaybe<Scalars['String']['input']>;
  shippingCost?: InputMaybe<Scalars['Int']['input']>;
  totalAmount?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
  yooMoneyId?: InputMaybe<Scalars['String']['input']>;
};

export type OrderIntentWhereInput = {
  AND?: InputMaybe<Array<OrderIntentWhereInput>>;
  NOT?: InputMaybe<Array<OrderIntentWhereInput>>;
  OR?: InputMaybe<Array<OrderIntentWhereInput>>;
  cart?: InputMaybe<CartWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  deliveryAddress?: InputMaybe<DelivaryAddressWhereInput>;
  deliveryDate?: InputMaybe<DateTimeNullableFilter>;
  deliveryOption?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  intentId?: InputMaybe<StringFilter>;
  note?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderWhereInput>;
  orderReceiver?: InputMaybe<OrderReceiverWhereInput>;
  paymentId?: InputMaybe<StringFilter>;
  paymentStatus?: InputMaybe<StringNullableFilter>;
  shippingCost?: InputMaybe<IntNullableFilter>;
  totalAmount?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
  yooMoneyId?: InputMaybe<StringFilter>;
};

export type OrderIntentWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  intentId?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<OrderWhereUniqueInput>;
  yooMoneyId?: InputMaybe<Scalars['String']['input']>;
};

export type OrderItem = {
  __typename: 'OrderItem';
  compositions: Maybe<Scalars['JSON']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  customizations: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  order: Maybe<Order>;
  product: Maybe<Product>;
  quantity: Maybe<Scalars['Int']['output']>;
  subTotal: Maybe<Scalars['Int']['output']>;
  toppingOption: Maybe<ToppingOption>;
  unitPrice: Maybe<Scalars['Int']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  variant: Maybe<ProductVariant>;
};

export type OrderItemCreateInput = {
  compositions?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customizations?: InputMaybe<Scalars['JSON']['input']>;
  order?: InputMaybe<OrderRelateToOneForCreateInput>;
  product?: InputMaybe<ProductRelateToOneForCreateInput>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  subTotal?: InputMaybe<Scalars['Int']['input']>;
  toppingOption?: InputMaybe<ToppingOptionRelateToOneForCreateInput>;
  unitPrice?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  variant?: InputMaybe<ProductVariantRelateToOneForCreateInput>;
};

export type OrderItemManyRelationFilter = {
  every?: InputMaybe<OrderItemWhereInput>;
  none?: InputMaybe<OrderItemWhereInput>;
  some?: InputMaybe<OrderItemWhereInput>;
};

export type OrderItemOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  quantity?: InputMaybe<OrderDirection>;
  subTotal?: InputMaybe<OrderDirection>;
  unitPrice?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type OrderItemRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderItemCreateInput>>;
};

export type OrderItemRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderItemCreateInput>>;
  disconnect?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
  set?: InputMaybe<Array<OrderItemWhereUniqueInput>>;
};

export type OrderItemUpdateArgs = {
  data: OrderItemUpdateInput;
  where: OrderItemWhereUniqueInput;
};

export type OrderItemUpdateInput = {
  compositions?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customizations?: InputMaybe<Scalars['JSON']['input']>;
  order?: InputMaybe<OrderRelateToOneForUpdateInput>;
  product?: InputMaybe<ProductRelateToOneForUpdateInput>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  subTotal?: InputMaybe<Scalars['Int']['input']>;
  toppingOption?: InputMaybe<ToppingOptionRelateToOneForUpdateInput>;
  unitPrice?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  variant?: InputMaybe<ProductVariantRelateToOneForUpdateInput>;
};

export type OrderItemWhereInput = {
  AND?: InputMaybe<Array<OrderItemWhereInput>>;
  NOT?: InputMaybe<Array<OrderItemWhereInput>>;
  OR?: InputMaybe<Array<OrderItemWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  order?: InputMaybe<OrderWhereInput>;
  product?: InputMaybe<ProductWhereInput>;
  quantity?: InputMaybe<IntNullableFilter>;
  subTotal?: InputMaybe<IntNullableFilter>;
  toppingOption?: InputMaybe<ToppingOptionWhereInput>;
  unitPrice?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  variant?: InputMaybe<ProductVariantWhereInput>;
};

export type OrderItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type OrderManyRelationFilter = {
  every?: InputMaybe<OrderWhereInput>;
  none?: InputMaybe<OrderWhereInput>;
  some?: InputMaybe<OrderWhereInput>;
};

export type OrderOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  deliveryDate?: InputMaybe<OrderDirection>;
  deliveryOption?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  note?: InputMaybe<OrderDirection>;
  orderNumber?: InputMaybe<OrderDirection>;
  shippingCost?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  subTotalAmount?: InputMaybe<OrderDirection>;
  totalAmount?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type OrderReceiver = {
  __typename: 'OrderReceiver';
  benefactor: Maybe<User>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Maybe<Scalars['String']['output']>;
  order: Maybe<Order>;
  phoneNumber: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type OrderReceiverCreateInput = {
  benefactor?: InputMaybe<UserRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<OrderRelateToOneForCreateInput>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OrderReceiverInput = {
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type OrderReceiverManyRelationFilter = {
  every?: InputMaybe<OrderReceiverWhereInput>;
  none?: InputMaybe<OrderReceiverWhereInput>;
  some?: InputMaybe<OrderReceiverWhereInput>;
};

export type OrderReceiverOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  phoneNumber?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type OrderReceiverRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<OrderReceiverWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderReceiverCreateInput>>;
};

export type OrderReceiverRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<OrderReceiverWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderReceiverCreateInput>>;
  disconnect?: InputMaybe<Array<OrderReceiverWhereUniqueInput>>;
  set?: InputMaybe<Array<OrderReceiverWhereUniqueInput>>;
};

export type OrderReceiverRelateToOneForCreateInput = {
  connect?: InputMaybe<OrderReceiverWhereUniqueInput>;
  create?: InputMaybe<OrderReceiverCreateInput>;
};

export type OrderReceiverRelateToOneForUpdateInput = {
  connect?: InputMaybe<OrderReceiverWhereUniqueInput>;
  create?: InputMaybe<OrderReceiverCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OrderReceiverUpdateArgs = {
  data: OrderReceiverUpdateInput;
  where: OrderReceiverWhereUniqueInput;
};

export type OrderReceiverUpdateInput = {
  benefactor?: InputMaybe<UserRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<OrderRelateToOneForUpdateInput>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OrderReceiverWhereInput = {
  AND?: InputMaybe<Array<OrderReceiverWhereInput>>;
  NOT?: InputMaybe<Array<OrderReceiverWhereInput>>;
  OR?: InputMaybe<Array<OrderReceiverWhereInput>>;
  benefactor?: InputMaybe<UserWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderWhereInput>;
  phoneNumber?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type OrderReceiverWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<OrderWhereUniqueInput>;
};

export type OrderRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderCreateInput>>;
};

export type OrderRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderCreateInput>>;
  disconnect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  set?: InputMaybe<Array<OrderWhereUniqueInput>>;
};

export type OrderRelateToOneForCreateInput = {
  connect?: InputMaybe<OrderWhereUniqueInput>;
  create?: InputMaybe<OrderCreateInput>;
};

export type OrderRelateToOneForUpdateInput = {
  connect?: InputMaybe<OrderWhereUniqueInput>;
  create?: InputMaybe<OrderCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OrderUpdateArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};

export type OrderUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveryAddress?: InputMaybe<DelivaryAddressRelateToOneForUpdateInput>;
  deliveryDate?: InputMaybe<Scalars['DateTime']['input']>;
  deliveryOption?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  orderIntent?: InputMaybe<OrderIntentRelateToOneForUpdateInput>;
  orderItems?: InputMaybe<OrderItemRelateToManyForUpdateInput>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  orderReceiver?: InputMaybe<OrderReceiverRelateToOneForUpdateInput>;
  payment?: InputMaybe<PaymentRelateToOneForUpdateInput>;
  shippingCost?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  subTotalAmount?: InputMaybe<Scalars['Int']['input']>;
  totalAmount?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type OrderWhereInput = {
  AND?: InputMaybe<Array<OrderWhereInput>>;
  NOT?: InputMaybe<Array<OrderWhereInput>>;
  OR?: InputMaybe<Array<OrderWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  deliveryAddress?: InputMaybe<DelivaryAddressWhereInput>;
  deliveryDate?: InputMaybe<DateTimeNullableFilter>;
  deliveryOption?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  note?: InputMaybe<StringFilter>;
  orderIntent?: InputMaybe<OrderIntentWhereInput>;
  orderItems?: InputMaybe<OrderItemManyRelationFilter>;
  orderNumber?: InputMaybe<StringFilter>;
  orderReceiver?: InputMaybe<OrderReceiverWhereInput>;
  payment?: InputMaybe<PaymentWhereInput>;
  shippingCost?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<StringNullableFilter>;
  subTotalAmount?: InputMaybe<IntNullableFilter>;
  totalAmount?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type OrderWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  orderIntent?: InputMaybe<OrderIntentWhereUniqueInput>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  orderReceiver?: InputMaybe<OrderReceiverWhereUniqueInput>;
  payment?: InputMaybe<PaymentWhereUniqueInput>;
};

export type PasswordState = {
  __typename: 'PasswordState';
  isSet: Scalars['Boolean']['output'];
};

export type Payment = {
  __typename: 'Payment';
  amount: Maybe<Scalars['String']['output']>;
  confirmationUrl: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  method: Maybe<Scalars['String']['output']>;
  order: Maybe<Order>;
  paidAt: Maybe<Scalars['DateTime']['output']>;
  redirectUrl: Maybe<Scalars['String']['output']>;
  status: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  user: Maybe<User>;
  yooMoneyId: Maybe<Scalars['String']['output']>;
};

export type PaymentCreateInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  confirmationUrl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<OrderRelateToOneForCreateInput>;
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  redirectUrl?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
  yooMoneyId?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentManyRelationFilter = {
  every?: InputMaybe<PaymentWhereInput>;
  none?: InputMaybe<PaymentWhereInput>;
  some?: InputMaybe<PaymentWhereInput>;
};

export type PaymentOrderByInput = {
  amount?: InputMaybe<OrderDirection>;
  confirmationUrl?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  method?: InputMaybe<OrderDirection>;
  paidAt?: InputMaybe<OrderDirection>;
  redirectUrl?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  yooMoneyId?: InputMaybe<OrderDirection>;
};

export type PaymentRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PaymentWhereUniqueInput>>;
  create?: InputMaybe<Array<PaymentCreateInput>>;
};

export type PaymentRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PaymentWhereUniqueInput>>;
  create?: InputMaybe<Array<PaymentCreateInput>>;
  disconnect?: InputMaybe<Array<PaymentWhereUniqueInput>>;
  set?: InputMaybe<Array<PaymentWhereUniqueInput>>;
};

export type PaymentRelateToOneForCreateInput = {
  connect?: InputMaybe<PaymentWhereUniqueInput>;
  create?: InputMaybe<PaymentCreateInput>;
};

export type PaymentRelateToOneForUpdateInput = {
  connect?: InputMaybe<PaymentWhereUniqueInput>;
  create?: InputMaybe<PaymentCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PaymentUpdateArgs = {
  data: PaymentUpdateInput;
  where: PaymentWhereUniqueInput;
};

export type PaymentUpdateInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  confirmationUrl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<OrderRelateToOneForUpdateInput>;
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  redirectUrl?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
  yooMoneyId?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentWhereInput = {
  AND?: InputMaybe<Array<PaymentWhereInput>>;
  NOT?: InputMaybe<Array<PaymentWhereInput>>;
  OR?: InputMaybe<Array<PaymentWhereInput>>;
  amount?: InputMaybe<StringFilter>;
  confirmationUrl?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  method?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderWhereInput>;
  paidAt?: InputMaybe<DateTimeNullableFilter>;
  redirectUrl?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
  yooMoneyId?: InputMaybe<StringFilter>;
};

export type PaymentWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<OrderWhereUniqueInput>;
  yooMoneyId?: InputMaybe<Scalars['String']['input']>;
};

export type Product = {
  __typename: 'Product';
  badge: Maybe<Scalars['String']['output']>;
  baseDescription: Maybe<Scalars['String']['output']>;
  categories: Maybe<Array<Category>>;
  categoriesCount: Maybe<Scalars['Int']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  customizations: Maybe<Array<CustomizationOption>>;
  customizationsCount: Maybe<Scalars['Int']['output']>;
  fillings: Maybe<Array<ProductFilling>>;
  fillingsCount: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  images: Maybe<Array<ProductImage>>;
  imagesCount: Maybe<Scalars['Int']['output']>;
  isAvailable: Maybe<Scalars['Boolean']['output']>;
  mixBoxProduct: Maybe<MixBoxProduct>;
  name: Maybe<Scalars['String']['output']>;
  preparationDays: Maybe<Scalars['Int']['output']>;
  slug: Maybe<Scalars['String']['output']>;
  topping: Maybe<Topping>;
  type: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  variantType: Maybe<Scalars['String']['output']>;
  video: Maybe<ProductVideo>;
};


export type ProductCategoriesArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  orderBy?: Array<CategoryOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CategoryWhereInput;
};


export type ProductCategoriesCountArgs = {
  where?: CategoryWhereInput;
};


export type ProductCustomizationsArgs = {
  cursor?: InputMaybe<CustomizationOptionWhereUniqueInput>;
  orderBy?: Array<CustomizationOptionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CustomizationOptionWhereInput;
};


export type ProductCustomizationsCountArgs = {
  where?: CustomizationOptionWhereInput;
};


export type ProductFillingsArgs = {
  cursor?: InputMaybe<ProductFillingWhereUniqueInput>;
  orderBy?: Array<ProductFillingOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductFillingWhereInput;
};


export type ProductFillingsCountArgs = {
  where?: ProductFillingWhereInput;
};


export type ProductImagesArgs = {
  cursor?: InputMaybe<ProductImageWhereUniqueInput>;
  orderBy?: Array<ProductImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductImageWhereInput;
};


export type ProductImagesCountArgs = {
  where?: ProductImageWhereInput;
};

export type ProductCreateInput = {
  badge?: InputMaybe<Scalars['String']['input']>;
  baseDescription?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<CategoryRelateToManyForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customizations?: InputMaybe<CustomizationOptionRelateToManyForCreateInput>;
  fillings?: InputMaybe<ProductFillingRelateToManyForCreateInput>;
  images?: InputMaybe<ProductImageRelateToManyForCreateInput>;
  isAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  mixBoxProduct?: InputMaybe<MixBoxProductRelateToOneForCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  preparationDays?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  topping?: InputMaybe<ToppingRelateToOneForCreateInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  variantType?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<ProductVideoRelateToOneForCreateInput>;
};

export type ProductFilling = {
  __typename: 'ProductFilling';
  calories: Maybe<Scalars['Decimal']['output']>;
  carbonhydrate: Maybe<Scalars['Decimal']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  fat: Maybe<Scalars['Decimal']['output']>;
  hasDetails: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  image_icon: Maybe<ImageFieldOutput>;
  ingredients: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  products: Maybe<Array<Product>>;
  productsCount: Maybe<Scalars['Int']['output']>;
  protein: Maybe<Scalars['Decimal']['output']>;
  slug: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  variants: Maybe<Array<ProductVariant>>;
  variantsCount: Maybe<Scalars['Int']['output']>;
};


export type ProductFillingProductsArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>;
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductWhereInput;
};


export type ProductFillingProductsCountArgs = {
  where?: ProductWhereInput;
};


export type ProductFillingVariantsArgs = {
  cursor?: InputMaybe<ProductVariantWhereUniqueInput>;
  orderBy?: Array<ProductVariantOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductVariantWhereInput;
};


export type ProductFillingVariantsCountArgs = {
  where?: ProductVariantWhereInput;
};

export type ProductFillingCreateInput = {
  calories?: InputMaybe<Scalars['Decimal']['input']>;
  carbonhydrate?: InputMaybe<Scalars['Decimal']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  fat?: InputMaybe<Scalars['Decimal']['input']>;
  hasDetails?: InputMaybe<Scalars['Boolean']['input']>;
  image_icon?: InputMaybe<ImageFieldInput>;
  ingredients?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<ProductRelateToManyForCreateInput>;
  protein?: InputMaybe<Scalars['Decimal']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  variants?: InputMaybe<ProductVariantRelateToManyForCreateInput>;
};

export type ProductFillingManyRelationFilter = {
  every?: InputMaybe<ProductFillingWhereInput>;
  none?: InputMaybe<ProductFillingWhereInput>;
  some?: InputMaybe<ProductFillingWhereInput>;
};

export type ProductFillingOrderByInput = {
  calories?: InputMaybe<OrderDirection>;
  carbonhydrate?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  fat?: InputMaybe<OrderDirection>;
  hasDetails?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  ingredients?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  protein?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type ProductFillingRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ProductFillingWhereUniqueInput>>;
  create?: InputMaybe<Array<ProductFillingCreateInput>>;
};

export type ProductFillingRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ProductFillingWhereUniqueInput>>;
  create?: InputMaybe<Array<ProductFillingCreateInput>>;
  disconnect?: InputMaybe<Array<ProductFillingWhereUniqueInput>>;
  set?: InputMaybe<Array<ProductFillingWhereUniqueInput>>;
};

export type ProductFillingRelateToOneForCreateInput = {
  connect?: InputMaybe<ProductFillingWhereUniqueInput>;
  create?: InputMaybe<ProductFillingCreateInput>;
};

export type ProductFillingRelateToOneForUpdateInput = {
  connect?: InputMaybe<ProductFillingWhereUniqueInput>;
  create?: InputMaybe<ProductFillingCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProductFillingUpdateArgs = {
  data: ProductFillingUpdateInput;
  where: ProductFillingWhereUniqueInput;
};

export type ProductFillingUpdateInput = {
  calories?: InputMaybe<Scalars['Decimal']['input']>;
  carbonhydrate?: InputMaybe<Scalars['Decimal']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  fat?: InputMaybe<Scalars['Decimal']['input']>;
  hasDetails?: InputMaybe<Scalars['Boolean']['input']>;
  image_icon?: InputMaybe<ImageFieldInput>;
  ingredients?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<ProductRelateToManyForUpdateInput>;
  protein?: InputMaybe<Scalars['Decimal']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  variants?: InputMaybe<ProductVariantRelateToManyForUpdateInput>;
};

export type ProductFillingWhereInput = {
  AND?: InputMaybe<Array<ProductFillingWhereInput>>;
  NOT?: InputMaybe<Array<ProductFillingWhereInput>>;
  OR?: InputMaybe<Array<ProductFillingWhereInput>>;
  calories?: InputMaybe<DecimalNullableFilter>;
  carbonhydrate?: InputMaybe<DecimalNullableFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringFilter>;
  fat?: InputMaybe<DecimalNullableFilter>;
  hasDetails?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<IdFilter>;
  ingredients?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  products?: InputMaybe<ProductManyRelationFilter>;
  protein?: InputMaybe<DecimalNullableFilter>;
  slug?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  variants?: InputMaybe<ProductVariantManyRelationFilter>;
};

export type ProductFillingWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type ProductHomeBanner = {
  __typename: 'ProductHomeBanner';
  bannerText: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  product: Maybe<Product>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type ProductHomeBannerCreateInput = {
  bannerText?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  product?: InputMaybe<ProductRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProductHomeBannerOrderByInput = {
  bannerText?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type ProductHomeBannerUpdateArgs = {
  data: ProductHomeBannerUpdateInput;
  where: ProductHomeBannerWhereUniqueInput;
};

export type ProductHomeBannerUpdateInput = {
  bannerText?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  product?: InputMaybe<ProductRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProductHomeBannerWhereInput = {
  AND?: InputMaybe<Array<ProductHomeBannerWhereInput>>;
  NOT?: InputMaybe<Array<ProductHomeBannerWhereInput>>;
  OR?: InputMaybe<Array<ProductHomeBannerWhereInput>>;
  bannerText?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  product?: InputMaybe<ProductWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type ProductHomeBannerWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ProductImage = {
  __typename: 'ProductImage';
  altText: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image: Maybe<ImageFieldOutput>;
  isMain: Maybe<Scalars['Boolean']['output']>;
  product: Maybe<Product>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type ProductImageCreateInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  isMain?: InputMaybe<Scalars['Boolean']['input']>;
  product?: InputMaybe<ProductRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProductImageManyRelationFilter = {
  every?: InputMaybe<ProductImageWhereInput>;
  none?: InputMaybe<ProductImageWhereInput>;
  some?: InputMaybe<ProductImageWhereInput>;
};

export type ProductImageOrderByInput = {
  altText?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isMain?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type ProductImageRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ProductImageWhereUniqueInput>>;
  create?: InputMaybe<Array<ProductImageCreateInput>>;
};

export type ProductImageRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ProductImageWhereUniqueInput>>;
  create?: InputMaybe<Array<ProductImageCreateInput>>;
  disconnect?: InputMaybe<Array<ProductImageWhereUniqueInput>>;
  set?: InputMaybe<Array<ProductImageWhereUniqueInput>>;
};

export type ProductImageUpdateArgs = {
  data: ProductImageUpdateInput;
  where: ProductImageWhereUniqueInput;
};

export type ProductImageUpdateInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  isMain?: InputMaybe<Scalars['Boolean']['input']>;
  product?: InputMaybe<ProductRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProductImageWhereInput = {
  AND?: InputMaybe<Array<ProductImageWhereInput>>;
  NOT?: InputMaybe<Array<ProductImageWhereInput>>;
  OR?: InputMaybe<Array<ProductImageWhereInput>>;
  altText?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  isMain?: InputMaybe<BooleanFilter>;
  product?: InputMaybe<ProductWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type ProductImageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ProductManyRelationFilter = {
  every?: InputMaybe<ProductWhereInput>;
  none?: InputMaybe<ProductWhereInput>;
  some?: InputMaybe<ProductWhereInput>;
};

export type ProductOrderByInput = {
  badge?: InputMaybe<OrderDirection>;
  baseDescription?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isAvailable?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  preparationDays?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  variantType?: InputMaybe<OrderDirection>;
};

export type ProductRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ProductWhereUniqueInput>>;
  create?: InputMaybe<Array<ProductCreateInput>>;
};

export type ProductRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ProductWhereUniqueInput>>;
  create?: InputMaybe<Array<ProductCreateInput>>;
  disconnect?: InputMaybe<Array<ProductWhereUniqueInput>>;
  set?: InputMaybe<Array<ProductWhereUniqueInput>>;
};

export type ProductRelateToOneForCreateInput = {
  connect?: InputMaybe<ProductWhereUniqueInput>;
  create?: InputMaybe<ProductCreateInput>;
};

export type ProductRelateToOneForUpdateInput = {
  connect?: InputMaybe<ProductWhereUniqueInput>;
  create?: InputMaybe<ProductCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProductUpdateArgs = {
  data: ProductUpdateInput;
  where: ProductWhereUniqueInput;
};

export type ProductUpdateInput = {
  badge?: InputMaybe<Scalars['String']['input']>;
  baseDescription?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<CategoryRelateToManyForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customizations?: InputMaybe<CustomizationOptionRelateToManyForUpdateInput>;
  fillings?: InputMaybe<ProductFillingRelateToManyForUpdateInput>;
  images?: InputMaybe<ProductImageRelateToManyForUpdateInput>;
  isAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  mixBoxProduct?: InputMaybe<MixBoxProductRelateToOneForUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  preparationDays?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  topping?: InputMaybe<ToppingRelateToOneForUpdateInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  variantType?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<ProductVideoRelateToOneForUpdateInput>;
};

export type ProductVariant = {
  __typename: 'ProductVariant';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  filling: Maybe<ProductFilling>;
  id: Scalars['ID']['output'];
  pieces: Maybe<Scalars['Int']['output']>;
  price: Maybe<Scalars['Int']['output']>;
  serving: Maybe<Scalars['Int']['output']>;
  size: Maybe<Scalars['Int']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  weight: Maybe<Scalars['Decimal']['output']>;
};

export type ProductVariantCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  filling?: InputMaybe<ProductFillingRelateToOneForCreateInput>;
  pieces?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  serving?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  weight?: InputMaybe<Scalars['Decimal']['input']>;
};

export type ProductVariantManyRelationFilter = {
  every?: InputMaybe<ProductVariantWhereInput>;
  none?: InputMaybe<ProductVariantWhereInput>;
  some?: InputMaybe<ProductVariantWhereInput>;
};

export type ProductVariantOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  pieces?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  serving?: InputMaybe<OrderDirection>;
  size?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  weight?: InputMaybe<OrderDirection>;
};

export type ProductVariantRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ProductVariantWhereUniqueInput>>;
  create?: InputMaybe<Array<ProductVariantCreateInput>>;
};

export type ProductVariantRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ProductVariantWhereUniqueInput>>;
  create?: InputMaybe<Array<ProductVariantCreateInput>>;
  disconnect?: InputMaybe<Array<ProductVariantWhereUniqueInput>>;
  set?: InputMaybe<Array<ProductVariantWhereUniqueInput>>;
};

export type ProductVariantRelateToOneForCreateInput = {
  connect?: InputMaybe<ProductVariantWhereUniqueInput>;
  create?: InputMaybe<ProductVariantCreateInput>;
};

export type ProductVariantRelateToOneForUpdateInput = {
  connect?: InputMaybe<ProductVariantWhereUniqueInput>;
  create?: InputMaybe<ProductVariantCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProductVariantUpdateArgs = {
  data: ProductVariantUpdateInput;
  where: ProductVariantWhereUniqueInput;
};

export type ProductVariantUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  filling?: InputMaybe<ProductFillingRelateToOneForUpdateInput>;
  pieces?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  serving?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  weight?: InputMaybe<Scalars['Decimal']['input']>;
};

export type ProductVariantWhereInput = {
  AND?: InputMaybe<Array<ProductVariantWhereInput>>;
  NOT?: InputMaybe<Array<ProductVariantWhereInput>>;
  OR?: InputMaybe<Array<ProductVariantWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  filling?: InputMaybe<ProductFillingWhereInput>;
  id?: InputMaybe<IdFilter>;
  pieces?: InputMaybe<IntNullableFilter>;
  price?: InputMaybe<IntFilter>;
  serving?: InputMaybe<IntNullableFilter>;
  size?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  weight?: InputMaybe<DecimalNullableFilter>;
};

export type ProductVariantWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ProductVideo = {
  __typename: 'ProductVideo';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  product: Maybe<Product>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  video: Maybe<FileFieldOutput>;
};

export type ProductVideoCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  product?: InputMaybe<ProductRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  video?: InputMaybe<FileFieldInput>;
};

export type ProductVideoOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type ProductVideoRelateToOneForCreateInput = {
  connect?: InputMaybe<ProductVideoWhereUniqueInput>;
  create?: InputMaybe<ProductVideoCreateInput>;
};

export type ProductVideoRelateToOneForUpdateInput = {
  connect?: InputMaybe<ProductVideoWhereUniqueInput>;
  create?: InputMaybe<ProductVideoCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProductVideoUpdateArgs = {
  data: ProductVideoUpdateInput;
  where: ProductVideoWhereUniqueInput;
};

export type ProductVideoUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  product?: InputMaybe<ProductRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  video?: InputMaybe<FileFieldInput>;
};

export type ProductVideoWhereInput = {
  AND?: InputMaybe<Array<ProductVideoWhereInput>>;
  NOT?: InputMaybe<Array<ProductVideoWhereInput>>;
  OR?: InputMaybe<Array<ProductVideoWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  product?: InputMaybe<ProductWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type ProductVideoWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  product?: InputMaybe<ProductWhereUniqueInput>;
};

export type ProductWhereInput = {
  AND?: InputMaybe<Array<ProductWhereInput>>;
  NOT?: InputMaybe<Array<ProductWhereInput>>;
  OR?: InputMaybe<Array<ProductWhereInput>>;
  badge?: InputMaybe<StringNullableFilter>;
  baseDescription?: InputMaybe<StringFilter>;
  categories?: InputMaybe<CategoryManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  customizations?: InputMaybe<CustomizationOptionManyRelationFilter>;
  fillings?: InputMaybe<ProductFillingManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  images?: InputMaybe<ProductImageManyRelationFilter>;
  isAvailable?: InputMaybe<BooleanFilter>;
  mixBoxProduct?: InputMaybe<MixBoxProductWhereInput>;
  name?: InputMaybe<StringFilter>;
  preparationDays?: InputMaybe<IntNullableFilter>;
  slug?: InputMaybe<StringFilter>;
  topping?: InputMaybe<ToppingWhereInput>;
  type?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  variantType?: InputMaybe<StringFilter>;
  video?: InputMaybe<ProductVideoWhereInput>;
};

export type ProductWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  mixBoxProduct?: InputMaybe<MixBoxProductWhereUniqueInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<ProductVideoWhereUniqueInput>;
};

export type Query = {
  __typename: 'Query';
  authenticatedItem: Maybe<AuthenticatedItem>;
  cart: Maybe<Cart>;
  cartItem: Maybe<CartItem>;
  cartItems: Maybe<Array<CartItem>>;
  cartItemsCount: Maybe<Scalars['Int']['output']>;
  carts: Maybe<Array<Cart>>;
  cartsCount: Maybe<Scalars['Int']['output']>;
  categories: Maybe<Array<Category>>;
  categoriesCount: Maybe<Scalars['Int']['output']>;
  category: Maybe<Category>;
  customizationOption: Maybe<CustomizationOption>;
  customizationOptionValue: Maybe<CustomizationOptionValue>;
  customizationOptionValues: Maybe<Array<CustomizationOptionValue>>;
  customizationOptionValuesCount: Maybe<Scalars['Int']['output']>;
  customizationOptions: Maybe<Array<CustomizationOption>>;
  customizationOptionsCount: Maybe<Scalars['Int']['output']>;
  customizeImage: Maybe<CustomizeImage>;
  customizeImages: Maybe<Array<CustomizeImage>>;
  customizeImagesCount: Maybe<Scalars['Int']['output']>;
  delivaryAddress: Maybe<DelivaryAddress>;
  delivaryAddresses: Maybe<Array<DelivaryAddress>>;
  delivaryAddressesCount: Maybe<Scalars['Int']['output']>;
  featuredProduct: Maybe<FeaturedProduct>;
  featuredProducts: Maybe<Array<FeaturedProduct>>;
  featuredProductsCount: Maybe<Scalars['Int']['output']>;
  isEmailInUse: Scalars['Boolean']['output'];
  isPhoneNumberInUse: Scalars['Boolean']['output'];
  keystone: KeystoneMeta;
  mixBoxProduct: Maybe<MixBoxProduct>;
  mixBoxProducts: Maybe<Array<MixBoxProduct>>;
  mixBoxProductsCount: Maybe<Scalars['Int']['output']>;
  order: Maybe<Order>;
  orderIntent: Maybe<OrderIntent>;
  orderIntents: Maybe<Array<OrderIntent>>;
  orderIntentsCount: Maybe<Scalars['Int']['output']>;
  orderItem: Maybe<OrderItem>;
  orderItems: Maybe<Array<OrderItem>>;
  orderItemsCount: Maybe<Scalars['Int']['output']>;
  orderReceiver: Maybe<OrderReceiver>;
  orderReceivers: Maybe<Array<OrderReceiver>>;
  orderReceiversCount: Maybe<Scalars['Int']['output']>;
  orders: Maybe<Array<Order>>;
  ordersCount: Maybe<Scalars['Int']['output']>;
  payment: Maybe<Payment>;
  payments: Maybe<Array<Payment>>;
  paymentsCount: Maybe<Scalars['Int']['output']>;
  product: Maybe<Product>;
  productFilling: Maybe<ProductFilling>;
  productFillings: Maybe<Array<ProductFilling>>;
  productFillingsCount: Maybe<Scalars['Int']['output']>;
  productHomeBanner: Maybe<ProductHomeBanner>;
  productHomeBanners: Maybe<Array<ProductHomeBanner>>;
  productHomeBannersCount: Maybe<Scalars['Int']['output']>;
  productImage: Maybe<ProductImage>;
  productImages: Maybe<Array<ProductImage>>;
  productImagesCount: Maybe<Scalars['Int']['output']>;
  productVariant: Maybe<ProductVariant>;
  productVariants: Maybe<Array<ProductVariant>>;
  productVariantsCount: Maybe<Scalars['Int']['output']>;
  productVideo: Maybe<ProductVideo>;
  productVideos: Maybe<Array<ProductVideo>>;
  productVideosCount: Maybe<Scalars['Int']['output']>;
  products: Maybe<Array<Product>>;
  productsCount: Maybe<Scalars['Int']['output']>;
  queryAuthorizedUser: Maybe<User>;
  queryCart: Maybe<Cart>;
  querySimilarProducts: Array<Product>;
  topping: Maybe<Topping>;
  toppingOption: Maybe<ToppingOption>;
  toppingOptions: Maybe<Array<ToppingOption>>;
  toppingOptionsCount: Maybe<Scalars['Int']['output']>;
  toppings: Maybe<Array<Topping>>;
  toppingsCount: Maybe<Scalars['Int']['output']>;
  user: Maybe<User>;
  users: Maybe<Array<User>>;
  usersCount: Maybe<Scalars['Int']['output']>;
  validatePasswordResetToken: Scalars['Boolean']['output'];
};


export type QueryCartArgs = {
  where: CartWhereUniqueInput;
};


export type QueryCartItemArgs = {
  where: CartItemWhereUniqueInput;
};


export type QueryCartItemsArgs = {
  cursor?: InputMaybe<CartItemWhereUniqueInput>;
  orderBy?: Array<CartItemOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CartItemWhereInput;
};


export type QueryCartItemsCountArgs = {
  where?: CartItemWhereInput;
};


export type QueryCartsArgs = {
  cursor?: InputMaybe<CartWhereUniqueInput>;
  orderBy?: Array<CartOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CartWhereInput;
};


export type QueryCartsCountArgs = {
  where?: CartWhereInput;
};


export type QueryCategoriesArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  orderBy?: Array<CategoryOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CategoryWhereInput;
};


export type QueryCategoriesCountArgs = {
  where?: CategoryWhereInput;
};


export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type QueryCustomizationOptionArgs = {
  where: CustomizationOptionWhereUniqueInput;
};


export type QueryCustomizationOptionValueArgs = {
  where: CustomizationOptionValueWhereUniqueInput;
};


export type QueryCustomizationOptionValuesArgs = {
  cursor?: InputMaybe<CustomizationOptionValueWhereUniqueInput>;
  orderBy?: Array<CustomizationOptionValueOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CustomizationOptionValueWhereInput;
};


export type QueryCustomizationOptionValuesCountArgs = {
  where?: CustomizationOptionValueWhereInput;
};


export type QueryCustomizationOptionsArgs = {
  cursor?: InputMaybe<CustomizationOptionWhereUniqueInput>;
  orderBy?: Array<CustomizationOptionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CustomizationOptionWhereInput;
};


export type QueryCustomizationOptionsCountArgs = {
  where?: CustomizationOptionWhereInput;
};


export type QueryCustomizeImageArgs = {
  where: CustomizeImageWhereUniqueInput;
};


export type QueryCustomizeImagesArgs = {
  cursor?: InputMaybe<CustomizeImageWhereUniqueInput>;
  orderBy?: Array<CustomizeImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CustomizeImageWhereInput;
};


export type QueryCustomizeImagesCountArgs = {
  where?: CustomizeImageWhereInput;
};


export type QueryDelivaryAddressArgs = {
  where: DelivaryAddressWhereUniqueInput;
};


export type QueryDelivaryAddressesArgs = {
  cursor?: InputMaybe<DelivaryAddressWhereUniqueInput>;
  orderBy?: Array<DelivaryAddressOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: DelivaryAddressWhereInput;
};


export type QueryDelivaryAddressesCountArgs = {
  where?: DelivaryAddressWhereInput;
};


export type QueryFeaturedProductArgs = {
  where: FeaturedProductWhereUniqueInput;
};


export type QueryFeaturedProductsArgs = {
  cursor?: InputMaybe<FeaturedProductWhereUniqueInput>;
  orderBy?: Array<FeaturedProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: FeaturedProductWhereInput;
};


export type QueryFeaturedProductsCountArgs = {
  where?: FeaturedProductWhereInput;
};


export type QueryIsEmailInUseArgs = {
  email: Scalars['String']['input'];
};


export type QueryIsPhoneNumberInUseArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type QueryMixBoxProductArgs = {
  where: MixBoxProductWhereUniqueInput;
};


export type QueryMixBoxProductsArgs = {
  cursor?: InputMaybe<MixBoxProductWhereUniqueInput>;
  orderBy?: Array<MixBoxProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: MixBoxProductWhereInput;
};


export type QueryMixBoxProductsCountArgs = {
  where?: MixBoxProductWhereInput;
};


export type QueryOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type QueryOrderIntentArgs = {
  where: OrderIntentWhereUniqueInput;
};


export type QueryOrderIntentsArgs = {
  cursor?: InputMaybe<OrderIntentWhereUniqueInput>;
  orderBy?: Array<OrderIntentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderIntentWhereInput;
};


export type QueryOrderIntentsCountArgs = {
  where?: OrderIntentWhereInput;
};


export type QueryOrderItemArgs = {
  where: OrderItemWhereUniqueInput;
};


export type QueryOrderItemsArgs = {
  cursor?: InputMaybe<OrderItemWhereUniqueInput>;
  orderBy?: Array<OrderItemOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderItemWhereInput;
};


export type QueryOrderItemsCountArgs = {
  where?: OrderItemWhereInput;
};


export type QueryOrderReceiverArgs = {
  where: OrderReceiverWhereUniqueInput;
};


export type QueryOrderReceiversArgs = {
  cursor?: InputMaybe<OrderReceiverWhereUniqueInput>;
  orderBy?: Array<OrderReceiverOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderReceiverWhereInput;
};


export type QueryOrderReceiversCountArgs = {
  where?: OrderReceiverWhereInput;
};


export type QueryOrdersArgs = {
  cursor?: InputMaybe<OrderWhereUniqueInput>;
  orderBy?: Array<OrderOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderWhereInput;
};


export type QueryOrdersCountArgs = {
  where?: OrderWhereInput;
};


export type QueryPaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type QueryPaymentsArgs = {
  cursor?: InputMaybe<PaymentWhereUniqueInput>;
  orderBy?: Array<PaymentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PaymentWhereInput;
};


export type QueryPaymentsCountArgs = {
  where?: PaymentWhereInput;
};


export type QueryProductArgs = {
  where: ProductWhereUniqueInput;
};


export type QueryProductFillingArgs = {
  where: ProductFillingWhereUniqueInput;
};


export type QueryProductFillingsArgs = {
  cursor?: InputMaybe<ProductFillingWhereUniqueInput>;
  orderBy?: Array<ProductFillingOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductFillingWhereInput;
};


export type QueryProductFillingsCountArgs = {
  where?: ProductFillingWhereInput;
};


export type QueryProductHomeBannerArgs = {
  where: ProductHomeBannerWhereUniqueInput;
};


export type QueryProductHomeBannersArgs = {
  cursor?: InputMaybe<ProductHomeBannerWhereUniqueInput>;
  orderBy?: Array<ProductHomeBannerOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductHomeBannerWhereInput;
};


export type QueryProductHomeBannersCountArgs = {
  where?: ProductHomeBannerWhereInput;
};


export type QueryProductImageArgs = {
  where: ProductImageWhereUniqueInput;
};


export type QueryProductImagesArgs = {
  cursor?: InputMaybe<ProductImageWhereUniqueInput>;
  orderBy?: Array<ProductImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductImageWhereInput;
};


export type QueryProductImagesCountArgs = {
  where?: ProductImageWhereInput;
};


export type QueryProductVariantArgs = {
  where: ProductVariantWhereUniqueInput;
};


export type QueryProductVariantsArgs = {
  cursor?: InputMaybe<ProductVariantWhereUniqueInput>;
  orderBy?: Array<ProductVariantOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductVariantWhereInput;
};


export type QueryProductVariantsCountArgs = {
  where?: ProductVariantWhereInput;
};


export type QueryProductVideoArgs = {
  where: ProductVideoWhereUniqueInput;
};


export type QueryProductVideosArgs = {
  cursor?: InputMaybe<ProductVideoWhereUniqueInput>;
  orderBy?: Array<ProductVideoOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductVideoWhereInput;
};


export type QueryProductVideosCountArgs = {
  where?: ProductVideoWhereInput;
};


export type QueryProductsArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>;
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductWhereInput;
};


export type QueryProductsCountArgs = {
  where?: ProductWhereInput;
};


export type QueryQuerySimilarProductsArgs = {
  productSlug: Scalars['String']['input'];
};


export type QueryToppingArgs = {
  where: ToppingWhereUniqueInput;
};


export type QueryToppingOptionArgs = {
  where: ToppingOptionWhereUniqueInput;
};


export type QueryToppingOptionsArgs = {
  cursor?: InputMaybe<ToppingOptionWhereUniqueInput>;
  orderBy?: Array<ToppingOptionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ToppingOptionWhereInput;
};


export type QueryToppingOptionsCountArgs = {
  where?: ToppingOptionWhereInput;
};


export type QueryToppingsArgs = {
  cursor?: InputMaybe<ToppingWhereUniqueInput>;
  orderBy?: Array<ToppingOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ToppingWhereInput;
};


export type QueryToppingsCountArgs = {
  where?: ToppingWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};


export type QueryValidatePasswordResetTokenArgs = {
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type RegisterUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<StringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Topping = {
  __typename: 'Topping';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Maybe<Scalars['String']['output']>;
  options: Maybe<Array<ToppingOption>>;
  optionsCount: Maybe<Scalars['Int']['output']>;
  products: Maybe<Array<Product>>;
  productsCount: Maybe<Scalars['Int']['output']>;
  slug: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type ToppingOptionsArgs = {
  cursor?: InputMaybe<ToppingOptionWhereUniqueInput>;
  orderBy?: Array<ToppingOptionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ToppingOptionWhereInput;
};


export type ToppingOptionsCountArgs = {
  where?: ToppingOptionWhereInput;
};


export type ToppingProductsArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>;
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductWhereInput;
};


export type ToppingProductsCountArgs = {
  where?: ProductWhereInput;
};

export type ToppingCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<ToppingOptionRelateToManyForCreateInput>;
  products?: InputMaybe<ProductRelateToManyForCreateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ToppingOption = {
  __typename: 'ToppingOption';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  extraPrice: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  pieces: Maybe<Scalars['Int']['output']>;
  topping: Maybe<Topping>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  weight: Maybe<Scalars['Decimal']['output']>;
};

export type ToppingOptionCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  extraPrice?: InputMaybe<Scalars['Int']['input']>;
  pieces?: InputMaybe<Scalars['Int']['input']>;
  topping?: InputMaybe<ToppingRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  weight?: InputMaybe<Scalars['Decimal']['input']>;
};

export type ToppingOptionManyRelationFilter = {
  every?: InputMaybe<ToppingOptionWhereInput>;
  none?: InputMaybe<ToppingOptionWhereInput>;
  some?: InputMaybe<ToppingOptionWhereInput>;
};

export type ToppingOptionOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  extraPrice?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  pieces?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  weight?: InputMaybe<OrderDirection>;
};

export type ToppingOptionRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ToppingOptionWhereUniqueInput>>;
  create?: InputMaybe<Array<ToppingOptionCreateInput>>;
};

export type ToppingOptionRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ToppingOptionWhereUniqueInput>>;
  create?: InputMaybe<Array<ToppingOptionCreateInput>>;
  disconnect?: InputMaybe<Array<ToppingOptionWhereUniqueInput>>;
  set?: InputMaybe<Array<ToppingOptionWhereUniqueInput>>;
};

export type ToppingOptionRelateToOneForCreateInput = {
  connect?: InputMaybe<ToppingOptionWhereUniqueInput>;
  create?: InputMaybe<ToppingOptionCreateInput>;
};

export type ToppingOptionRelateToOneForUpdateInput = {
  connect?: InputMaybe<ToppingOptionWhereUniqueInput>;
  create?: InputMaybe<ToppingOptionCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ToppingOptionUpdateArgs = {
  data: ToppingOptionUpdateInput;
  where: ToppingOptionWhereUniqueInput;
};

export type ToppingOptionUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  extraPrice?: InputMaybe<Scalars['Int']['input']>;
  pieces?: InputMaybe<Scalars['Int']['input']>;
  topping?: InputMaybe<ToppingRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  weight?: InputMaybe<Scalars['Decimal']['input']>;
};

export type ToppingOptionWhereInput = {
  AND?: InputMaybe<Array<ToppingOptionWhereInput>>;
  NOT?: InputMaybe<Array<ToppingOptionWhereInput>>;
  OR?: InputMaybe<Array<ToppingOptionWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  extraPrice?: InputMaybe<IntFilter>;
  id?: InputMaybe<IdFilter>;
  pieces?: InputMaybe<IntNullableFilter>;
  topping?: InputMaybe<ToppingWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  weight?: InputMaybe<DecimalNullableFilter>;
};

export type ToppingOptionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ToppingOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type ToppingRelateToOneForCreateInput = {
  connect?: InputMaybe<ToppingWhereUniqueInput>;
  create?: InputMaybe<ToppingCreateInput>;
};

export type ToppingRelateToOneForUpdateInput = {
  connect?: InputMaybe<ToppingWhereUniqueInput>;
  create?: InputMaybe<ToppingCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ToppingUpdateArgs = {
  data: ToppingUpdateInput;
  where: ToppingWhereUniqueInput;
};

export type ToppingUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<ToppingOptionRelateToManyForUpdateInput>;
  products?: InputMaybe<ProductRelateToManyForUpdateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ToppingWhereInput = {
  AND?: InputMaybe<Array<ToppingWhereInput>>;
  NOT?: InputMaybe<Array<ToppingWhereInput>>;
  OR?: InputMaybe<Array<ToppingWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  options?: InputMaybe<ToppingOptionManyRelationFilter>;
  products?: InputMaybe<ProductManyRelationFilter>;
  slug?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type ToppingWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename: 'User';
  cart: Maybe<Cart>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  delivaryAddress: Maybe<DelivaryAddress>;
  email: Maybe<Scalars['String']['output']>;
  firstOrderDiscountEligible: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  isUserVerified: Maybe<Scalars['Boolean']['output']>;
  lastLogin: Maybe<Scalars['DateTime']['output']>;
  name: Maybe<Scalars['String']['output']>;
  orderBeneficiaries: Maybe<Array<OrderReceiver>>;
  orderBeneficiariesCount: Maybe<Scalars['Int']['output']>;
  orders: Maybe<Array<Order>>;
  ordersCount: Maybe<Scalars['Int']['output']>;
  password: Maybe<PasswordState>;
  passwordResetIssuedAt: Maybe<Scalars['DateTime']['output']>;
  passwordResetRedeemedAt: Maybe<Scalars['DateTime']['output']>;
  passwordResetToken: Maybe<Scalars['String']['output']>;
  payments: Maybe<Array<Payment>>;
  paymentsCount: Maybe<Scalars['Int']['output']>;
  phoneNumber: Maybe<Scalars['String']['output']>;
  role: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userVerificationToken: Maybe<Scalars['String']['output']>;
  userVerificationTokenIssuedAt: Maybe<Scalars['DateTime']['output']>;
  userVerificationTokenRedeemedAt: Maybe<Scalars['DateTime']['output']>;
};


export type UserOrderBeneficiariesArgs = {
  cursor?: InputMaybe<OrderReceiverWhereUniqueInput>;
  orderBy?: Array<OrderReceiverOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderReceiverWhereInput;
};


export type UserOrderBeneficiariesCountArgs = {
  where?: OrderReceiverWhereInput;
};


export type UserOrdersArgs = {
  cursor?: InputMaybe<OrderWhereUniqueInput>;
  orderBy?: Array<OrderOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderWhereInput;
};


export type UserOrdersCountArgs = {
  where?: OrderWhereInput;
};


export type UserPaymentsArgs = {
  cursor?: InputMaybe<PaymentWhereUniqueInput>;
  orderBy?: Array<PaymentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PaymentWhereInput;
};


export type UserPaymentsCountArgs = {
  where?: PaymentWhereInput;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String']['output'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String']['output'];
};

export type UserCreateInput = {
  cart?: InputMaybe<CartRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  delivaryAddress?: InputMaybe<DelivaryAddressRelateToOneForCreateInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstOrderDiscountEligible?: InputMaybe<Scalars['Boolean']['input']>;
  isUserVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastLogin?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orderBeneficiaries?: InputMaybe<OrderReceiverRelateToManyForCreateInput>;
  orders?: InputMaybe<OrderRelateToManyForCreateInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  passwordResetIssuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  passwordResetRedeemedAt?: InputMaybe<Scalars['DateTime']['input']>;
  passwordResetToken?: InputMaybe<Scalars['String']['input']>;
  payments?: InputMaybe<PaymentRelateToManyForCreateInput>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userVerificationToken?: InputMaybe<Scalars['String']['input']>;
  userVerificationTokenIssuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userVerificationTokenRedeemedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  firstOrderDiscountEligible?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isUserVerified?: InputMaybe<OrderDirection>;
  lastLogin?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  passwordResetIssuedAt?: InputMaybe<OrderDirection>;
  passwordResetRedeemedAt?: InputMaybe<OrderDirection>;
  passwordResetToken?: InputMaybe<OrderDirection>;
  phoneNumber?: InputMaybe<OrderDirection>;
  role?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  userVerificationToken?: InputMaybe<OrderDirection>;
  userVerificationTokenIssuedAt?: InputMaybe<OrderDirection>;
  userVerificationTokenRedeemedAt?: InputMaybe<OrderDirection>;
};

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  cart?: InputMaybe<CartRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  delivaryAddress?: InputMaybe<DelivaryAddressRelateToOneForUpdateInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstOrderDiscountEligible?: InputMaybe<Scalars['Boolean']['input']>;
  isUserVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastLogin?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orderBeneficiaries?: InputMaybe<OrderReceiverRelateToManyForUpdateInput>;
  orders?: InputMaybe<OrderRelateToManyForUpdateInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  passwordResetIssuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  passwordResetRedeemedAt?: InputMaybe<Scalars['DateTime']['input']>;
  passwordResetToken?: InputMaybe<Scalars['String']['input']>;
  payments?: InputMaybe<PaymentRelateToManyForUpdateInput>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userVerificationToken?: InputMaybe<Scalars['String']['input']>;
  userVerificationTokenIssuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userVerificationTokenRedeemedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  cart?: InputMaybe<CartWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  delivaryAddress?: InputMaybe<DelivaryAddressWhereInput>;
  email?: InputMaybe<StringFilter>;
  firstOrderDiscountEligible?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<IdFilter>;
  isUserVerified?: InputMaybe<BooleanFilter>;
  lastLogin?: InputMaybe<DateTimeNullableFilter>;
  name?: InputMaybe<StringFilter>;
  orderBeneficiaries?: InputMaybe<OrderReceiverManyRelationFilter>;
  orders?: InputMaybe<OrderManyRelationFilter>;
  passwordResetIssuedAt?: InputMaybe<DateTimeNullableFilter>;
  passwordResetRedeemedAt?: InputMaybe<DateTimeNullableFilter>;
  passwordResetToken?: InputMaybe<StringNullableFilter>;
  payments?: InputMaybe<PaymentManyRelationFilter>;
  phoneNumber?: InputMaybe<StringFilter>;
  role?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userVerificationToken?: InputMaybe<StringNullableFilter>;
  userVerificationTokenIssuedAt?: InputMaybe<DateTimeNullableFilter>;
  userVerificationTokenRedeemedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type UserWhereUniqueInput = {
  cart?: InputMaybe<CartWhereUniqueInput>;
  delivaryAddress?: InputMaybe<DelivaryAddressWhereUniqueInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type VerifyUserResponse = {
  __typename: 'VerifyUserResponse';
  message: Maybe<Scalars['String']['output']>;
  status: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
  data: UserUpdateInput;
}>;


export type UpdateUserMutation = { updateUser: { __typename: 'User', id: string, name: string | null, email: string | null, phoneNumber: string | null, isUserVerified: boolean | null, delivaryAddress: { __typename: 'DelivaryAddress', id: string, address: string | null } | null, orders: Array<{ __typename: 'Order', id: string, createdAt: unknown | null, orderNumber: string | null, totalAmount: number | null, status: string | null, orderItems: Array<{ __typename: 'OrderItem', id: string, quantity: number | null, product: { __typename: 'Product', id: string, name: string | null } | null }> | null }> | null } | null };

export type ResendUserVerificationTokenMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResendUserVerificationTokenMutation = { resendUserVerificationToken: string };

export type CreateDelivaryAddressMutationVariables = Exact<{
  data: DelivaryAddressCreateInput;
}>;


export type CreateDelivaryAddressMutation = { createDelivaryAddress: { __typename: 'DelivaryAddress', id: string } | null };

export type UpdateDelivaryAddressMutationVariables = Exact<{
  where: DelivaryAddressWhereUniqueInput;
  data: DelivaryAddressUpdateInput;
}>;


export type UpdateDelivaryAddressMutation = { updateDelivaryAddress: { __typename: 'DelivaryAddress', id: string } | null };

export type CheckOutMutationVariables = Exact<{
  deliveryAddressId?: InputMaybe<Scalars['String']['input']>;
  shippingCost: Scalars['Int']['input'];
  paymentMethod: Scalars['String']['input'];
  customerNote?: InputMaybe<Scalars['String']['input']>;
  deliveryOption: Scalars['String']['input'];
  orderReceiver?: InputMaybe<OrderReceiverInput>;
  deliveryDate: Scalars['DateTime']['input'];
}>;


export type CheckOutMutation = { checkOut: { __typename: 'Payment', id: string, redirectUrl: string | null, confirmationUrl: string | null } };

export type RequestCallMutationVariables = Exact<{
  phoneNumber: Scalars['String']['input'];
}>;


export type RequestCallMutation = { requestCall: string };

export type OrderIntentQueryVariables = Exact<{
  where: OrderIntentWhereUniqueInput;
}>;


export type OrderIntentQuery = { orderIntent: { __typename: 'OrderIntent', id: string, paymentStatus: string | null, order: { __typename: 'Order', id: string, orderNumber: string | null } | null } | null };

export type SendPasswordResetTokenMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendPasswordResetTokenMutation = { sendPasswordResetToken: string };

export type ValidatePasswordResetTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type ValidatePasswordResetTokenQuery = { validatePasswordResetToken: boolean };

export type UpdatePasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type UpdatePasswordMutation = { updatePassword: { __typename: 'User', id: string } };

export type QueryAuthorizedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryAuthorizedUserQuery = { queryAuthorizedUser: { __typename: 'User', id: string, name: string | null, email: string | null, phoneNumber: string | null, isUserVerified: boolean | null, delivaryAddress: { __typename: 'DelivaryAddress', id: string, address: string | null } | null, orders: Array<{ __typename: 'Order', id: string, createdAt: unknown | null, orderNumber: string | null, totalAmount: number | null, status: string | null, orderItems: Array<{ __typename: 'OrderItem', id: string, quantity: number | null, product: { __typename: 'Product', id: string, name: string | null } | null }> | null }> | null } | null };

export type AddToCartMutationVariables = Exact<{
  productId: Scalars['String']['input'];
  variantId: Scalars['String']['input'];
  customizations?: InputMaybe<Array<CustomizationInput> | CustomizationInput>;
  compositionOptions?: InputMaybe<Array<CompositionOptionInput> | CompositionOptionInput>;
  toppingOptionId?: InputMaybe<Scalars['String']['input']>;
  cartItemsOrderBy: Array<CartItemOrderByInput> | CartItemOrderByInput;
  orderImagesBy: Array<ProductImageOrderByInput> | ProductImageOrderByInput;
}>;


export type AddToCartMutation = { addToCart: { __typename: 'Cart', id: string, subTotal: number | null, cartItems: Array<{ __typename: 'CartItem', id: string, subTotal: number | null, quantity: number | null, customizations: unknown | null, compositions: unknown | null, variant: { __typename: 'ProductVariant', id: string, weight: unknown | null, pieces: number | null, size: number | null } | null, toppingOption: { __typename: 'ToppingOption', id: string, weight: unknown | null, extraPrice: number | null } | null, product: { __typename: 'Product', id: string, name: string | null, variantType: string | null, preparationDays: number | null, images: Array<{ __typename: 'ProductImage', id: string, altText: string | null, image: { __typename: 'ImageFieldOutput', id: string, url: string } | null }> | null } | null }> | null } };

export type CartFragmentFragment = { __typename: 'Cart', id: string, subTotal: number | null, cartItems: Array<{ __typename: 'CartItem', id: string, subTotal: number | null, quantity: number | null, customizations: unknown | null, compositions: unknown | null, variant: { __typename: 'ProductVariant', id: string, weight: unknown | null, pieces: number | null, size: number | null } | null, toppingOption: { __typename: 'ToppingOption', id: string, weight: unknown | null, extraPrice: number | null } | null, product: { __typename: 'Product', id: string, name: string | null, variantType: string | null, preparationDays: number | null, images: Array<{ __typename: 'ProductImage', id: string, altText: string | null, image: { __typename: 'ImageFieldOutput', id: string, url: string } | null }> | null } | null }> | null };

export type QueryCartQueryVariables = Exact<{
  cartItemsOrderBy: Array<CartItemOrderByInput> | CartItemOrderByInput;
  orderImagesBy: Array<ProductImageOrderByInput> | ProductImageOrderByInput;
}>;


export type QueryCartQuery = { queryCart: { __typename: 'Cart', id: string, subTotal: number | null, cartItems: Array<{ __typename: 'CartItem', id: string, subTotal: number | null, quantity: number | null, customizations: unknown | null, compositions: unknown | null, variant: { __typename: 'ProductVariant', id: string, weight: unknown | null, pieces: number | null, size: number | null } | null, toppingOption: { __typename: 'ToppingOption', id: string, weight: unknown | null, extraPrice: number | null } | null, product: { __typename: 'Product', id: string, name: string | null, variantType: string | null, preparationDays: number | null, images: Array<{ __typename: 'ProductImage', id: string, altText: string | null, image: { __typename: 'ImageFieldOutput', id: string, url: string } | null }> | null } | null }> | null } | null };

export type IncreaseCartItemMutationVariables = Exact<{
  cartItemId: Scalars['String']['input'];
  cartItemsOrderBy: Array<CartItemOrderByInput> | CartItemOrderByInput;
  orderImagesBy: Array<ProductImageOrderByInput> | ProductImageOrderByInput;
}>;


export type IncreaseCartItemMutation = { increaseCartItem: { __typename: 'Cart', id: string, subTotal: number | null, cartItems: Array<{ __typename: 'CartItem', id: string, subTotal: number | null, quantity: number | null, customizations: unknown | null, compositions: unknown | null, variant: { __typename: 'ProductVariant', id: string, weight: unknown | null, pieces: number | null, size: number | null } | null, toppingOption: { __typename: 'ToppingOption', id: string, weight: unknown | null, extraPrice: number | null } | null, product: { __typename: 'Product', id: string, name: string | null, variantType: string | null, preparationDays: number | null, images: Array<{ __typename: 'ProductImage', id: string, altText: string | null, image: { __typename: 'ImageFieldOutput', id: string, url: string } | null }> | null } | null }> | null } };

export type DecreaseCartItemMutationVariables = Exact<{
  cartItemId: Scalars['String']['input'];
  cartItemsOrderBy: Array<CartItemOrderByInput> | CartItemOrderByInput;
  orderImagesBy: Array<ProductImageOrderByInput> | ProductImageOrderByInput;
}>;


export type DecreaseCartItemMutation = { decreaseCartItem: { __typename: 'Cart', id: string, subTotal: number | null, cartItems: Array<{ __typename: 'CartItem', id: string, subTotal: number | null, quantity: number | null, customizations: unknown | null, compositions: unknown | null, variant: { __typename: 'ProductVariant', id: string, weight: unknown | null, pieces: number | null, size: number | null } | null, toppingOption: { __typename: 'ToppingOption', id: string, weight: unknown | null, extraPrice: number | null } | null, product: { __typename: 'Product', id: string, name: string | null, variantType: string | null, preparationDays: number | null, images: Array<{ __typename: 'ProductImage', id: string, altText: string | null, image: { __typename: 'ImageFieldOutput', id: string, url: string } | null }> | null } | null }> | null } | null };

export type RemoveFromCartMutationVariables = Exact<{
  cartItemId: Scalars['String']['input'];
  cartItemsOrderBy: Array<CartItemOrderByInput> | CartItemOrderByInput;
  orderImagesBy: Array<ProductImageOrderByInput> | ProductImageOrderByInput;
}>;


export type RemoveFromCartMutation = { removeFromCart: { __typename: 'Cart', id: string, subTotal: number | null, cartItems: Array<{ __typename: 'CartItem', id: string, subTotal: number | null, quantity: number | null, customizations: unknown | null, compositions: unknown | null, variant: { __typename: 'ProductVariant', id: string, weight: unknown | null, pieces: number | null, size: number | null } | null, toppingOption: { __typename: 'ToppingOption', id: string, weight: unknown | null, extraPrice: number | null } | null, product: { __typename: 'Product', id: string, name: string | null, variantType: string | null, preparationDays: number | null, images: Array<{ __typename: 'ProductImage', id: string, altText: string | null, image: { __typename: 'ImageFieldOutput', id: string, url: string } | null }> | null } | null }> | null } | null };

export type ConnectCartToUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  cartItemsOrderBy: Array<CartItemOrderByInput> | CartItemOrderByInput;
  orderImagesBy: Array<ProductImageOrderByInput> | ProductImageOrderByInput;
}>;


export type ConnectCartToUserMutation = { connectCartToUser: { __typename: 'Cart', id: string, subTotal: number | null, cartItems: Array<{ __typename: 'CartItem', id: string, subTotal: number | null, quantity: number | null, customizations: unknown | null, compositions: unknown | null, variant: { __typename: 'ProductVariant', id: string, weight: unknown | null, pieces: number | null, size: number | null } | null, toppingOption: { __typename: 'ToppingOption', id: string, weight: unknown | null, extraPrice: number | null } | null, product: { __typename: 'Product', id: string, name: string | null, variantType: string | null, preparationDays: number | null, images: Array<{ __typename: 'ProductImage', id: string, altText: string | null, image: { __typename: 'ImageFieldOutput', id: string, url: string } | null }> | null } | null }> | null } | null };

export type CollectionProductsQueryVariables = Exact<{
  where: ProductWhereInput;
  takeFillings?: InputMaybe<Scalars['Int']['input']>;
  takeVariants?: InputMaybe<Scalars['Int']['input']>;
  orderVariantsBy: Array<ProductVariantOrderByInput> | ProductVariantOrderByInput;
  imagesOrderBy: Array<ProductImageOrderByInput> | ProductImageOrderByInput;
}>;


export type CollectionProductsQuery = { products: Array<{ __typename: 'Product', id: string, name: string | null, slug: string | null, badge: string | null, baseDescription: string | null, variantType: string | null, fillings: Array<{ __typename: 'ProductFilling', id: string, variants: Array<{ __typename: 'ProductVariant', id: string, weight: unknown | null, pieces: number | null, size: number | null, price: number | null }> | null }> | null, images: Array<{ __typename: 'ProductImage', id: string, isMain: boolean | null, image: { __typename: 'ImageFieldOutput', url: string } | null }> | null }> | null };

export type GetCategoriesQueryVariables = Exact<{
  where: CategoryWhereInput;
}>;


export type GetCategoriesQuery = { categories: Array<{ __typename: 'Category', id: string, name: string | null, slug: string | null, parent: { __typename: 'Category', id: string, slug: string | null } | null }> | null };

export type ProductHomeBannersQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductHomeBannersQuery = { productHomeBanners: Array<{ __typename: 'ProductHomeBanner', id: string, bannerText: string | null, product: { __typename: 'Product', id: string, slug: string | null, name: string | null, images: Array<{ __typename: 'ProductImage', id: string, image: { __typename: 'ImageFieldOutput', id: string, url: string } | null }> | null } | null }> | null };

export type FeaturedProductsQueryVariables = Exact<{
  takeFeaturedProducts?: InputMaybe<Scalars['Int']['input']>;
  takeFillings?: InputMaybe<Scalars['Int']['input']>;
  takeVariants?: InputMaybe<Scalars['Int']['input']>;
  variantsOrderBy: Array<ProductVariantOrderByInput> | ProductVariantOrderByInput;
  imagesOrderBy: Array<ProductImageOrderByInput> | ProductImageOrderByInput;
}>;


export type FeaturedProductsQuery = { featuredProducts: Array<{ __typename: 'FeaturedProduct', id: string, products: Array<{ __typename: 'Product', id: string, name: string | null, slug: string | null, badge: string | null, baseDescription: string | null, variantType: string | null, fillings: Array<{ __typename: 'ProductFilling', id: string, variants: Array<{ __typename: 'ProductVariant', id: string, weight: unknown | null, pieces: number | null, size: number | null, price: number | null }> | null }> | null, images: Array<{ __typename: 'ProductImage', id: string, isMain: boolean | null, image: { __typename: 'ImageFieldOutput', url: string } | null }> | null }> | null }> | null };

export type ProductQueryVariables = Exact<{
  where: ProductWhereUniqueInput;
  orderToppingOptionBy: Array<ToppingOptionOrderByInput> | ToppingOptionOrderByInput;
}>;


export type ProductQuery = { product: { __typename: 'Product', id: string, name: string | null, baseDescription: string | null, type: string | null, variantType: string | null, isAvailable: boolean | null, fillingsCount: number | null, customizations: Array<{ __typename: 'CustomizationOption', id: string, name: string | null, customValues: Array<{ __typename: 'CustomizationOptionValue', id: string, value: string | null, extraPrice: number | null }> | null }> | null, topping: { __typename: 'Topping', id: string, name: string | null, options: Array<{ __typename: 'ToppingOption', id: string, pieces: number | null, weight: unknown | null, extraPrice: number | null }> | null } | null } | null };

export type ProductFillingsQueryVariables = Exact<{
  where: ProductFillingWhereInput;
  orderVariantsBy: Array<ProductVariantOrderByInput> | ProductVariantOrderByInput;
}>;


export type ProductFillingsQuery = { productFillings: Array<{ __typename: 'ProductFilling', id: string, name: string | null, hasDetails: boolean | null, description: string | null, calories: unknown | null, fat: unknown | null, ingredients: string | null, protein: unknown | null, carbonhydrate: unknown | null, image_icon: { __typename: 'ImageFieldOutput', id: string, url: string } | null, variants: Array<{ __typename: 'ProductVariant', id: string, weight: unknown | null, pieces: number | null, size: number | null, serving: number | null, price: number | null }> | null }> | null };

export type MixBoxProductQueryVariables = Exact<{
  where: MixBoxProductWhereUniqueInput;
}>;


export type MixBoxProductQuery = { mixBoxProduct: { __typename: 'MixBoxProduct', id: string, compositions: Array<{ __typename: 'Product', id: string, name: string | null, slug: string | null, images: Array<{ __typename: 'ProductImage', id: string, image: { __typename: 'ImageFieldOutput', id: string, url: string } | null }> | null }> | null } | null };

export type ProductImagesQueryVariables = Exact<{
  where: ProductImageWhereInput;
  orderImageBy: Array<ProductImageOrderByInput> | ProductImageOrderByInput;
}>;


export type ProductImagesQuery = { productImages: Array<{ __typename: 'ProductImage', id: string, image: { __typename: 'ImageFieldOutput', id: string, url: string } | null }> | null };

export type ProductVideoQueryVariables = Exact<{
  where: ProductVideoWhereUniqueInput;
}>;


export type ProductVideoQuery = { productVideo: { __typename: 'ProductVideo', id: string, video: { __typename: 'FileFieldOutput', url: string } | null } | null };

export type UploadImageCustomizationMutationVariables = Exact<{
  files: Array<Scalars['Upload']['input']> | Scalars['Upload']['input'];
}>;


export type UploadImageCustomizationMutation = { uploadImageCustomization: Array<{ __typename: 'CustomizeImage', id: string, altText: string | null }> };

export type QuerySimilarProductsQueryVariables = Exact<{
  productSlug: Scalars['String']['input'];
  takeFillings?: InputMaybe<Scalars['Int']['input']>;
  takeVariants?: InputMaybe<Scalars['Int']['input']>;
  orderVariantsBy: Array<ProductVariantOrderByInput> | ProductVariantOrderByInput;
  imagesOrderBy: Array<ProductImageOrderByInput> | ProductImageOrderByInput;
}>;


export type QuerySimilarProductsQuery = { querySimilarProducts: Array<{ __typename: 'Product', id: string, name: string | null, slug: string | null, badge: string | null, baseDescription: string | null, fillings: Array<{ __typename: 'ProductFilling', id: string, variants: Array<{ __typename: 'ProductVariant', id: string, weight: unknown | null, pieces: number | null, price: number | null }> | null }> | null, images: Array<{ __typename: 'ProductImage', id: string, isMain: boolean | null, image: { __typename: 'ImageFieldOutput', url: string } | null }> | null }> };

export type EndSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type EndSessionMutation = { endSession: boolean };

export type AuthorizedUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AuthorizedUserMutation = { authorizedUser: { __typename: 'User', id: string, name: string | null, email: string | null, phoneNumber: string | null, isUserVerified: boolean | null, delivaryAddress: { __typename: 'DelivaryAddress', id: string, address: string | null } | null, orders: Array<{ __typename: 'Order', id: string, createdAt: unknown | null, orderNumber: string | null, totalAmount: number | null, status: string | null, orderItems: Array<{ __typename: 'OrderItem', id: string, quantity: number | null, product: { __typename: 'Product', id: string, name: string | null } | null }> | null }> | null } };

export type RegisterUserMutationVariables = Exact<{
  registerData: RegisterUserInput;
}>;


export type RegisterUserMutation = { registerUser: { __typename: 'User', id: string, name: string | null, email: string | null, phoneNumber: string | null, isUserVerified: boolean | null, delivaryAddress: { __typename: 'DelivaryAddress', id: string, address: string | null } | null, orders: Array<{ __typename: 'Order', id: string, createdAt: unknown | null, orderNumber: string | null, totalAmount: number | null, status: string | null, orderItems: Array<{ __typename: 'OrderItem', id: string, quantity: number | null, product: { __typename: 'Product', id: string, name: string | null } | null }> | null }> | null } };

export type IsEmailInUseQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type IsEmailInUseQuery = { isEmailInUse: boolean };

export type IsPhoneNumberInUseQueryVariables = Exact<{
  phoneNumber: Scalars['String']['input'];
}>;


export type IsPhoneNumberInUseQuery = { isPhoneNumberInUse: boolean };

export type RedeemUserVerificationTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type RedeemUserVerificationTokenMutation = { redeemUserVerificationToken: { __typename: 'VerifyUserResponse', status: boolean | null, message: string | null } };

export type ProductMetaQueryVariables = Exact<{
  where: ProductWhereUniqueInput;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductMetaQuery = { product: { __typename: 'Product', id: string, name: string | null, baseDescription: string | null, images: Array<{ __typename: 'ProductImage', id: string, image: { __typename: 'ImageFieldOutput', id: string, url: string } | null }> | null } | null };

export type IsAuthorizedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type IsAuthorizedUserQuery = { queryAuthorizedUser: { __typename: 'User', id: string } | null };

export type UserFragmentFragment = { __typename: 'User', id: string, name: string | null, email: string | null, phoneNumber: string | null, isUserVerified: boolean | null, delivaryAddress: { __typename: 'DelivaryAddress', id: string, address: string | null } | null, orders: Array<{ __typename: 'Order', id: string, createdAt: unknown | null, orderNumber: string | null, totalAmount: number | null, status: string | null, orderItems: Array<{ __typename: 'OrderItem', id: string, quantity: number | null, product: { __typename: 'Product', id: string, name: string | null } | null }> | null }> | null };
