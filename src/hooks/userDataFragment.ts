import { gql } from "@apollo/client";

export const USER_DATA_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    email
    phoneNumber
    isPhoneNumberVerified
    delivaryAddress {
      id
      address
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
`;
