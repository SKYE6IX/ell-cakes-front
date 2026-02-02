import { TypedDocumentNode, gql } from "@apollo/client";

export const RESEND_USER_VERIFICATION_TOKEN: TypedDocumentNode<
  {
    resendUserVerificationToken: string;
  },
  { email: string }
> = gql`
  mutation ResendUserVerificationToken($email: String!) {
    resendUserVerificationToken(email: $email)
  }
`;
