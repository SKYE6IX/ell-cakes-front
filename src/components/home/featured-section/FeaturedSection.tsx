import React from "react";
import { gql, TypedDocumentNode } from "@apollo/client";
import {
  FeaturedProduct,
  ProductVariantOrderByInput,
  OrderDirection,
} from "@/types/__generated__/graphql";
import { createServerApolloClient } from "@/lib/apolloServer";
import ProductList from "@/components/product-list/ProductList";
import "./feature-section.scss";

const GET_FEATURED_PRODUCTS_QUERY: TypedDocumentNode<
  {
    featuredProducts: FeaturedProduct[];
  },
  {
    takeFeaturedProducts: number;
    takeFillings: number;
    takeVariants: number;
    variantsOrderBy: ProductVariantOrderByInput[];
  }
> = gql`
  query FeaturedProducts(
    $takeFeaturedProducts: Int
    $takeFillings: Int
    $takeVariants: Int
    $variantsOrderBy: [ProductVariantOrderByInput!]!
  ) {
    featuredProducts(take: $takeFeaturedProducts) {
      id
      product {
        id
        name
        slug
        badge
        baseDescription
        fillings(take: $takeFillings) {
          id
          variants(take: $takeVariants, orderBy: $variantsOrderBy) {
            id
            weight
            pieces
            price
          }
        }
        images {
          id
          image {
            url
          }
        }
      }
    }
  }
`;

async function FeaturedSection() {
  const TAKE_FILLINGS_NUM = 1;
  const TAKE_VARIANTS_NUM = 1;
  const TAKE_FEATURED_PRODUCTS = 8;
  const client = createServerApolloClient();
  const { data } = await client.query({
    query: GET_FEATURED_PRODUCTS_QUERY,
    variables: {
      takeFeaturedProducts: TAKE_FEATURED_PRODUCTS,
      takeFillings: TAKE_FILLINGS_NUM,
      takeVariants: TAKE_VARIANTS_NUM,
      variantsOrderBy: [
        { weight: OrderDirection.Asc },
        { pieces: OrderDirection.Asc },
      ],
    },
  });
  const products = data?.featuredProducts.map((featured) => featured.product!);
  return (
    <section className="featured-section">
      <h3 className="featured__title">
        ВСЕ, ЧТО НУЖНО ДЛЯ УДОВЛЕТВОРЕНИЯ САМОГО ИЗЫСКАННОГО ВКУСА
      </h3>
      <h5 className="featured__sub-title">
        МЫ ПРЕДЛАГАЕМ ТОЛЬКО СВЕЖИЕ ИНГРЕДИЕНТЫ И САМЫЕ ЛУЧШИЕ РЕЦЕПТЫ!
      </h5>
      <div className="featured__products-wrapper">
        {products && products.length > 1 && <ProductList products={products} />}
      </div>
    </section>
  );
}

export default FeaturedSection;
