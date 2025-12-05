import { TypedDocumentNode, gql } from "@apollo/client";
import { RegisterUserInput, User } from "@/types/__generated__/graphql";

export const REGISTER_USER: TypedDocumentNode<
  { registerUser: User },
  { registerData: RegisterUserInput }
> = gql`
  mutation RegisterUser($registerData: RegisterUserInput!) {
    registerUser(registerData: $registerData) {
      id
    }
  }
`;

export const IS_EMAIL_IN_USE: TypedDocumentNode<
  { isEmailInUse: boolean },
  { email: string }
> = gql`
  query Query($email: String!) {
    isEmailInUse(email: $email)
  }
`;

export const IS_PHONE_NUMBER_IN_USE: TypedDocumentNode<
  { isPhoneNumberInUse: boolean },
  { phoneNumber: string }
> = gql`
  query Query($phoneNumber: String!) {
    isPhoneNumberInUse(phoneNumber: $phoneNumber)
  }
`;
