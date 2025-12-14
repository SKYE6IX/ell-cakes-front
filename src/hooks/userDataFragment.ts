import { gql } from "@apollo/client";

export const USER_DATA_FRAGMENT = gql`
  fragment userFragment on User {
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
`;
