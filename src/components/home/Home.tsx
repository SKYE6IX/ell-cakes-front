import { Suspense } from "react";
import Hero from "./hero-section/Hero";
import FeaturedSection from "./featured-section/FeaturedSection";
import CraftDescription from "./craft-description-section/CraftDescription";
import WhyUs from "./why-us-section/WhyUs";
import AboutUs from "./about-us-section/AboutUs";
import CustomizeInfo from "./customize-info-section/CustomizeInfo";
import GeneralFaq from "./general-faq-section/GeneralFaq";
import { GET_FEATURED_PRODUCTS_QUERY } from "./operation";
import { PreloadQuery } from "@/ApolloClient";
import { OrderDirection } from "@/types/__generated__/graphql";
import "./home.scss";

async function Home() {
  const TAKE_FILLINGS_NUM = 1;
  const TAKE_VARIANTS_NUM = 1;
  const TAKE_FEATURED_PRODUCTS = 8;

  return (
    <div className="home">
      <Hero />
      <PreloadQuery
        query={GET_FEATURED_PRODUCTS_QUERY}
        variables={{
          takeFeaturedProducts: TAKE_FEATURED_PRODUCTS,
          takeFillings: TAKE_FILLINGS_NUM,
          takeVariants: TAKE_VARIANTS_NUM,
          variantsOrderBy: [{ price: OrderDirection.Asc }],
          imagesOrderBy: [{ id: OrderDirection.Asc }],
        }}
      >
        {(queryRef) => (
          <Suspense>
            <FeaturedSection queryRef={queryRef} />
          </Suspense>
        )}
      </PreloadQuery>

      <CraftDescription />
      <WhyUs />
      <CustomizeInfo />
      <AboutUs />
      <GeneralFaq />
    </div>
  );
}

export default Home;
