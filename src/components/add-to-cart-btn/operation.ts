import { TypedDocumentNode, gql } from "@apollo/client";
import {
  Cart,
  CustomizationInput,
  CompositionOptionInput,
} from "@/types/__generated__/graphql";
import { QueryCartSettings } from "../cart/operations";

export interface AddToCartArgs {
  productId: string;
  variantId: string;
  customizations: CustomizationInput[] | null;
  compositionOptions: CompositionOptionInput[] | null;
  toppingOptionId: string | null;
}

export const ADD_TO_CART_MUTATION: TypedDocumentNode<
  { addToCart: Cart },
  AddToCartArgs & QueryCartSettings
> = gql`
  mutation AddToCart(
    $productId: String!
    $variantId: String!
    $customizations: [CustomizationInput!]
    $compositionOptions: [CompositionOptionInput!]
    $toppingOptionId: String
    $cartItemsOrderBy: [CartItemOrderByInput!]!
    $orderImagesBy: [ProductImageOrderByInput!]!
    $takeImage: Int
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
  }
`;
