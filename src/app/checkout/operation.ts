import { TypedDocumentNode, gql } from "@apollo/client";
import { Payment } from "@/types/__generated__/graphql";

export const CHECKOUT_ORDER: TypedDocumentNode<
  { checkOut: Payment },
  {
    deliveryAddressId: string;
    shippingCost: number;
    paymentMethod: string;
    customerNote?: string;
    deliveryOptiion: string;
  }
> = gql`
  mutation CheckOut(
    $deliveryAddressId: String!
    $shippingCost: Int!
    $paymentMethod: String!
    $customerNote: String
    $deliveryOptiion: String!
  ) {
    checkOut(
      deliveryAddressId: $deliveryAddressId
      shippingCost: $shippingCost
      paymentMethod: $paymentMethod
      customerNote: $customerNote
      deliveryOptiion: $deliveryOptiion
    ) {
      id
      redirectUrl
      confirmationUrl
    }
  }
`;
