import { TypedDocumentNode, gql } from "@apollo/client";
import { User } from "@/types/__generated__/graphql";

export const REQUEST_PASSWORD_RESET_TOKEN: TypedDocumentNode<
  { sendPasswordResetToken: string },
  { email: string }
> = gql`
  mutation SendPasswordResetToken($email: String!) {
    sendPasswordResetToken(email: $email)
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
