import { gql, TypedDocumentNode } from "@apollo/client";
import { getClient } from "@/ApolloClient";
import {
  Product,
  ProductWhereUniqueInput,
} from "@/types/__generated__/graphql";

const GET_PRODUCT_META_QUERY: TypedDocumentNode<
  { product: Product },
  { where: ProductWhereUniqueInput; take: number }
> = gql`
  query ProductMeta($where: ProductWhereUniqueInput!, $take: Int) {
    product(where: $where) {
      id
      name
      baseDescription
      images(take: $take) {
        id
        image {
          id
          url
        }
      }
    }
  }
`;

export const getProductMeta = async (productSlug: string) => {
  const NUMBER_IMAGE_TO_TAKKE = 1;
  const { data } = await (
    await getClient()
  ).query({
    query: GET_PRODUCT_META_QUERY,
    variables: { where: { slug: productSlug }, take: NUMBER_IMAGE_TO_TAKKE },
  });
  const product = data?.product;
  return { product };
};
