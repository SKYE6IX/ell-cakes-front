import { TypedDocumentNode, gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { OrderDirection, RegisterUserInput, User } from "@/types/__generated__/graphql";
import { CONNECT_CART_TO_USER, GET_CART_QUERY } from "@/components/cart/operations";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";
import { USER_DATA_FRAGMENT } from "../userDataFragment";
import { useWriteCartQuery } from "./useWriteCartQuery";

export const REGISTER_USER: TypedDocumentNode<
  { registerUser: User },
  { registerData: RegisterUserInput }
> = gql`
  mutation RegisterUser($registerData: RegisterUserInput!) {
    registerUser(registerData: $registerData) {
      ...UserFragment
    }
  }
  ${USER_DATA_FRAGMENT}
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
  const writeCartQuery = useWriteCartQuery();

  const { data } = useQuery(GET_CART_QUERY, {
    variables: {
      cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
      orderImagesBy: [{ createdAt: OrderDirection.Asc }],
    },
  });

  const cart = data?.queryCart;

  const [connectCartToUser] = useMutation(CONNECT_CART_TO_USER, {
    variables: {
      cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
      orderImagesBy: [{ createdAt: OrderDirection.Asc }],
    },

    update(cache, { data }) {
      if (data?.connectCartToUser) {
        writeCartQuery(cache, data.connectCartToUser);
      }
    },
  });

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    variables: { registerData: formState },
    onCompleted(data) {
      onComplete();
      if (cart) {
        connectCartToUser({ variables: { userId: data.registerUser.id } });
      }
    },

    onError(error) {
      console.error("An error occur when try to register! ", error);
    },

    refetchQueries(result) {
      if (result.data.registerUser) {
        return [AUTHORIZED_USER_QUERY, GET_CART_QUERY];
      }

      return [GET_CART_QUERY];
    },
  });

  return {
    loading,
    error,
    registerUser,
  };
}
