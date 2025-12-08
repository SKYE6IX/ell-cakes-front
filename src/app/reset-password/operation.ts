import { TypedDocumentNode, gql } from "@apollo/client";
import { User } from "@/types/__generated__/graphql";
export const SEND_PASSWORD_RESET_TOKEN: TypedDocumentNode<
  { sendPasswordResetToken: { passwordResetUrl: string } },
  { phoneNumber: string }
> = gql`
  mutation SendPasswordResetToken($phoneNumber: String!) {
    sendPasswordResetToken(phoneNumber: $phoneNumber) {
      passwordResetUrl
    }
  }
`;

export const VALIDATE_PASSWORD_RESET_TOKEN: TypedDocumentNode<
  { validatePasswordResetToken: boolean },
  { token: string; email: string }
> = gql`
  query ValidatePasswordResetToken($token: String!, $email: String!) {
    validatePasswordResetToken(token: $token, email: $email)
  }
`;

export const UPDATE_PASSWORD: TypedDocumentNode<
  { updatePassword: User },
  { token: string; email: string; newPassword: string }
> = gql`
  mutation UpdatePassword(
    $token: String!
    $email: String!
    $newPassword: String!
  ) {
    updatePassword(token: $token, email: $email, newPassword: $newPassword) {
      id
    }
  }
`;
