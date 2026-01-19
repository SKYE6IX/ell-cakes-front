import { TypedDocumentNode, gql } from "@apollo/client";

export const RESEND_PHONE_NUMBER_TOKEN: TypedDocumentNode<
  {
    resendPhoneNumberToken: string;
  },
  { phoneNumber: string }
> = gql`
  mutation ResendPhoneNumberToken($phoneNumber: String!) {
    resendPhoneNumberToken(phoneNumber: $phoneNumber)
  }
`;
