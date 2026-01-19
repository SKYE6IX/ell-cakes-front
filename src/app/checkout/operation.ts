import { TypedDocumentNode, gql } from "@apollo/client";
import { Payment } from "@/types/__generated__/graphql";

export const CHECKOUT_ORDER: TypedDocumentNode<
  { checkOut: Payment },
  {
    deliveryAddressId: string;
    shippingCost: number;
    paymentMethod: string;
    customerNote?: string;
  }
> = gql`
  mutation CheckOut(
    $deliveryAddressId: String!
    $shippingCost: Int!
    $paymentMethod: String!
    $customerNote: String
  ) {
    checkOut(
      deliveryAddressId: $deliveryAddressId
      shippingCost: $shippingCost
      paymentMethod: $paymentMethod
      customerNote: $customerNote
    ) {
      id
      redirectUrl
      confirmationUrl
    }
  }
`;
