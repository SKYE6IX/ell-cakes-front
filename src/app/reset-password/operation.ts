import { TypedDocumentNode, gql } from "@apollo/client";
import { User } from "@/types/__generated__/graphql";

export const REQUEST_PASSWORD_RESET_TOKEN: TypedDocumentNode<
  { sendPasswordResetToken: string },
  { phoneNumber: string }
> = gql`
  mutation SendPasswordResetToken($phoneNumber: String!) {
    sendPasswordResetToken(phoneNumber: $phoneNumber)
  }
`;

export const VALIDATE_PASSWORD_RESET_TOKEN: TypedDocumentNode<
  { validatePasswordResetToken: boolean },
  { token: string; phoneNumber: string }
> = gql`
  query ValidatePasswordResetToken($token: String!, $phoneNumber: String!) {
    validatePasswordResetToken(token: $token, phoneNumber: $phoneNumber)
  }
`;

export const UPDATE_PASSWORD: TypedDocumentNode<
  { updatePassword: User },
  { token: string; phoneNumber: string; newPassword: string }
> = gql`
  mutation UpdatePassword(
    $token: String!
    $phoneNumber: String!
    $newPassword: String!
  ) {
    updatePassword(
      token: $token
      phoneNumber: $phoneNumber
      newPassword: $newPassword
    ) {
      id
    }
  }
`;
