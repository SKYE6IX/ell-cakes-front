import { gql, TypedDocumentNode } from "@apollo/client";
import { ProductHomeBanner } from "@/types/__generated__/graphql";
import { createServerApolloClient } from "@/lib/apolloServer";
import Hero from "./hero-section/Hero";
import FeaturedSection from "./featured-section/FeaturedSection";
import CraftDescription from "./craft-description-section/CraftDescription";
import WhyUs from "./why-us-section/WhyUs";
import AboutUs from "./about-us-section/AboutUs";
import CustomizeInfo from "./customize-info-section/CustomizeInfo";
import GeneralFaq from "./general-faq-section/GeneralFaq";
import "./home.scss";

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

  return (
    <div className="home">
      {data && data.productHomeBanners.length !== 0 && (
        <Hero banners={data.productHomeBanners} />
      )}
      <FeaturedSection />
      <CraftDescription />
      <WhyUs />
      <CustomizeInfo />
      <AboutUs />
      <GeneralFaq />
    </div>
  );
}

export default Home;
