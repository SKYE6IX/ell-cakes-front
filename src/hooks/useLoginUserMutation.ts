import { TypedDocumentNode, gql } from "@apollo/client";
import { OrderDirection, User } from "@/types/__generated__/graphql";
import {
  CONNECT_CART_TO_USER,
  GET_CART_QUERY,
} from "@/components/cart/operations";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";
import { USER_DATA_FRAGMENT } from "../userDataFragment";
import { useReactiveVar, useMutation } from "@apollo/client/react";
import { cartVar, userVar } from "@/lib/cache";

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
  onComplete: () => void;
  formState: {
    email: string;
    password: string;
  };
};

export function useLoginUserMutation({ formState, onComplete }: Props) {
  const cart = useReactiveVar(cartVar);

  const [connectCartToUser] = useMutation(CONNECT_CART_TO_USER, {
    variables: {
      cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
      orderImagesBy: [{ createdAt: OrderDirection.Asc }],
    },

    onCompleted(data) {
      cartVar(data.connectCartToUser);
    },
  });

  const [authorizeUser, { loading, error }] = useMutation(AUTHORIZED_USER, {
    variables: formState,
    onCompleted(data) {
      userVar(data.authorizedUser);
      onComplete();
      if (cart) {
        connectCartToUser({ variables: { userId: data.authorizedUser.id } });
      }
    },

    onError(error) {
      console.error("Error happen when log in", error);
    },

    refetchQueries(result) {
      if (result.data.authorizedUser) {
        return [GET_CART_QUERY, AUTHORIZED_USER_QUERY];
      }
      return [];
    },
  });

  return {
    authorizeUser,
    loading,
    error,
  };
}
