import { gql, TypedDocumentNode } from "@apollo/client";
import { ProductHomeBanner } from "@/types/__generated__/graphql";
import Hero from "./hero-section/Hero";
import FeaturedSection from "./featured-section/FeaturedSection";
import CraftDescription from "./craft-description-section/CraftDescription";
import WhyUs from "./why-us-section/WhyUs";
import AboutUs from "./about-us-section/AboutUs";
import CustomizeInfo from "./customize-info-section/CustomizeInfo";
import GeneralFaq from "./general-faq-section/GeneralFaq";
import { query } from "@/ApolloClient";
import "./home.scss";

const GET_PRODUCT_HOME_BANNERS_QUERY: TypedDocumentNode<
  {
    productHomeBanners: ProductHomeBanner[];
  },
  { take: number }
> = gql`
  query ProductHomeBanners($take: Int) {
    productHomeBanners(take: $take) {
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
  const BANNER_NUM = 3;
  const { data } = await query({
    query: GET_PRODUCT_HOME_BANNERS_QUERY,
    variables: { take: BANNER_NUM },
  });

  return (
    <div className="home">
      <Hero banners={data?.productHomeBanners} />
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
