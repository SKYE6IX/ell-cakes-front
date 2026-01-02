import Hero from "./hero-section/Hero";
import FeaturedSection from "./featured-section/FeaturedSection";
import CraftDescription from "./craft-description-section/CraftDescription";
import WhyUs from "./why-us-section/WhyUs";
import AboutUs from "./about-us-section/AboutUs";
import CustomizeInfo from "./customize-info-section/CustomizeInfo";
import GeneralFaq from "./general-faq-section/GeneralFaq";
import "./home.scss";

async function Home() {
  return (
    <div className="home">
      <Hero />
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
