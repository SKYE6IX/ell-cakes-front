import React from "react";
import { gql, TypedDocumentNode } from "@apollo/client";
import {
  FeaturedProduct,
  ProductVariantOrderByInput,
  OrderDirection,
  ProductImageOrderByInput,
} from "@/types/__generated__/graphql";
import ProductList from "@/components/product-list/ProductList";
import { query } from "@/ApolloClient";
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
    imagesOrderBy: ProductImageOrderByInput[];
  }
> = gql`
  query FeaturedProducts(
    $takeFeaturedProducts: Int
    $takeFillings: Int
    $takeVariants: Int
    $variantsOrderBy: [ProductVariantOrderByInput!]!
    $imagesOrderBy: [ProductImageOrderByInput!]!
  ) {
    featuredProducts(take: $takeFeaturedProducts) {
      id
      products {
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
        images(orderBy: $imagesOrderBy) {
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

  const { data } = await query({
    query: GET_FEATURED_PRODUCTS_QUERY,
    variables: {
      takeFeaturedProducts: TAKE_FEATURED_PRODUCTS,
      takeFillings: TAKE_FILLINGS_NUM,
      takeVariants: TAKE_VARIANTS_NUM,
      variantsOrderBy: [{ price: OrderDirection.Asc }],
      imagesOrderBy: [{ id: OrderDirection.Asc }],
    },
  });

  const products = data?.featuredProducts[0].products;

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
