import {
  Category,
  CategoryWhereInput,
  User,
} from "@/types/__generated__/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

export const GET_CATEGORIES: TypedDocumentNode<
  { categories: Category[] },
  { where: CategoryWhereInput }
> = gql`
  query GetCategories($where: CategoryWhereInput!) {
    categories(where: $where) {
      id
      name
      slug
    }
  }
`;

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
          quantity
          product {
            id
            name
          }
        }
      }
    }
  }
`;
