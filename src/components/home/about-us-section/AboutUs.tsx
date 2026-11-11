import Image from "next/image";
import aboutUsImage from "./about-us-section-image.jpg";
import Button from "@/components/button/Button";
import "./about-us.scss";

function AboutUs() {
  return (
    <section className="about-us">
      <div className="about-us__text-wrapper">
        <h3 className="about-us__heading">о нас</h3>
        <p className="about-us__text" data-testid="about-us-text">
          <span>
            Ell Cakes - кондитерская с 14-летней историей, более чем 20 000
            выполненных заказов и собственным взглядом на эстетику десертов.
          </span>
          <span>
            Ell Cakes - это 14 лет опыта, постоянное движение вперёд и любовь к
            своему делу. Это внимание к качеству, эстетике и деталям, за
            которыми всегда стоит нечто большее, чем просто десерт.
          </span>
        </p>
        <div className="about-us__btn-wrapper">
          <Button textKey="Подробнее" href="/about" />
        </div>
      </div>
      <div className="about-us__image-container">
        <Image
          src={aboutUsImage}
          alt="An image used on about us section"
          fill
          className="about-us__image"
          data-testid="about-us-image"
        />
      </div>
    </section>
  );
}

export default AboutUs;
