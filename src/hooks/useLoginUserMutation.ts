import { TypedDocumentNode, gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { OrderDirection, User } from "@/types/__generated__/graphql";
import {
  CONNECT_CART_TO_USER,
  GET_CART_QUERY,
} from "@/components/cart/operations";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";
import { USER_DATA_FRAGMENT } from "../userDataFragment";
import { useWriteCartQuery } from "./useWriteCartQuery";

export const AUTHORIZED_USER: TypedDocumentNode<
  { authorizedUser: User },
  { email: string; password: string }
> = gql`
  mutation AuthorizedUser($email: String!, $password: String!) {
    authorizedUser(email: $email, password: $password) {
      ...UserFragment
    }
  }
  ${USER_DATA_FRAGMENT}
`;

type Props = {
  onComplete: (data?: { authorizedUser: User }) => void;
  formState: {
    email: string;
    password: string;
  };
};

export function useLoginUserMutation({ formState, onComplete }: Props) {
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

  const [authorizeUser, { loading, error }] = useMutation(AUTHORIZED_USER, {
    variables: formState,

    onCompleted(data) {
      onComplete(data);
      if (cart) {
        connectCartToUser({ variables: { userId: data.authorizedUser.id } });
      }
    },

    refetchQueries(result) {
      if (result.data.authorizedUser) {
        return [AUTHORIZED_USER_QUERY, GET_CART_QUERY];
      }
      return [GET_CART_QUERY];
    },

    onError(error) {
      console.error("Error happen when log in", error);
    },
  });

  return {
    authorizeUser,
    loading,
    error,
  };
}
