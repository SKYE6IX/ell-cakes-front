import React from "react";
import { gql, TypedDocumentNode } from "@apollo/client";
import Collection from "@/components/collection/Collection";
import { createServerApolloClient } from "@/lib/apolloServer";
import {
  Product,
  ProductWhereInput,
  ProductVariantOrderByInput,
  OrderDirection,
} from "@/types/__generated__/graphql";

const GET_PRODUCTS_BY_CATEORY_QUERY: TypedDocumentNode<
  { products: Product[] },
  {
    where: ProductWhereInput;
    takeFillings: number;
    takeVariants: number;
    takeImages: number;
    orderVariantsBy: ProductVariantOrderByInput[];
  }
> = gql`
  query CollectionProducts(
    $where: ProductWhereInput!
    $takeFillings: Int
    $takeVariants: Int
    $takeImages: Int
    $orderVariantsBy: [ProductVariantOrderByInput!]!
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
      images(take: $takeImages) {
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
  const client = createServerApolloClient();

  const { data } = await client.query({
    query: GET_PRODUCTS_BY_CATEORY_QUERY,
    variables: {
      where: { category: { slug: { equals: categorySlug } } },
      takeFillings: TAKE_FILLINGS_NUM,
      takeImages: TAKE_IMAGES_NUM,
      takeVariants: TAKE_VARIANTS_NUM,
      orderVariantsBy: [
        { weight: OrderDirection.Asc },
        { pieces: OrderDirection.Asc },
      ],
    },
  });

  return <Collection products={data?.products} categorySlug={categorySlug} />;
}

export default page;
