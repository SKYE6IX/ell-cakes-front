import React from "react";
import { gql, TypedDocumentNode } from "@apollo/client";
import { ProductHomeBanner } from "@/types/__generated__/graphql";
import Hero from "./hero-section/Hero";
import { createServerApolloClient } from "@/lib/apolloServer";
const GET_PRODUCT_HOME_BANNERS_QUERY: TypedDocumentNode<
  {
    productHomeBanners: ProductHomeBanner[];
  },
  Record<string, never>
> = gql`
  query ProductHomeBanners {
    productHomeBanners {
      id
      bannerText
      product {
        id
        slug
        name
        images {
          id
          image {
            id
            url
          }
        }
      }
    }
  }
`;
async function Home() {
  const client = createServerApolloClient();
  const { data } = await client.query({
    query: GET_PRODUCT_HOME_BANNERS_QUERY,
  });
  if (!data) return null;
  return (
    <div className="home">
      <Hero banners={data.productHomeBanners} />
    </div>
  );
}

export default Home;
