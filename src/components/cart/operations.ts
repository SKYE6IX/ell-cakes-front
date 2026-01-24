import { TypedDocumentNode, gql } from "@apollo/client";
import {
  Cart,
  CartItemOrderByInput,
  ProductImageOrderByInput,
} from "@/types/__generated__/graphql";

export type QueryCartSettings = {
  cartItemsOrderBy: CartItemOrderByInput[];
  orderImagesBy: ProductImageOrderByInput[];
};

export const CART_FRAGMENT = gql`
  fragment cartFragment on Cart {
    id
    subTotal
    cartItems(orderBy: $cartItemsOrderBy) {
      id
      subTotal
      quantity
      customizations
      compositions
      variant {
        id
        weight
        pieces
        size
      }
      toppingOption {
        id
        weight
        extraPrice
      }
      product {
        id
        name
        variantType
        images(orderBy: $orderImagesBy) {
          id
          altText
          image {
            id
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
  ) {
    removeFromCart(cartItemId: $cartItemId) {
      ...cartFragment
    }
  }
  ${CART_FRAGMENT}
`;

export const CONNECT_CART_TO_USER: TypedDocumentNode<
  { connectCartToUser: Cart | null },
  {
    userId: string;
  } & QueryCartSettings
> = gql`
  mutation ConnectCartToUser(
    $userId: String!
    $cartItemsOrderBy: [CartItemOrderByInput!]!
    $orderImagesBy: [ProductImageOrderByInput!]!
  ) {
    connectCartToUser(userId: $userId) {
      ...cartFragment
    }
  }
  ${CART_FRAGMENT}
`;
