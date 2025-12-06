import { TypedDocumentNode, gql } from "@apollo/client";
import {
  Cart,
  CartItemOrderByInput,
  ProductImageOrderByInput,
} from "@/types/__generated__/graphql";

export type QueryCartSettings = {
  cartItemsOrderBy: CartItemOrderByInput[];
  orderImagesBy: ProductImageOrderByInput[];
  takeImage: number;
};

const CART_FRAGMENT = gql`
  fragment cartFragment on Cart {
    id
    subTotal
    cartItems(orderBy: $cartItemsOrderBy) {
      id
      subTotal
      quantity
      customizationsSnapShot
      compositionSnapShot
      toppingOption {
        weight
        extraPrice
      }
      product {
        id
        name
        images(orderBy: $orderImagesBy, take: $takeImage) {
          id
          image {
            url
          }
        }
      }
    }
  }
`;

export const GET_CART_QUERY: TypedDocumentNode<
  { queryCart: Cart },
  QueryCartSettings
> = gql`
  query QueryCart(
    $cartItemsOrderBy: [CartItemOrderByInput!]!
    $orderImagesBy: [ProductImageOrderByInput!]!
    $takeImage: Int
  ) {
    queryCart {
      ...cartFragment
    }
  }
  ${CART_FRAGMENT}
`;

export const INCREASE_CART_ITEM: TypedDocumentNode<
  { increaseCartItem: Cart },
  {
    cartItemId: string;
  } & QueryCartSettings
> = gql`
  mutation IncreaseCartItem(
    $cartItemId: String!
    $cartItemsOrderBy: [CartItemOrderByInput!]!
    $orderImagesBy: [ProductImageOrderByInput!]!
    $takeImage: Int
  ) {
    increaseCartItem(cartItemId: $cartItemId) {
      ...cartFragment
    }
  }
  ${CART_FRAGMENT}
`;

export const DECREASE_CART_ITEM: TypedDocumentNode<
  { decreaseCartItem: Cart | null },
  {
    cartItemId: string;
  } & QueryCartSettings
> = gql`
  mutation DecreaseCartItem(
    $cartItemId: String!
    $cartItemsOrderBy: [CartItemOrderByInput!]!
    $orderImagesBy: [ProductImageOrderByInput!]!
    $takeImage: Int
  ) {
    decreaseCartItem(cartItemId: $cartItemId) {
      ...cartFragment
    }
  }
  ${CART_FRAGMENT}
`;

export const DELETE_CART_ITEM: TypedDocumentNode<
  { removeFromCart: Cart | null },
  {
    cartItemId: string;
  } & QueryCartSettings
> = gql`
  mutation RemoveFromCart(
    $cartItemId: String!
    $cartItemsOrderBy: [CartItemOrderByInput!]!
    $orderImagesBy: [ProductImageOrderByInput!]!
    $takeImage: Int
  ) {
    removeFromCart(cartItemId: $cartItemId) {
      ...cartFragment
    }
  }
  ${CART_FRAGMENT}
`;

export const CONNECT_CART_TO_USER: TypedDocumentNode<
  { connectCartToUser: Cart },
  {
    userId: string;
  } & QueryCartSettings
> = gql`
  mutation ConnectCartToUser(
    $userId: String!
    $cartItemsOrderBy: [CartItemOrderByInput!]!
    $orderImagesBy: [ProductImageOrderByInput!]!
    $takeImage: Int
  ) {
    connectCartToUser(userId: $userId) {
      ...cartFragment
    }
  }
  ${CART_FRAGMENT}
`;
