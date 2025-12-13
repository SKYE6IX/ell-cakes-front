import React from "react";
import { gql, TypedDocumentNode } from "@apollo/client";
import {
  Product,
  ProductWhereInput,
  ProductVariantOrderByInput,
  OrderDirection,
  ProductImageOrderByInput,
} from "@/types/__generated__/graphql";
import Collection from "@/components/collection/Collection";
import { query } from "@/ApolloClient";

const GET_PRODUCTS_BY_TOP_CATEGORY: TypedDocumentNode<
  { products: Product[] },
  {
    where: ProductWhereInput;
    takeFillings: number;
    takeVariants: number;
    orderVariantsBy: ProductVariantOrderByInput[];
    imagesOrderBy: ProductImageOrderByInput[];
  }
> = gql`
  query TopCollectionProducts(
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
      fillings(take: $takeFillings) {
        id
        variants(take: $takeVariants, orderBy: $orderVariantsBy) {
          id
          weight
          pieces
          price
        }
      }
      images(orderBy: $imagesOrderBy) {
        id
        image {
          url
        }
      }
    }
  }
`;

async function page() {
  const CATEGORY_NAME = "torty";
  const TAKE_FILLINGS_NUM = 1;
  const TAKE_VARIANTS_NUM = 1;

  const { data } = await query({
    query: GET_PRODUCTS_BY_TOP_CATEGORY,
    variables: {
      where: { category: { parent: { slug: { equals: CATEGORY_NAME } } } },
      takeFillings: TAKE_FILLINGS_NUM,
      takeVariants: TAKE_VARIANTS_NUM,
      orderVariantsBy: [{ price: OrderDirection.Asc }],
      imagesOrderBy: [{ id: OrderDirection.Asc }],
    },
  });

  return <Collection products={data?.products} categorySlug={CATEGORY_NAME} />;
}

export default page;
