import { TypedDocumentNode, gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { AUTHORIZED_USER_QUERY } from "@/components/header/operation";
import {
  DelivaryAddressCreateInput,
  DelivaryAddressWhereUniqueInput,
} from "@/types/__generated__/graphql";

const CREATE_DELIVARY_ADDRESS: TypedDocumentNode<
  { createDelivaryAddress: { id: string } },
  { data: DelivaryAddressCreateInput }
> = gql`
  mutation CreateDelivaryAddress($data: DelivaryAddressCreateInput!) {
    createDelivaryAddress(data: $data) {
      id
    }
  }
`;

const UPDATE_DELIVARY_ADDRESS: TypedDocumentNode<
  { updateDelivaryAddress: { id: string } },
  { where: DelivaryAddressWhereUniqueInput; data: DelivaryAddressCreateInput }
> = gql`
  mutation UpdateDelivaryAddress(
    $where: DelivaryAddressWhereUniqueInput!
    $data: DelivaryAddressUpdateInput!
  ) {
    updateDelivaryAddress(where: $where, data: $data) {
      id
    }
  }
`;

type Props = {
  userId: string | undefined;
  formState: {
    address: string;
    floor: string;
    apartmentNumber: string;
    intercomCode: string;
  };
  callBack: () => void;
};

export function useCreateDeliveryAddress({
  formState,
  callBack,
  userId,
}: Props) {
  const [createDelivaryAddress, { loading }] = useMutation(
    CREATE_DELIVARY_ADDRESS,
    {
      variables: {
        data: {
          ...formState,
          user: { connect: { id: userId } },
        },
      },
      onCompleted() {
        callBack();
      },

      onError(error) {
        console.error("Error occur when creating new address -> ", error);
      },

      refetchQueries(result) {
        if (result.data) {
          return [AUTHORIZED_USER_QUERY];
        }
        return [];
      },
    }
  );

  return {
    createDelivaryAddress,
    loading,
  };
}

export function useUpdateDeliveryAddress({
  formState,
  callBack,
  userId,
}: Props) {
  const [updateDelivaryAddress, { loading }] = useMutation(
    UPDATE_DELIVARY_ADDRESS,
    {
      variables: {
        data: {
          ...formState,
        },
        where: { user: { id: userId } },
      },
      onCompleted() {
        callBack();
      },

      onError(error) {
        console.error("Error occur when creating new address -> ", error);
      },

      refetchQueries(result) {
        if (result.data) {
          return [AUTHORIZED_USER_QUERY];
        }
        return [];
      },
    }
  );

  return {
    updateDelivaryAddress,
    loading,
  };
}
