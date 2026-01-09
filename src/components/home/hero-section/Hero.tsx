"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { wrap } from "motion/react";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import { GET_PRODUCT_HOME_BANNERS_QUERY } from "../operation";
import { defaultBanner } from "./default-banner";
import "./hero-section.scss";

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

function Hero() {
  const BANNER_NUM = 3;
  const { data } = useQuery(GET_PRODUCT_HOME_BANNERS_QUERY, {
    variables: { take: BANNER_NUM },
  });

  const fetchBanners = data?.productHomeBanners;

  const banners = fetchBanners
    ? [defaultBanner, ...fetchBanners]
    : [defaultBanner];

  const containerRef = useRef<HTMLUListElement>(null);
  const slideItemRefs = useRef<HTMLLIElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const container = containerRef.current;
    const sliderItems = slideItemRefs.current;

    if (!container || !sliderItems || sliderItems.length < 4) {
      return;
    }

    updateSlides(container);
    const handleScroll = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        updateSlides(container);
      }, 50);
    };

    const observer = new IntersectionObserver((entries) => {
      const visibleSlide = entries.filter((entry) => entry.isIntersecting)[0];
      if (visibleSlide) {
        const nextIndex = sliderItems.indexOf(
          visibleSlide.target as HTMLLIElement
        );
        if (nextIndex !== -1) {
          setActiveIndex(nextIndex);
        }
      }
    });

    sliderItems.forEach((slideItem) => observer.observe(slideItem));
    container.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [fetchBanners]);

  function changeSlide(newDirection: 1 | -1) {
    const container = containerRef.current;
    const slides = slideItemRefs.current;

    if (!container || !slides) return;

    setTimeout(() => {
      const nextSlideIndex = wrap(0, slides.length, activeIndex - newDirection);

      setActiveIndex(nextSlideIndex);

      const nextSlide = slides[nextSlideIndex] as HTMLLIElement;

      container.scrollTo({
        left: nextSlide.offsetLeft,
        behavior: "smooth",
      });
    }, 150);
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
                alt={banner.product?.name ?? ""}
                fill
                className="hero__product-image"
                data-testid="hero-banner-image"
                preload
              />
            </div>
            <div className="hero__image-container">
              <Image
                src={banner.product?.images![1].image?.url || ""}
                alt={banner.product?.name ?? ""}
                fill
                className="hero__product-image"
                data-testid="hero-banner-image"
                preload
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="hero__info">
        <div className="hero__info-text-wrapper">
          {activeIndex !== 0 && (
            <h5 className="hero__product-badge">Хит продаж</h5>
          )}
          <h3 className="hero__product-name">
            {banners[activeIndex].product?.name}
          </h3>
          <p
            className="hero__product-description"
            data-testid="hero-banner-text"
          >
            {banners[activeIndex].bannerText}
          </p>

          {activeIndex === 0 ? (
            <Link href="/collections" className="hero__product-link">
              ЗАказать
            </Link>
          ) : (
            <Link
              href={`/product/${banners[activeIndex].product?.slug}`}
              className="hero__product-link"
            >
              ЗАказать
            </Link>
          )}
        </div>

        <div className="hero__carousel-control">
          <button
            className="hero__carousel-btn"
            onClick={() => changeSlide(-1)}
            disabled={fetchBanners === undefined}
          >
            <ArrowLeftIcon />
          </button>
          <button
            className="hero__carousel-btn"
            onClick={() => changeSlide(1)}
            disabled={fetchBanners === undefined}
          >
            <ArrowRightIcon />
          </button>
        </div>

        {fetchBanners && (
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
        )}
      </div>
    </section>
  );
}

export default Hero;
