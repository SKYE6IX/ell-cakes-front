import Hero from "./hero-section/Hero";
import FeaturedSection from "./featured-section/FeaturedSection";
import CraftDescription from "./craft-description-section/CraftDescription";
import WhyUs from "./why-us-section/WhyUs";
import AboutUs from "./about-us-section/AboutUs";
import CustomizeInfo from "./customize-info-section/CustomizeInfo";
import GeneralFaq from "./general-faq-section/GeneralFaq";
import "./home.scss";
import Reviews from "./reviews/Reviews";
import CustomRequest from "./custom-request/CustomRequest";

async function Home() {
  return (
    <div className="home">
      <Hero />
      <FeaturedSection />
      <CustomRequest />
      <CraftDescription />
      <WhyUs />
      <CustomizeInfo />
      <AboutUs />
      <GeneralFaq />
      <Reviews />
    </div>
  );
}

export default Home;
