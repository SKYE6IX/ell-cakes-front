"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReadQuery, QueryRef } from "@apollo/client/react";
import { ProductHomeBanner } from "@/types/__generated__/graphql";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import FallBackBanner from "./FallBackBanner";
import "./hero-section.scss";

type HeroProps = {
  queryRef: QueryRef<{ productHomeBanners: ProductHomeBanner[] }>;
};

function updateSlides(container: HTMLUListElement) {
  const scrollWidth = container.scrollWidth;
  const scrollLeft = container.scrollLeft;
  const containerWidth = container.offsetWidth;
  const slides = container.children;

  if (scrollLeft <= containerWidth) {
    container.prepend(slides[slides.length - 1]);
    container.scrollLeft = scrollLeft + containerWidth;
  }

  if (scrollWidth - scrollLeft <= containerWidth) {
    container.append(slides[0]);
    container.scrollLeft = scrollLeft - containerWidth;
  }
}

function Hero({ queryRef }: HeroProps) {
  const { data } = useReadQuery(queryRef);
  const banners = data.productHomeBanners;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLUListElement>(null);
  const slideItemRefs = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const container = containerRef.current;
    if (!container) return;

    updateSlides(container);
    const handleScroll = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        updateSlides(container);
      }, 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSlide = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleSlide) {
          const newIdx = slideItemRefs.current?.indexOf(
            visibleSlide.target as HTMLLIElement
          );
          if (newIdx !== -1) {
            setActiveIndex(newIdx);
          }
        }
      },
      {
        root: container,
        threshold: 0.9,
      }
    );

    slideItemRefs.current?.forEach((slideItem) => observer.observe(slideItem));
    container.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  if (banners === undefined || banners.length === 0) return <FallBackBanner />;

  function changeSlide(newDirection: 1 | -1) {
    const container = containerRef.current;
    if (!container) return;

    const slides = container.children;
    let newSlideIndex;
    if (newDirection === 1) {
      newSlideIndex = 0;
    } else {
      newSlideIndex = slides.length - 1;
    }
    const nextSlide = slides[newSlideIndex] as HTMLLIElement;

    container.scrollTo({
      left: nextSlide.offsetLeft,
      behavior: "smooth",
    });
  }
  return (
    <section className="hero">
      <ul className="hero__media" ref={containerRef}>
        {banners.map((banner, i) => (
          <li
            className="hero__images-wrapper"
            id={`id-${i}`}
            key={banner.id}
            ref={(el) => {
              if (el) {
                slideItemRefs.current[i] = el;
              }
            }}
          >
            <div className="hero__image-container">
              <Image
                src={banner.product?.images![0].image?.url || ""}
                alt="Mock Image"
                fill
                className="hero__product-image"
                data-testid="hero-banner-image"
              />
            </div>
            <div className="hero__image-container">
              <Image
                src={banner.product?.images![1].image?.url || ""}
                alt="Mock Image"
                fill
                className="hero__product-image"
                data-testid="hero-banner-image"
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="hero__info">
        <div className="hero__info-text-wrapper">
          <h5 className="hero__product-badge">Хит продаж</h5>
          <h3 className="hero__product-name">
            {banners[activeIndex].product?.name}
          </h3>
          <p
            className="hero__product-description"
            data-testid="hero-banner-text"
          >
            {banners[activeIndex].bannerText}
          </p>

          <Link
            href={`/product/${banners[activeIndex].product?.slug}`}
            className="hero__product-link"
          >
            ЗАказать
          </Link>
        </div>

        <div className="hero__carousel-control">
          <button
            className="hero__carousel-btn"
            onClick={() => changeSlide(-1)}
          >
            <ArrowLeftIcon />
          </button>
          <button className="hero__carousel-btn" onClick={() => changeSlide(1)}>
            <ArrowRightIcon />
          </button>
        </div>

        <ul className="hero__pagination-list">
          {banners.map((_, idx) => (
            <li
              key={idx}
              className={[
                "hero__pagination-item",
                activeIndex === idx ? "active" : "",
              ].join(" ")}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Hero;
