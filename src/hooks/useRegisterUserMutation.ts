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
import { USER_DATA_FRAGMENT } from "./userDataFragment";
import { cartVar, userVar } from "@/lib/cache";

export const REGISTER_USER: TypedDocumentNode<
  { registerUser: User },
  { registerData: RegisterUserInput }
> = gql`
  mutation RegisterUser($registerData: RegisterUserInput!) {
    registerUser(registerData: $registerData) {
      ...userFragment
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
