import { TypedDocumentNode, gql } from "@apollo/client";
import { Cart, CartItemOrderByInput } from "@/types/__generated__/graphql";

export const GET_CART_QUERY: TypedDocumentNode<
  { queryCart: Cart },
  { productImageTake: number; cartItemsOrderBy: CartItemOrderByInput[] }
> = gql`
  query QueryCart($take: Int, $cartItemsOrderBy: [CartItemOrderByInput!]!) {
    queryCart {
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
          name
          images(take: $take) {
            image {
              url
            }
          }
        }
      }
    }
  }
`;

export const INCREASE_CART_ITEM: TypedDocumentNode<
  { increaseCartItem: Cart },
  {
    cartItemId: string;
    productImageTake: number;
    cartItemsOrderBy: CartItemOrderByInput[];
  }
> = gql`
  mutation IncreaseCartItem(
    $cartItemId: String!
    $productImageTake: Int
    $cartItemsOrderBy: [CartItemOrderByInput!]!
  ) {
    increaseCartItem(cartItemId: $cartItemId) {
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
          name
          images(take: $productImageTake) {
            image {
              url
            }
          }
        }
      }
    }
  }
`;

export const DECREASE_CART_ITEM: TypedDocumentNode<
  { decreaseCartItem: Cart | null },
  {
    cartItemId: string;
    productImageTake: number;
    cartItemsOrderBy: CartItemOrderByInput[];
  }
> = gql`
  mutation DecreaseCartItem(
    $cartItemId: String!
    $productImageTake: Int
    $cartItemsOrderBy: [CartItemOrderByInput!]!
  ) {
    decreaseCartItem(cartItemId: $cartItemId) {
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
          name
          images(take: $productImageTake) {
            image {
              url
            }
          }
        }
      }
    }
  }
`;

export const DELETE_CART_ITEM: TypedDocumentNode<
  { removeFromCart: Cart | null },
  {
    cartItemId: string;
    productImageTake: number;
    cartItemsOrderBy: CartItemOrderByInput[];
  }
> = gql`
  mutation RemoveFromCart(
    $cartItemId: String!
    $productImageTake: Int
    $cartItemsOrderBy: [CartItemOrderByInput!]!
  ) {
    removeFromCart(cartItemId: $cartItemId) {
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
          name
          images(take: $productImageTake) {
            image {
              url
            }
          }
        }
      }
    }
  }
`;
