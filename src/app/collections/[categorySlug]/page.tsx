import React from "react";
import { gql, TypedDocumentNode } from "@apollo/client";
import Collection from "@/components/collection/Collection";
import {
  Product,
  ProductWhereInput,
  ProductVariantOrderByInput,
  OrderDirection,
  ProductImageOrderByInput,
} from "@/types/__generated__/graphql";
import { query } from "@/ApolloClient";

const GET_PRODUCTS_BY_CATEORY_QUERY: TypedDocumentNode<
  { products: Product[] },
  {
    where: ProductWhereInput;
    takeFillings: number;
    takeVariants: number;
    takeImages: number;
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

async function page({ params }: { params: Promise<{ categorySlug: string }> }) {
  const TAKE_FILLINGS_NUM = 1;
  const TAKE_VARIANTS_NUM = 1;
  const TAKE_IMAGES_NUM = 1;
  const { categorySlug } = await params;

  const { data } = await query({
    query: GET_PRODUCTS_BY_CATEORY_QUERY,
    variables: {
      where: { category: { slug: { equals: categorySlug } } },
      takeFillings: TAKE_FILLINGS_NUM,
      takeImages: TAKE_IMAGES_NUM,
      takeVariants: TAKE_VARIANTS_NUM,
      orderVariantsBy: [{ price: OrderDirection.Asc }],
      imagesOrderBy: [{ id: OrderDirection.Asc }],
    },
  });

  return <Collection products={data?.products} categorySlug={categorySlug} />;
}

export default page;
