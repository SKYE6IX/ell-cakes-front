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

export type Attribute = {
  __typename: 'Attribute';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Maybe<Scalars['String']['output']>;
  productAttributes: Maybe<Array<ProductAttribute>>;
  productAttributesCount: Maybe<Scalars['Int']['output']>;
  productFilling: Maybe<ProductFilling>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type AttributeProductAttributesArgs = {
  cursor?: InputMaybe<ProductAttributeWhereUniqueInput>;
  orderBy?: Array<ProductAttributeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductAttributeWhereInput;
};


export type AttributeProductAttributesCountArgs = {
  where?: ProductAttributeWhereInput;
};

export type AttributeCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productAttributes?: InputMaybe<ProductAttributeRelateToManyForCreateInput>;
  productFilling?: InputMaybe<ProductFillingRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AttributeOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type AttributeRelateToOneForCreateInput = {
  connect?: InputMaybe<AttributeWhereUniqueInput>;
  create?: InputMaybe<AttributeCreateInput>;
};

export type AttributeRelateToOneForUpdateInput = {
  connect?: InputMaybe<AttributeWhereUniqueInput>;
  create?: InputMaybe<AttributeCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AttributeUpdateArgs = {
  data: AttributeUpdateInput;
  where: AttributeWhereUniqueInput;
};

export type AttributeUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  productAttributes?: InputMaybe<ProductAttributeRelateToManyForUpdateInput>;
  productFilling?: InputMaybe<ProductFillingRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AttributeWhereInput = {
  AND?: InputMaybe<Array<AttributeWhereInput>>;
  NOT?: InputMaybe<Array<AttributeWhereInput>>;
  OR?: InputMaybe<Array<AttributeWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  productAttributes?: InputMaybe<ProductAttributeManyRelationFilter>;
  productFilling?: InputMaybe<ProductFillingWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type AttributeWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  productFilling?: InputMaybe<ProductFillingWhereUniqueInput>;
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
  subTotal?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type CartItem = {
  __typename: 'CartItem';
  cart: Maybe<Cart>;
  compositionSnapShot: Maybe<Scalars['JSON']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  customizationsSnapShot: Maybe<Scalars['JSON']['output']>;
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
  compositionSnapShot?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customizationsSnapShot?: InputMaybe<Scalars['JSON']['input']>;
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
  compositionSnapShot?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customizationsSnapShot?: InputMaybe<Scalars['JSON']['input']>;
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
  subTotal?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type CartWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<UserWhereUniqueInput>;
};

export type Category = {
  __typename: 'Category';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
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
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<CategoryRelateToOneForCreateInput>;
  products?: InputMaybe<ProductRelateToManyForCreateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
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
  productCustomization: Maybe<ProductCustomization>;
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

export type CustomizationOptionCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customValues?: InputMaybe<CustomizationOptionValueRelateToManyForCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  productCustomization?: InputMaybe<ProductCustomizationRelateToOneForCreateInput>;
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
  productCustomization?: InputMaybe<ProductCustomizationRelateToOneForUpdateInput>;
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
  productCustomization?: InputMaybe<ProductCustomizationWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type CustomizationOptionWhereUniqueInput = {
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
  apartmentNumber: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  floor: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  intercomCode: Maybe<Scalars['String']['output']>;
  isDefault: Maybe<Scalars['Boolean']['output']>;
  orders: Maybe<Array<Order>>;
  ordersCount: Maybe<Scalars['Int']['output']>;
  street: Maybe<Scalars['String']['output']>;
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
  apartmentNumber?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  floor?: InputMaybe<Scalars['String']['input']>;
  intercomCode?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  orders?: InputMaybe<OrderRelateToManyForCreateInput>;
  street?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type DelivaryAddressManyRelationFilter = {
  every?: InputMaybe<DelivaryAddressWhereInput>;
  none?: InputMaybe<DelivaryAddressWhereInput>;
  some?: InputMaybe<DelivaryAddressWhereInput>;
};

export type DelivaryAddressOrderByInput = {
  apartmentNumber?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  floor?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  intercomCode?: InputMaybe<OrderDirection>;
  isDefault?: InputMaybe<OrderDirection>;
  street?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type DelivaryAddressRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<DelivaryAddressWhereUniqueInput>>;
  create?: InputMaybe<Array<DelivaryAddressCreateInput>>;
};

export type DelivaryAddressRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<DelivaryAddressWhereUniqueInput>>;
  create?: InputMaybe<Array<DelivaryAddressCreateInput>>;
  disconnect?: InputMaybe<Array<DelivaryAddressWhereUniqueInput>>;
  set?: InputMaybe<Array<DelivaryAddressWhereUniqueInput>>;
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
  apartmentNumber?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  floor?: InputMaybe<Scalars['String']['input']>;
  intercomCode?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  orders?: InputMaybe<OrderRelateToManyForUpdateInput>;
  street?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type DelivaryAddressWhereInput = {
  AND?: InputMaybe<Array<DelivaryAddressWhereInput>>;
  NOT?: InputMaybe<Array<DelivaryAddressWhereInput>>;
  OR?: InputMaybe<Array<DelivaryAddressWhereInput>>;
  apartmentNumber?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  floor?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  intercomCode?: InputMaybe<StringFilter>;
  isDefault?: InputMaybe<BooleanFilter>;
  orders?: InputMaybe<OrderManyRelationFilter>;
  street?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type DelivaryAddressWhereUniqueInput = {
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

export type Mutation = {
  __typename: 'Mutation';
  addToCart: Cart;
  authenticateUserWithPassword: Maybe<UserAuthenticationWithPasswordResult>;
  authorizedUserWithCart: User;
  checkOut: Payment;
  createAttribute: Maybe<Attribute>;
  createAttributes: Maybe<Array<Maybe<Attribute>>>;
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
  createDelivaryAddress: Maybe<DelivaryAddress>;
  createDelivaryAddresses: Maybe<Array<Maybe<DelivaryAddress>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createOrder: Maybe<Order>;
  createOrderImage: Maybe<OrderImage>;
  createOrderImages: Maybe<Array<Maybe<OrderImage>>>;
  createOrderItem: Maybe<OrderItem>;
  createOrderItems: Maybe<Array<Maybe<OrderItem>>>;
  createOrders: Maybe<Array<Maybe<Order>>>;
  createPayment: Maybe<Payment>;
  createPayments: Maybe<Array<Maybe<Payment>>>;
  createProduct: Maybe<Product>;
  createProductAttribute: Maybe<ProductAttribute>;
  createProductAttributes: Maybe<Array<Maybe<ProductAttribute>>>;
  createProductCategoryBanner: Maybe<ProductCategoryBanner>;
  createProductCategoryBanners: Maybe<Array<Maybe<ProductCategoryBanner>>>;
  createProductCustomization: Maybe<ProductCustomization>;
  createProductCustomizations: Maybe<Array<Maybe<ProductCustomization>>>;
  createProductFilling: Maybe<ProductFilling>;
  createProductFillings: Maybe<Array<Maybe<ProductFilling>>>;
  createProductHomeBanner: Maybe<ProductHomeBanner>;
  createProductHomeBanners: Maybe<Array<Maybe<ProductHomeBanner>>>;
  createProductImage: Maybe<ProductImage>;
  createProductImages: Maybe<Array<Maybe<ProductImage>>>;
  createProductVariant: Maybe<ProductVariant>;
  createProductVariants: Maybe<Array<Maybe<ProductVariant>>>;
  createProducts: Maybe<Array<Maybe<Product>>>;
  createTopping: Maybe<Topping>;
  createToppingOption: Maybe<ToppingOption>;
  createToppingOptions: Maybe<Array<Maybe<ToppingOption>>>;
  createToppings: Maybe<Array<Maybe<Topping>>>;
  createUser: Maybe<User>;
  createUsers: Maybe<Array<Maybe<User>>>;
  deleteAttribute: Maybe<Attribute>;
  deleteAttributes: Maybe<Array<Maybe<Attribute>>>;
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
  deleteDelivaryAddress: Maybe<DelivaryAddress>;
  deleteDelivaryAddresses: Maybe<Array<Maybe<DelivaryAddress>>>;
  deleteOrder: Maybe<Order>;
  deleteOrderImage: Maybe<OrderImage>;
  deleteOrderImages: Maybe<Array<Maybe<OrderImage>>>;
  deleteOrderItem: Maybe<OrderItem>;
  deleteOrderItems: Maybe<Array<Maybe<OrderItem>>>;
  deleteOrders: Maybe<Array<Maybe<Order>>>;
  deletePayment: Maybe<Payment>;
  deletePayments: Maybe<Array<Maybe<Payment>>>;
  deleteProduct: Maybe<Product>;
  deleteProductAttribute: Maybe<ProductAttribute>;
  deleteProductAttributes: Maybe<Array<Maybe<ProductAttribute>>>;
  deleteProductCategoryBanner: Maybe<ProductCategoryBanner>;
  deleteProductCategoryBanners: Maybe<Array<Maybe<ProductCategoryBanner>>>;
  deleteProductCustomization: Maybe<ProductCustomization>;
  deleteProductCustomizations: Maybe<Array<Maybe<ProductCustomization>>>;
  deleteProductFilling: Maybe<ProductFilling>;
  deleteProductFillings: Maybe<Array<Maybe<ProductFilling>>>;
  deleteProductHomeBanner: Maybe<ProductHomeBanner>;
  deleteProductHomeBanners: Maybe<Array<Maybe<ProductHomeBanner>>>;
  deleteProductImage: Maybe<ProductImage>;
  deleteProductImages: Maybe<Array<Maybe<ProductImage>>>;
  deleteProductVariant: Maybe<ProductVariant>;
  deleteProductVariants: Maybe<Array<Maybe<ProductVariant>>>;
  deleteProducts: Maybe<Array<Maybe<Product>>>;
  deleteTopping: Maybe<Topping>;
  deleteToppingOption: Maybe<ToppingOption>;
  deleteToppingOptions: Maybe<Array<Maybe<ToppingOption>>>;
  deleteToppings: Maybe<Array<Maybe<Topping>>>;
  deleteUser: Maybe<User>;
  deleteUsers: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean']['output'];
  redeemUserPasswordResetToken: Maybe<RedeemUserPasswordResetTokenResult>;
  registerUser: User;
  registerUserWithCart: User;
  removeFromCart: Cart;
  resendVerificationToken: Scalars['String']['output'];
  sendUserPasswordResetLink: Scalars['Boolean']['output'];
  updateAttribute: Maybe<Attribute>;
  updateAttributes: Maybe<Array<Maybe<Attribute>>>;
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
  updateDelivaryAddress: Maybe<DelivaryAddress>;
  updateDelivaryAddresses: Maybe<Array<Maybe<DelivaryAddress>>>;
  updateOrder: Maybe<Order>;
  updateOrderImage: Maybe<OrderImage>;
  updateOrderImages: Maybe<Array<Maybe<OrderImage>>>;
  updateOrderItem: Maybe<OrderItem>;
  updateOrderItems: Maybe<Array<Maybe<OrderItem>>>;
  updateOrders: Maybe<Array<Maybe<Order>>>;
  updatePayment: Maybe<Payment>;
  updatePayments: Maybe<Array<Maybe<Payment>>>;
  updateProduct: Maybe<Product>;
  updateProductAttribute: Maybe<ProductAttribute>;
  updateProductAttributes: Maybe<Array<Maybe<ProductAttribute>>>;
  updateProductCategoryBanner: Maybe<ProductCategoryBanner>;
  updateProductCategoryBanners: Maybe<Array<Maybe<ProductCategoryBanner>>>;
  updateProductCustomization: Maybe<ProductCustomization>;
  updateProductCustomizations: Maybe<Array<Maybe<ProductCustomization>>>;
  updateProductFilling: Maybe<ProductFilling>;
  updateProductFillings: Maybe<Array<Maybe<ProductFilling>>>;
  updateProductHomeBanner: Maybe<ProductHomeBanner>;
  updateProductHomeBanners: Maybe<Array<Maybe<ProductHomeBanner>>>;
  updateProductImage: Maybe<ProductImage>;
  updateProductImages: Maybe<Array<Maybe<ProductImage>>>;
  updateProductVariant: Maybe<ProductVariant>;
  updateProductVariants: Maybe<Array<Maybe<ProductVariant>>>;
  updateProducts: Maybe<Array<Maybe<Product>>>;
  updateTopping: Maybe<Topping>;
  updateToppingOption: Maybe<ToppingOption>;
  updateToppingOptions: Maybe<Array<Maybe<ToppingOption>>>;
  updateToppings: Maybe<Array<Maybe<Topping>>>;
  updateUser: Maybe<User>;
  updateUsers: Maybe<Array<Maybe<User>>>;
  uploadImageCustomization: Array<OrderImage>;
  verifyUserByPhoneNumber: VerifyUserByPhoneNumberResponse;
};


export type MutationAddToCartArgs = {
  cartId?: InputMaybe<Scalars['String']['input']>;
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


export type MutationAuthorizedUserWithCartArgs = {
  cartId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCheckOutArgs = {
  customerNote?: InputMaybe<Scalars['String']['input']>;
  deliveryAddressId: Scalars['String']['input'];
  paymentMethod: Scalars['String']['input'];
  shippingCost: Scalars['Int']['input'];
};


export type MutationCreateAttributeArgs = {
  data: AttributeCreateInput;
};


export type MutationCreateAttributesArgs = {
  data: Array<AttributeCreateInput>;
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


export type MutationCreateDelivaryAddressArgs = {
  data: DelivaryAddressCreateInput;
};


export type MutationCreateDelivaryAddressesArgs = {
  data: Array<DelivaryAddressCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateOrderArgs = {
  data: OrderCreateInput;
};


export type MutationCreateOrderImageArgs = {
  data: OrderImageCreateInput;
};


export type MutationCreateOrderImagesArgs = {
  data: Array<OrderImageCreateInput>;
};


export type MutationCreateOrderItemArgs = {
  data: OrderItemCreateInput;
};


export type MutationCreateOrderItemsArgs = {
  data: Array<OrderItemCreateInput>;
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


export type MutationCreateProductAttributeArgs = {
  data: ProductAttributeCreateInput;
};


export type MutationCreateProductAttributesArgs = {
  data: Array<ProductAttributeCreateInput>;
};


export type MutationCreateProductCategoryBannerArgs = {
  data: ProductCategoryBannerCreateInput;
};


export type MutationCreateProductCategoryBannersArgs = {
  data: Array<ProductCategoryBannerCreateInput>;
};


export type MutationCreateProductCustomizationArgs = {
  data: ProductCustomizationCreateInput;
};


export type MutationCreateProductCustomizationsArgs = {
  data: Array<ProductCustomizationCreateInput>;
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


export type MutationDeleteAttributeArgs = {
  where: AttributeWhereUniqueInput;
};


export type MutationDeleteAttributesArgs = {
  where: Array<AttributeWhereUniqueInput>;
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


export type MutationDeleteDelivaryAddressArgs = {
  where: DelivaryAddressWhereUniqueInput;
};


export type MutationDeleteDelivaryAddressesArgs = {
  where: Array<DelivaryAddressWhereUniqueInput>;
};


export type MutationDeleteOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type MutationDeleteOrderImageArgs = {
  where: OrderImageWhereUniqueInput;
};


export type MutationDeleteOrderImagesArgs = {
  where: Array<OrderImageWhereUniqueInput>;
};


export type MutationDeleteOrderItemArgs = {
  where: OrderItemWhereUniqueInput;
};


export type MutationDeleteOrderItemsArgs = {
  where: Array<OrderItemWhereUniqueInput>;
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


export type MutationDeleteProductAttributeArgs = {
  where: ProductAttributeWhereUniqueInput;
};


export type MutationDeleteProductAttributesArgs = {
  where: Array<ProductAttributeWhereUniqueInput>;
};


export type MutationDeleteProductCategoryBannerArgs = {
  where: ProductCategoryBannerWhereUniqueInput;
};


export type MutationDeleteProductCategoryBannersArgs = {
  where: Array<ProductCategoryBannerWhereUniqueInput>;
};


export type MutationDeleteProductCustomizationArgs = {
  where: ProductCustomizationWhereUniqueInput;
};


export type MutationDeleteProductCustomizationsArgs = {
  where: Array<ProductCustomizationWhereUniqueInput>;
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


export type MutationRedeemUserPasswordResetTokenArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  registerData: RegisterUserInput;
};


export type MutationRegisterUserWithCartArgs = {
  cartId: Scalars['String']['input'];
  registerData: RegisterUserInput;
};


export type MutationRemoveFromCartArgs = {
  cartId: Scalars['String']['input'];
  cartItemId: Scalars['String']['input'];
};


export type MutationResendVerificationTokenArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type MutationSendUserPasswordResetLinkArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateAttributeArgs = {
  data: AttributeUpdateInput;
  where: AttributeWhereUniqueInput;
};


export type MutationUpdateAttributesArgs = {
  data: Array<AttributeUpdateArgs>;
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


export type MutationUpdateDelivaryAddressArgs = {
  data: DelivaryAddressUpdateInput;
  where: DelivaryAddressWhereUniqueInput;
};


export type MutationUpdateDelivaryAddressesArgs = {
  data: Array<DelivaryAddressUpdateArgs>;
};


export type MutationUpdateOrderArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};


export type MutationUpdateOrderImageArgs = {
  data: OrderImageUpdateInput;
  where: OrderImageWhereUniqueInput;
};


export type MutationUpdateOrderImagesArgs = {
  data: Array<OrderImageUpdateArgs>;
};


export type MutationUpdateOrderItemArgs = {
  data: OrderItemUpdateInput;
  where: OrderItemWhereUniqueInput;
};


export type MutationUpdateOrderItemsArgs = {
  data: Array<OrderItemUpdateArgs>;
};


export type MutationUpdateOrdersArgs = {
  data: Array<OrderUpdateArgs>;
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


export type MutationUpdateProductAttributeArgs = {
  data: ProductAttributeUpdateInput;
  where: ProductAttributeWhereUniqueInput;
};


export type MutationUpdateProductAttributesArgs = {
  data: Array<ProductAttributeUpdateArgs>;
};


export type MutationUpdateProductCategoryBannerArgs = {
  data: ProductCategoryBannerUpdateInput;
  where: ProductCategoryBannerWhereUniqueInput;
};


export type MutationUpdateProductCategoryBannersArgs = {
  data: Array<ProductCategoryBannerUpdateArgs>;
};


export type MutationUpdateProductCustomizationArgs = {
  data: ProductCustomizationUpdateInput;
  where: ProductCustomizationWhereUniqueInput;
};


export type MutationUpdateProductCustomizationsArgs = {
  data: Array<ProductCustomizationUpdateArgs>;
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


export type MutationVerifyUserByPhoneNumberArgs = {
  phoneNumber: Scalars['String']['input'];
  token: Scalars['String']['input'];
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
  id: Scalars['ID']['output'];
  note: Maybe<Scalars['String']['output']>;
  orderImages: Maybe<Array<OrderImage>>;
  orderImagesCount: Maybe<Scalars['Int']['output']>;
  orderItems: Maybe<Array<OrderItem>>;
  orderItemsCount: Maybe<Scalars['Int']['output']>;
  orderNumber: Maybe<Scalars['String']['output']>;
  payment: Maybe<Payment>;
  shippingCost: Maybe<Scalars['Int']['output']>;
  status: Maybe<Scalars['String']['output']>;
  subTotalAmount: Maybe<Scalars['Int']['output']>;
  totalAmount: Maybe<Scalars['Int']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  user: Maybe<User>;
};


export type OrderOrderImagesArgs = {
  cursor?: InputMaybe<OrderImageWhereUniqueInput>;
  orderBy?: Array<OrderImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderImageWhereInput;
};


export type OrderOrderImagesCountArgs = {
  where?: OrderImageWhereInput;
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
  note?: InputMaybe<Scalars['String']['input']>;
  orderImages?: InputMaybe<OrderImageRelateToManyForCreateInput>;
  orderItems?: InputMaybe<OrderItemRelateToManyForCreateInput>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
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

export type OrderImage = {
  __typename: 'OrderImage';
  altText: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image: Maybe<ImageFieldOutput>;
  order: Maybe<Order>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type OrderImageCreateInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  order?: InputMaybe<OrderRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OrderImageManyRelationFilter = {
  every?: InputMaybe<OrderImageWhereInput>;
  none?: InputMaybe<OrderImageWhereInput>;
  some?: InputMaybe<OrderImageWhereInput>;
};

export type OrderImageOrderByInput = {
  altText?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type OrderImageRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<OrderImageWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderImageCreateInput>>;
};

export type OrderImageRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<OrderImageWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderImageCreateInput>>;
  disconnect?: InputMaybe<Array<OrderImageWhereUniqueInput>>;
  set?: InputMaybe<Array<OrderImageWhereUniqueInput>>;
};

export type OrderImageUpdateArgs = {
  data: OrderImageUpdateInput;
  where: OrderImageWhereUniqueInput;
};

export type OrderImageUpdateInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  order?: InputMaybe<OrderRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OrderImageWhereInput = {
  AND?: InputMaybe<Array<OrderImageWhereInput>>;
  NOT?: InputMaybe<Array<OrderImageWhereInput>>;
  OR?: InputMaybe<Array<OrderImageWhereInput>>;
  altText?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  order?: InputMaybe<OrderWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type OrderImageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type OrderItem = {
  __typename: 'OrderItem';
  compositionSnapShot: Maybe<Scalars['JSON']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  customizationsSnapShot: Maybe<Scalars['JSON']['output']>;
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
  compositionSnapShot?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customizationsSnapShot?: InputMaybe<Scalars['JSON']['input']>;
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
  compositionSnapShot?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customizationsSnapShot?: InputMaybe<Scalars['JSON']['input']>;
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
  id?: InputMaybe<OrderDirection>;
  note?: InputMaybe<OrderDirection>;
  orderNumber?: InputMaybe<OrderDirection>;
  shippingCost?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  subTotalAmount?: InputMaybe<OrderDirection>;
  totalAmount?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
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
  note?: InputMaybe<Scalars['String']['input']>;
  orderImages?: InputMaybe<OrderImageRelateToManyForUpdateInput>;
  orderItems?: InputMaybe<OrderItemRelateToManyForUpdateInput>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
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
  id?: InputMaybe<IdFilter>;
  note?: InputMaybe<StringFilter>;
  orderImages?: InputMaybe<OrderImageManyRelationFilter>;
  orderItems?: InputMaybe<OrderItemManyRelationFilter>;
  orderNumber?: InputMaybe<StringFilter>;
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
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  payment?: InputMaybe<PaymentWhereUniqueInput>;
};

export type PasswordFilter = {
  isSet: Scalars['Boolean']['input'];
};

export enum PasswordResetRedemptionErrorCode {
  Failure = 'FAILURE',
  TokenExpired = 'TOKEN_EXPIRED',
  TokenRedeemed = 'TOKEN_REDEEMED'
}

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
  paymentId: Maybe<Scalars['String']['output']>;
  status: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  user: Maybe<User>;
};

export type PaymentCreateInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  confirmationUrl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<OrderRelateToOneForCreateInput>;
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  paymentId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
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
  paymentId?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
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
  paymentId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
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
  paymentId?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type PaymentWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  order?: InputMaybe<OrderWhereUniqueInput>;
  paymentId?: InputMaybe<Scalars['String']['input']>;
};

export type Product = {
  __typename: 'Product';
  badge: Maybe<Scalars['String']['output']>;
  baseDescription: Maybe<Scalars['String']['output']>;
  category: Maybe<Category>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  customization: Maybe<ProductCustomization>;
  fillings: Maybe<Array<ProductFilling>>;
  fillingsCount: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  images: Maybe<Array<ProductImage>>;
  imagesCount: Maybe<Scalars['Int']['output']>;
  isAvailable: Maybe<Scalars['Boolean']['output']>;
  isFeatured: Maybe<Scalars['Boolean']['output']>;
  name: Maybe<Scalars['String']['output']>;
  slug: Maybe<Scalars['String']['output']>;
  stockQuantity: Maybe<Scalars['Int']['output']>;
  topping: Maybe<Topping>;
  type: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  variantType: Maybe<Scalars['String']['output']>;
  video: Maybe<FileFieldOutput>;
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

export type ProductAttribute = {
  __typename: 'ProductAttribute';
  attribute: Maybe<Attribute>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  product: Maybe<Product>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  value: Maybe<Scalars['String']['output']>;
};

export type ProductAttributeCreateInput = {
  attribute?: InputMaybe<AttributeRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  product?: InputMaybe<ProductRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ProductAttributeManyRelationFilter = {
  every?: InputMaybe<ProductAttributeWhereInput>;
  none?: InputMaybe<ProductAttributeWhereInput>;
  some?: InputMaybe<ProductAttributeWhereInput>;
};

export type ProductAttributeOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  value?: InputMaybe<OrderDirection>;
};

export type ProductAttributeRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ProductAttributeWhereUniqueInput>>;
  create?: InputMaybe<Array<ProductAttributeCreateInput>>;
};

export type ProductAttributeRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ProductAttributeWhereUniqueInput>>;
  create?: InputMaybe<Array<ProductAttributeCreateInput>>;
  disconnect?: InputMaybe<Array<ProductAttributeWhereUniqueInput>>;
  set?: InputMaybe<Array<ProductAttributeWhereUniqueInput>>;
};

export type ProductAttributeUpdateArgs = {
  data: ProductAttributeUpdateInput;
  where: ProductAttributeWhereUniqueInput;
};

export type ProductAttributeUpdateInput = {
  attribute?: InputMaybe<AttributeRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  product?: InputMaybe<ProductRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ProductAttributeWhereInput = {
  AND?: InputMaybe<Array<ProductAttributeWhereInput>>;
  NOT?: InputMaybe<Array<ProductAttributeWhereInput>>;
  OR?: InputMaybe<Array<ProductAttributeWhereInput>>;
  attribute?: InputMaybe<AttributeWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  product?: InputMaybe<ProductWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  value?: InputMaybe<StringFilter>;
};

export type ProductAttributeWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ProductCategoryBanner = {
  __typename: 'ProductCategoryBanner';
  bannerText: Maybe<Scalars['String']['output']>;
  category: Maybe<Category>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  product: Maybe<Product>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type ProductCategoryBannerCreateInput = {
  bannerText?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<CategoryRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  product?: InputMaybe<ProductRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProductCategoryBannerOrderByInput = {
  bannerText?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type ProductCategoryBannerUpdateArgs = {
  data: ProductCategoryBannerUpdateInput;
  where: ProductCategoryBannerWhereUniqueInput;
};

export type ProductCategoryBannerUpdateInput = {
  bannerText?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<CategoryRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  product?: InputMaybe<ProductRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProductCategoryBannerWhereInput = {
  AND?: InputMaybe<Array<ProductCategoryBannerWhereInput>>;
  NOT?: InputMaybe<Array<ProductCategoryBannerWhereInput>>;
  OR?: InputMaybe<Array<ProductCategoryBannerWhereInput>>;
  bannerText?: InputMaybe<StringFilter>;
  category?: InputMaybe<CategoryWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  product?: InputMaybe<ProductWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type ProductCategoryBannerWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ProductCreateInput = {
  badge?: InputMaybe<Scalars['String']['input']>;
  baseDescription?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<CategoryRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customization?: InputMaybe<ProductCustomizationRelateToOneForCreateInput>;
  fillings?: InputMaybe<ProductFillingRelateToManyForCreateInput>;
  images?: InputMaybe<ProductImageRelateToManyForCreateInput>;
  isAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  stockQuantity?: InputMaybe<Scalars['Int']['input']>;
  topping?: InputMaybe<ToppingRelateToOneForCreateInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  variantType?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<FileFieldInput>;
};

export type ProductCustomization = {
  __typename: 'ProductCustomization';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  customOptions: Maybe<Array<CustomizationOption>>;
  customOptionsCount: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  product: Maybe<Product>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type ProductCustomizationCustomOptionsArgs = {
  cursor?: InputMaybe<CustomizationOptionWhereUniqueInput>;
  orderBy?: Array<CustomizationOptionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CustomizationOptionWhereInput;
};


export type ProductCustomizationCustomOptionsCountArgs = {
  where?: CustomizationOptionWhereInput;
};

export type ProductCustomizationCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customOptions?: InputMaybe<CustomizationOptionRelateToManyForCreateInput>;
  product?: InputMaybe<ProductRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProductCustomizationOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type ProductCustomizationRelateToOneForCreateInput = {
  connect?: InputMaybe<ProductCustomizationWhereUniqueInput>;
  create?: InputMaybe<ProductCustomizationCreateInput>;
};

export type ProductCustomizationRelateToOneForUpdateInput = {
  connect?: InputMaybe<ProductCustomizationWhereUniqueInput>;
  create?: InputMaybe<ProductCustomizationCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProductCustomizationUpdateArgs = {
  data: ProductCustomizationUpdateInput;
  where: ProductCustomizationWhereUniqueInput;
};

export type ProductCustomizationUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customOptions?: InputMaybe<CustomizationOptionRelateToManyForUpdateInput>;
  product?: InputMaybe<ProductRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ProductCustomizationWhereInput = {
  AND?: InputMaybe<Array<ProductCustomizationWhereInput>>;
  NOT?: InputMaybe<Array<ProductCustomizationWhereInput>>;
  OR?: InputMaybe<Array<ProductCustomizationWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  customOptions?: InputMaybe<CustomizationOptionManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  product?: InputMaybe<ProductWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type ProductCustomizationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  product?: InputMaybe<ProductWhereUniqueInput>;
};

export type ProductFilling = {
  __typename: 'ProductFilling';
  attribute: Maybe<Attribute>;
  calories: Maybe<Scalars['Decimal']['output']>;
  carbonhydrate: Maybe<Scalars['Decimal']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  fat: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['ID']['output'];
  image_icon: Maybe<ImageFieldOutput>;
  ingredients: Maybe<Scalars['String']['output']>;
  lifeShelf: Maybe<Scalars['Int']['output']>;
  name: Maybe<Scalars['String']['output']>;
  products: Maybe<Array<Product>>;
  productsCount: Maybe<Scalars['Int']['output']>;
  protein: Maybe<Scalars['Decimal']['output']>;
  slug: Maybe<Scalars['String']['output']>;
  stockQuantity: Maybe<Scalars['Int']['output']>;
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
  attribute?: InputMaybe<AttributeRelateToOneForCreateInput>;
  calories?: InputMaybe<Scalars['Decimal']['input']>;
  carbonhydrate?: InputMaybe<Scalars['Decimal']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  fat?: InputMaybe<Scalars['Decimal']['input']>;
  image_icon?: InputMaybe<ImageFieldInput>;
  ingredients?: InputMaybe<Scalars['String']['input']>;
  lifeShelf?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<ProductRelateToManyForCreateInput>;
  protein?: InputMaybe<Scalars['Decimal']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  stockQuantity?: InputMaybe<Scalars['Int']['input']>;
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
  id?: InputMaybe<OrderDirection>;
  ingredients?: InputMaybe<OrderDirection>;
  lifeShelf?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  protein?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  stockQuantity?: InputMaybe<OrderDirection>;
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
  attribute?: InputMaybe<AttributeRelateToOneForUpdateInput>;
  calories?: InputMaybe<Scalars['Decimal']['input']>;
  carbonhydrate?: InputMaybe<Scalars['Decimal']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  fat?: InputMaybe<Scalars['Decimal']['input']>;
  image_icon?: InputMaybe<ImageFieldInput>;
  ingredients?: InputMaybe<Scalars['String']['input']>;
  lifeShelf?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<ProductRelateToManyForUpdateInput>;
  protein?: InputMaybe<Scalars['Decimal']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  stockQuantity?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  variants?: InputMaybe<ProductVariantRelateToManyForUpdateInput>;
};

export type ProductFillingWhereInput = {
  AND?: InputMaybe<Array<ProductFillingWhereInput>>;
  NOT?: InputMaybe<Array<ProductFillingWhereInput>>;
  OR?: InputMaybe<Array<ProductFillingWhereInput>>;
  attribute?: InputMaybe<AttributeWhereInput>;
  calories?: InputMaybe<DecimalNullableFilter>;
  carbonhydrate?: InputMaybe<DecimalNullableFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringFilter>;
  fat?: InputMaybe<DecimalNullableFilter>;
  id?: InputMaybe<IdFilter>;
  ingredients?: InputMaybe<StringFilter>;
  lifeShelf?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  products?: InputMaybe<ProductManyRelationFilter>;
  protein?: InputMaybe<DecimalNullableFilter>;
  slug?: InputMaybe<StringFilter>;
  stockQuantity?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  variants?: InputMaybe<ProductVariantManyRelationFilter>;
};

export type ProductFillingWhereUniqueInput = {
  attribute?: InputMaybe<AttributeWhereUniqueInput>;
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
  id: Scalars['ID']['output'];
  image: Maybe<ImageFieldOutput>;
  product: Maybe<Product>;
};

export type ProductImageCreateInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<ImageFieldInput>;
  product?: InputMaybe<ProductRelateToOneForCreateInput>;
};

export type ProductImageManyRelationFilter = {
  every?: InputMaybe<ProductImageWhereInput>;
  none?: InputMaybe<ProductImageWhereInput>;
  some?: InputMaybe<ProductImageWhereInput>;
};

export type ProductImageOrderByInput = {
  altText?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
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
  image?: InputMaybe<ImageFieldInput>;
  product?: InputMaybe<ProductRelateToOneForUpdateInput>;
};

export type ProductImageWhereInput = {
  AND?: InputMaybe<Array<ProductImageWhereInput>>;
  NOT?: InputMaybe<Array<ProductImageWhereInput>>;
  OR?: InputMaybe<Array<ProductImageWhereInput>>;
  altText?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  product?: InputMaybe<ProductWhereInput>;
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
  isFeatured?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  stockQuantity?: InputMaybe<OrderDirection>;
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
  category?: InputMaybe<CategoryRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customization?: InputMaybe<ProductCustomizationRelateToOneForUpdateInput>;
  fillings?: InputMaybe<ProductFillingRelateToManyForUpdateInput>;
  images?: InputMaybe<ProductImageRelateToManyForUpdateInput>;
  isAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  stockQuantity?: InputMaybe<Scalars['Int']['input']>;
  topping?: InputMaybe<ToppingRelateToOneForUpdateInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  variantType?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<FileFieldInput>;
};

export type ProductVariant = {
  __typename: 'ProductVariant';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  filling: Maybe<ProductFilling>;
  id: Scalars['ID']['output'];
  isAvailable: Maybe<Scalars['Boolean']['output']>;
  pieces: Maybe<Scalars['Int']['output']>;
  price: Maybe<Scalars['Int']['output']>;
  serving: Maybe<Scalars['Int']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  weight: Maybe<Scalars['Decimal']['output']>;
};

export type ProductVariantCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  filling?: InputMaybe<ProductFillingRelateToOneForCreateInput>;
  isAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  pieces?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  serving?: InputMaybe<Scalars['Int']['input']>;
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
  isAvailable?: InputMaybe<OrderDirection>;
  pieces?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  serving?: InputMaybe<OrderDirection>;
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
  isAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  pieces?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  serving?: InputMaybe<Scalars['Int']['input']>;
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
  isAvailable?: InputMaybe<BooleanFilter>;
  pieces?: InputMaybe<IntNullableFilter>;
  price?: InputMaybe<IntFilter>;
  serving?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  weight?: InputMaybe<DecimalNullableFilter>;
};

export type ProductVariantWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ProductWhereInput = {
  AND?: InputMaybe<Array<ProductWhereInput>>;
  NOT?: InputMaybe<Array<ProductWhereInput>>;
  OR?: InputMaybe<Array<ProductWhereInput>>;
  badge?: InputMaybe<StringNullableFilter>;
  baseDescription?: InputMaybe<StringFilter>;
  category?: InputMaybe<CategoryWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  customization?: InputMaybe<ProductCustomizationWhereInput>;
  fillings?: InputMaybe<ProductFillingManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  images?: InputMaybe<ProductImageManyRelationFilter>;
  isAvailable?: InputMaybe<BooleanFilter>;
  isFeatured?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  stockQuantity?: InputMaybe<IntFilter>;
  topping?: InputMaybe<ToppingWhereInput>;
  type?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  variantType?: InputMaybe<StringFilter>;
};

export type ProductWhereUniqueInput = {
  customization?: InputMaybe<ProductCustomizationWhereUniqueInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  topping?: InputMaybe<ToppingWhereUniqueInput>;
};

export type Query = {
  __typename: 'Query';
  attribute: Maybe<Attribute>;
  attributes: Maybe<Array<Attribute>>;
  attributesCount: Maybe<Scalars['Int']['output']>;
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
  delivaryAddress: Maybe<DelivaryAddress>;
  delivaryAddresses: Maybe<Array<DelivaryAddress>>;
  delivaryAddressesCount: Maybe<Scalars['Int']['output']>;
  keystone: KeystoneMeta;
  order: Maybe<Order>;
  orderImage: Maybe<OrderImage>;
  orderImages: Maybe<Array<OrderImage>>;
  orderImagesCount: Maybe<Scalars['Int']['output']>;
  orderItem: Maybe<OrderItem>;
  orderItems: Maybe<Array<OrderItem>>;
  orderItemsCount: Maybe<Scalars['Int']['output']>;
  orders: Maybe<Array<Order>>;
  ordersCount: Maybe<Scalars['Int']['output']>;
  payment: Maybe<Payment>;
  payments: Maybe<Array<Payment>>;
  paymentsCount: Maybe<Scalars['Int']['output']>;
  product: Maybe<Product>;
  productAttribute: Maybe<ProductAttribute>;
  productAttributes: Maybe<Array<ProductAttribute>>;
  productAttributesCount: Maybe<Scalars['Int']['output']>;
  productCategoryBanner: Maybe<ProductCategoryBanner>;
  productCategoryBanners: Maybe<Array<ProductCategoryBanner>>;
  productCategoryBannersCount: Maybe<Scalars['Int']['output']>;
  productCustomization: Maybe<ProductCustomization>;
  productCustomizations: Maybe<Array<ProductCustomization>>;
  productCustomizationsCount: Maybe<Scalars['Int']['output']>;
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
  products: Maybe<Array<Product>>;
  productsCount: Maybe<Scalars['Int']['output']>;
  topping: Maybe<Topping>;
  toppingOption: Maybe<ToppingOption>;
  toppingOptions: Maybe<Array<ToppingOption>>;
  toppingOptionsCount: Maybe<Scalars['Int']['output']>;
  toppings: Maybe<Array<Topping>>;
  toppingsCount: Maybe<Scalars['Int']['output']>;
  user: Maybe<User>;
  users: Maybe<Array<User>>;
  usersCount: Maybe<Scalars['Int']['output']>;
  validateUserPasswordResetToken: Maybe<ValidateUserPasswordResetTokenResult>;
};


export type QueryAttributeArgs = {
  where: AttributeWhereUniqueInput;
};


export type QueryAttributesArgs = {
  cursor?: InputMaybe<AttributeWhereUniqueInput>;
  orderBy?: Array<AttributeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: AttributeWhereInput;
};


export type QueryAttributesCountArgs = {
  where?: AttributeWhereInput;
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


export type QueryOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type QueryOrderImageArgs = {
  where: OrderImageWhereUniqueInput;
};


export type QueryOrderImagesArgs = {
  cursor?: InputMaybe<OrderImageWhereUniqueInput>;
  orderBy?: Array<OrderImageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderImageWhereInput;
};


export type QueryOrderImagesCountArgs = {
  where?: OrderImageWhereInput;
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


export type QueryProductAttributeArgs = {
  where: ProductAttributeWhereUniqueInput;
};


export type QueryProductAttributesArgs = {
  cursor?: InputMaybe<ProductAttributeWhereUniqueInput>;
  orderBy?: Array<ProductAttributeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductAttributeWhereInput;
};


export type QueryProductAttributesCountArgs = {
  where?: ProductAttributeWhereInput;
};


export type QueryProductCategoryBannerArgs = {
  where: ProductCategoryBannerWhereUniqueInput;
};


export type QueryProductCategoryBannersArgs = {
  cursor?: InputMaybe<ProductCategoryBannerWhereUniqueInput>;
  orderBy?: Array<ProductCategoryBannerOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductCategoryBannerWhereInput;
};


export type QueryProductCategoryBannersCountArgs = {
  where?: ProductCategoryBannerWhereInput;
};


export type QueryProductCustomizationArgs = {
  where: ProductCustomizationWhereUniqueInput;
};


export type QueryProductCustomizationsArgs = {
  cursor?: InputMaybe<ProductCustomizationWhereUniqueInput>;
  orderBy?: Array<ProductCustomizationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProductCustomizationWhereInput;
};


export type QueryProductCustomizationsCountArgs = {
  where?: ProductCustomizationWhereInput;
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


export type QueryValidateUserPasswordResetTokenArgs = {
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type RedeemUserPasswordResetTokenResult = {
  __typename: 'RedeemUserPasswordResetTokenResult';
  code: PasswordResetRedemptionErrorCode;
  message: Scalars['String']['output'];
};

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
  product: Maybe<Product>;
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

export type ToppingCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<ToppingOptionRelateToManyForCreateInput>;
  product?: InputMaybe<ProductRelateToOneForCreateInput>;
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
  product?: InputMaybe<ProductRelateToOneForUpdateInput>;
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
  product?: InputMaybe<ProductWhereInput>;
  slug?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type ToppingWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  product?: InputMaybe<ProductWhereUniqueInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename: 'User';
  cart: Maybe<Cart>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  delivaryAddress: Maybe<Array<DelivaryAddress>>;
  delivaryAddressCount: Maybe<Scalars['Int']['output']>;
  email: Maybe<Scalars['String']['output']>;
  firstOrderDiscountEligible: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  isPhoneNumberVerified: Maybe<Scalars['Boolean']['output']>;
  lastLogin: Maybe<Scalars['DateTime']['output']>;
  name: Maybe<Scalars['String']['output']>;
  orders: Maybe<Array<Order>>;
  ordersCount: Maybe<Scalars['Int']['output']>;
  password: Maybe<PasswordState>;
  passwordResetIssuedAt: Maybe<Scalars['DateTime']['output']>;
  passwordResetRedeemedAt: Maybe<Scalars['DateTime']['output']>;
  passwordResetToken: Maybe<PasswordState>;
  payments: Maybe<Array<Payment>>;
  paymentsCount: Maybe<Scalars['Int']['output']>;
  phoneNumber: Maybe<Scalars['String']['output']>;
  phoneNumberToken: Maybe<PasswordState>;
  phoneNumberVerificationIssuedAt: Maybe<Scalars['DateTime']['output']>;
  phoneNumberVerificationRedeemedAt: Maybe<Scalars['DateTime']['output']>;
  role: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};


export type UserDelivaryAddressArgs = {
  cursor?: InputMaybe<DelivaryAddressWhereUniqueInput>;
  orderBy?: Array<DelivaryAddressOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: DelivaryAddressWhereInput;
};


export type UserDelivaryAddressCountArgs = {
  where?: DelivaryAddressWhereInput;
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
  delivaryAddress?: InputMaybe<DelivaryAddressRelateToManyForCreateInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstOrderDiscountEligible?: InputMaybe<Scalars['Boolean']['input']>;
  isPhoneNumberVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastLogin?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<OrderRelateToManyForCreateInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  passwordResetIssuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  passwordResetRedeemedAt?: InputMaybe<Scalars['DateTime']['input']>;
  passwordResetToken?: InputMaybe<Scalars['String']['input']>;
  payments?: InputMaybe<PaymentRelateToManyForCreateInput>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  phoneNumberToken?: InputMaybe<Scalars['String']['input']>;
  phoneNumberVerificationIssuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  phoneNumberVerificationRedeemedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  firstOrderDiscountEligible?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isPhoneNumberVerified?: InputMaybe<OrderDirection>;
  lastLogin?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  passwordResetIssuedAt?: InputMaybe<OrderDirection>;
  passwordResetRedeemedAt?: InputMaybe<OrderDirection>;
  phoneNumber?: InputMaybe<OrderDirection>;
  phoneNumberVerificationIssuedAt?: InputMaybe<OrderDirection>;
  phoneNumberVerificationRedeemedAt?: InputMaybe<OrderDirection>;
  role?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
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
  delivaryAddress?: InputMaybe<DelivaryAddressRelateToManyForUpdateInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstOrderDiscountEligible?: InputMaybe<Scalars['Boolean']['input']>;
  isPhoneNumberVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastLogin?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<OrderRelateToManyForUpdateInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  passwordResetIssuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  passwordResetRedeemedAt?: InputMaybe<Scalars['DateTime']['input']>;
  passwordResetToken?: InputMaybe<Scalars['String']['input']>;
  payments?: InputMaybe<PaymentRelateToManyForUpdateInput>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  phoneNumberToken?: InputMaybe<Scalars['String']['input']>;
  phoneNumberVerificationIssuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  phoneNumberVerificationRedeemedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  cart?: InputMaybe<CartWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  delivaryAddress?: InputMaybe<DelivaryAddressManyRelationFilter>;
  email?: InputMaybe<StringFilter>;
  firstOrderDiscountEligible?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<IdFilter>;
  isPhoneNumberVerified?: InputMaybe<BooleanFilter>;
  lastLogin?: InputMaybe<DateTimeNullableFilter>;
  name?: InputMaybe<StringFilter>;
  orders?: InputMaybe<OrderManyRelationFilter>;
  passwordResetIssuedAt?: InputMaybe<DateTimeNullableFilter>;
  passwordResetRedeemedAt?: InputMaybe<DateTimeNullableFilter>;
  passwordResetToken?: InputMaybe<PasswordFilter>;
  payments?: InputMaybe<PaymentManyRelationFilter>;
  phoneNumber?: InputMaybe<StringFilter>;
  phoneNumberToken?: InputMaybe<PasswordFilter>;
  phoneNumberVerificationIssuedAt?: InputMaybe<DateTimeNullableFilter>;
  phoneNumberVerificationRedeemedAt?: InputMaybe<DateTimeNullableFilter>;
  role?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type UserWhereUniqueInput = {
  cart?: InputMaybe<CartWhereUniqueInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type ValidateUserPasswordResetTokenResult = {
  __typename: 'ValidateUserPasswordResetTokenResult';
  code: PasswordResetRedemptionErrorCode;
  message: Scalars['String']['output'];
};

export type VerifyUserByPhoneNumberResponse = {
  __typename: 'VerifyUserByPhoneNumberResponse';
  message: Maybe<Scalars['String']['output']>;
  status: Maybe<Scalars['Boolean']['output']>;
};

export type GetCategoriesQueryVariables = Exact<{
  where: CategoryWhereInput;
}>;


export type GetCategoriesQuery = { categories: Array<{ __typename: 'Category', id: string, name: string | null, slug: string | null }> | null };

export type ProductQueryVariables = Exact<{
  where: ProductWhereUniqueInput;
  variantsOrderBy: Array<ProductVariantOrderByInput> | ProductVariantOrderByInput;
  toppingOptionOrderBy: Array<ToppingOptionOrderByInput> | ToppingOptionOrderByInput;
}>;


export type ProductQuery = { product: { __typename: 'Product', id: string, name: string | null, baseDescription: string | null, type: string | null, variantType: string | null, stockQuantity: number | null, isAvailable: boolean | null, fillingsCount: number | null, images: Array<{ __typename: 'ProductImage', id: string, altText: string | null, image: { __typename: 'ImageFieldOutput', id: string, url: string } | null }> | null, video: { __typename: 'FileFieldOutput', url: string } | null, fillings: Array<{ __typename: 'ProductFilling', id: string, name: string | null, description: string | null, calories: unknown | null, fat: unknown | null, lifeShelf: number | null, ingredients: string | null, protein: unknown | null, carbonhydrate: unknown | null, image_icon: { __typename: 'ImageFieldOutput', url: string } | null, attribute: { __typename: 'Attribute', id: string, name: string | null, productAttributes: Array<{ __typename: 'ProductAttribute', id: string, product: { __typename: 'Product', id: string, name: string | null, images: Array<{ __typename: 'ProductImage', id: string, image: { __typename: 'ImageFieldOutput', url: string } | null }> | null } | null }> | null } | null, variants: Array<{ __typename: 'ProductVariant', id: string, weight: unknown | null, pieces: number | null, serving: number | null, price: number | null, isAvailable: boolean | null }> | null }> | null, customization: { __typename: 'ProductCustomization', customOptions: Array<{ __typename: 'CustomizationOption', id: string, name: string | null, customValues: Array<{ __typename: 'CustomizationOptionValue', id: string, value: string | null, extraPrice: number | null }> | null }> | null } | null, topping: { __typename: 'Topping', options: Array<{ __typename: 'ToppingOption', id: string, pieces: number | null, weight: unknown | null, extraPrice: number | null }> | null } | null } | null };
