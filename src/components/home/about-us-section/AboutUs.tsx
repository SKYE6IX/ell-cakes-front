import React from "react";
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
            Кондитерская студия Ell Cakes – это разнообразие изысканных
            авторских тортов и пирожных, нежнейших капкейков и сказочных
            десертов исключительно ручной работы.
          </span>
          <span>
            Если Вы желаете оригинально и вкусно скрасить праздничный стол, будь
            то день рождения, юбилей, свадьба, годовщина, детский праздник либо
            другое мероприятие, или просто побаловать себя и близких вкуснейшими
            десертами, мы непременно поможем Вам и с огромным удовольствием
            выполним любой Ваш каприз!
          </span>
        </p>
        <div className="about-us__btn-wrapper">
          <Button textKey="Заказать" href="/collections" />
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
