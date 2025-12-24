import { TypedDocumentNode, gql } from "@apollo/client";
import {
  Category,
  CategoryWhereInput,
  User,
} from "@/types/__generated__/graphql";
import { USER_DATA_FRAGMENT } from "@/hooks/userDataFragment";

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
      ...userFragment
    }
  }
  ${USER_DATA_FRAGMENT}
`;
