import { TypedDocumentNode, gql } from "@apollo/client";
import { User } from "@/types/__generated__/graphql";

export const AUTHORIZED_USER: TypedDocumentNode<
  { authorizedUser: User },
  { email: string; password: string }
> = gql`
  mutation AuthorizedUser($email: String!, $password: String!) {
    authorizedUser(email: $email, password: $password) {
      id
      name
      email
      phoneNumber
      isPhoneNumberVerified
      delivaryAddress {
        id
        street
      }
      orders {
        id
        createdAt
        orderNumber
        totalAmount
        status
        orderItems {
          id
          product {
            name
          }
        }
      }
    }
  }
`;
