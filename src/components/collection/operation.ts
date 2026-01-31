import {
  Product,
  ProductWhereInput,
  ProductVariantOrderByInput,
  ProductImageOrderByInput,
} from "@/types/__generated__/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

export const GET_PRODUCTS_BY_CATEGORY: TypedDocumentNode<
  { products: Product[] },
  {
    where: ProductWhereInput;
    takeFillings: number;
    takeVariants: number;
    orderVariantsBy: ProductVariantOrderByInput[];
    imagesOrderBy: ProductImageOrderByInput[];
  }
> = gql`
  query CollectionProducts(
    $where: ProductWhereInput!
    $takeFillings: Int
    $takeVariants: Int
    $orderVariantsBy: [ProductVariantOrderByInput!]!
    $imagesOrderBy: [ProductImageOrderByInput!]!
  ) {
    products(where: $where) {
      id
      name
      slug
      badge
      baseDescription
      variantType
      fillings(take: $takeFillings) {
        id
        variants(orderBy: $orderVariantsBy, take: $takeVariants) {
          id
          weight
          pieces
          size
          price
        }
      }
      images(orderBy: $imagesOrderBy) {
        id
        isMain
        image {
          url
        }
      }
    }
  }
`;
