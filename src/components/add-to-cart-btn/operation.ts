import { TypedDocumentNode, gql } from "@apollo/client";
import {
  Cart,
  CustomizationInput,
  CompositionOptionInput,
} from "@/types/__generated__/graphql";
import { QueryCartSettings } from "../cart/operations";
import { CART_FRAGMENT } from "../cart/operations";

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
  ) {
    addToCart(
      productId: $productId
      variantId: $variantId
      customizations: $customizations
      compositionOptions: $compositionOptions
      toppingOptionId: $toppingOptionId
    ) {
      ...cartFragment
    }
  }
  ${CART_FRAGMENT}
`;
