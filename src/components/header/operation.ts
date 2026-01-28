import { TypedDocumentNode, gql } from "@apollo/client";
import { Category, CategoryWhereInput } from "@/types/__generated__/graphql";

export const GET_CATEGORIES: TypedDocumentNode<
  { categories: Category[] },
  { where: CategoryWhereInput }
> = gql`
  query GetCategories($where: CategoryWhereInput!) {
    categories(where: $where) {
      id
      name
      slug
      parent {
        id
        slug
      }
    }
  }
`;
