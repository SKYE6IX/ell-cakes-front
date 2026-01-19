import { TypedDocumentNode, gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";

export const REEDEEM_PHONE_NUMBER_TOKEN: TypedDocumentNode<
  { redeemPhoneNumberToken: { status: boolean; message: string } },
  { token: string; phoneNumber: string }
> = gql`
  mutation RedeemPhoneNumberToken($token: String!, $phoneNumber: String!) {
    redeemPhoneNumberToken(token: $token, phoneNumber: $phoneNumber) {
      status
      message
    }
  }
`;

type Props = {
  phoneNumber: string | undefined;
  callback: () => void;
};

export function useVerifyPhoneNumber({ phoneNumber, callback }: Props) {
  const [reedeemPhoneToken, { loading, error }] = useMutation(
    REEDEEM_PHONE_NUMBER_TOKEN,
    {
      variables: {
        phoneNumber,
      },
      onCompleted(data) {
        if (data.redeemPhoneNumberToken.status) {
          callback();
        }
      },
      refetchQueries(result) {
        if (result.data.redeemPhoneNumberToken.status) {
          return [AUTHORIZED_USER_QUERY];
        }
        return [];
      },
    }
  );

  return {
    reedeemPhoneToken,
    loading,
    error,
  };
}
