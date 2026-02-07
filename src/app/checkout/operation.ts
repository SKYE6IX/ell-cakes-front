import { TypedDocumentNode, gql } from "@apollo/client";
import { Payment, OrderReceiverInput } from "@/types/__generated__/graphql";

export const CHECKOUT_ORDER: TypedDocumentNode<
  { checkOut: Payment },
  {
    deliveryAddressId?: string;
    customerNote?: string;
    orderReceiver?: OrderReceiverInput;
    shippingCost: number;
    paymentMethod: string;
    deliveryOption: string;
  }
> = gql`
  mutation CheckOut(
    $deliveryAddressId: String
    $shippingCost: Int!
    $paymentMethod: String!
    $customerNote: String
    $deliveryOption: String!
    $orderReceiver: OrderReceiverInput
  ) {
    checkOut(
      deliveryAddressId: $deliveryAddressId
      shippingCost: $shippingCost
      paymentMethod: $paymentMethod
      customerNote: $customerNote
      deliveryOption: $deliveryOption
      orderReceiver: $orderReceiver
    ) {
      id
      redirectUrl
      confirmationUrl
    }
  }
`;
