import { TypedDocumentNode, gql } from "@apollo/client";

export const REDEEM_PHONE_NUMBER_TOKEN: TypedDocumentNode<
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

export const RESEND_PHONE_NUMBER_TOKEN: TypedDocumentNode<
  { resendPhoneNumberToken: string },
  { phoneNumber: string }
> = gql`
  mutation ResendPhoneNumberToken($phoneNumber: String!) {
    resendPhoneNumberToken(phoneNumber: $phoneNumber)
  }
`;
