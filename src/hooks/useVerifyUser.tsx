import { TypedDocumentNode, gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";

export const REEDEEM_USER_VERIFICATION_TOKEN: TypedDocumentNode<
  { redeemUserVerificationToken: { status: boolean; message: string } },
  { token: string; email: string }
> = gql`
  mutation RedeemUserVerificationToken($token: String!, $email: String!) {
    redeemUserVerificationToken(token: $token, email: $email) {
      status
      message
    }
  }
`;

type Props = {
  email: string | undefined;
  callback: () => void;
};

export function useVerifyPhoneNumber({ email, callback }: Props) {
  const [reedeemUserVerificationToken, { loading, error }] = useMutation(
    REEDEEM_USER_VERIFICATION_TOKEN,
    {
      variables: {
        email,
      },

      onCompleted(data) {
        if (data.redeemUserVerificationToken.status) {
          callback();
        }
      },

      refetchQueries(result) {
        if (result.data.redeemUserVerificationToken.status) {
          return [AUTHORIZED_USER_QUERY];
        }
        return [];
      },
    }
  );

  return {
    reedeemUserVerificationToken,
    loading,
    error,
  };
}
