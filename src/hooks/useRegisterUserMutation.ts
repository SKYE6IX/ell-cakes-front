import { TypedDocumentNode, gql } from "@apollo/client";
import {
  OrderDirection,
  RegisterUserInput,
  User,
} from "@/types/__generated__/graphql";
import { useMutation, useReactiveVar } from "@apollo/client/react";
import {
  CONNECT_CART_TO_USER,
  GET_CART_QUERY,
} from "@/components/cart/operations";
import { cartVar, userVar } from "@/lib/cache";

export const REGISTER_USER: TypedDocumentNode<
  { registerUser: User },
  { registerData: RegisterUserInput }
> = gql`
  mutation RegisterUser($registerData: RegisterUserInput!) {
    registerUser(registerData: $registerData) {
      id
      name
      email
      phoneNumber
      isPhoneNumberVerified
      delivaryAddress {
        id
        street
      }
      orders {
        id
        createdAt
        orderNumber
        totalAmount
        status
        orderItems {
          id
          product {
            name
          }
        }
      }
    }
  }
`;

type Props = {
  onComplete: () => void;
  formState: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
  };
};

export function useRegisterUserMutation({ onComplete, formState }: Props) {
  const cart = useReactiveVar(cartVar);

  const [connectCartToUser] = useMutation(CONNECT_CART_TO_USER, {
    variables: {
      takeImage: 1,
      cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
      orderImagesBy: [{ createdAt: OrderDirection.Asc }],
    },
    onCompleted(data) {
      cartVar(data.connectCartToUser);
    },
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    variables: { registerData: formState },
    onCompleted(data) {
      onComplete();
      userVar(data.registerUser);
      if (cart) {
        connectCartToUser({ variables: { userId: data.registerUser.id } });
      }
    },
    refetchQueries(result) {
      if (result.data.registerUser) {
        return [GET_CART_QUERY];
      }
      return [];
    },
  });

  return {
    loading,
    registerUser,
  };
}
