import { TypedDocumentNode, gql } from "@apollo/client";
import { User } from "@/types/__generated__/graphql";

export const AUTHORIZED_USER_QUERY: TypedDocumentNode<
  { queryAuthorizedUser: User | null },
  Record<string, null>
> = gql`
  query QueryAuthorizedUser {
    queryAuthorizedUser {
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
            id
            name
          }
        }
      }
    }
  }
`;
