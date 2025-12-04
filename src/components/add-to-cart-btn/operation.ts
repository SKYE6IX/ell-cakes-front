import { TypedDocumentNode, gql } from "@apollo/client";
import {
  Cart,
  CustomizationInput,
  CompositionOptionInput,
  CartItemOrderByInput,
} from "@/types/__generated__/graphql";

export interface AddToCartArgs {
  productId: string;
  variantId: string;
  takeProductImage: number;
  customizations: CustomizationInput[] | null;
  compositionOptions: CompositionOptionInput[] | null;
  toppingOptionId: string | null;
  cartItemsOrderBy: CartItemOrderByInput[];
}

export const ADD_TO_CART_MUTATION: TypedDocumentNode<
  { addToCart: Cart },
  AddToCartArgs
> = gql`
  mutation AddToCart(
    $productId: String!
    $variantId: String!
    $takeProductImage: Int
    $customizations: [CustomizationInput!]
    $compositionOptions: [CompositionOptionInput!]
    $toppingOptionId: String
    $cartItemsOrderBy: [CartItemOrderByInput!]!
  ) {
    addToCart(
      productId: $productId
      variantId: $variantId
      customizations: $customizations
      compositionOptions: $compositionOptions
      toppingOptionId: $toppingOptionId
    ) {
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
          images(take: $takeProductImage) {
            image {
              url
            }
          }
        }
      }
    }
  }
`;
