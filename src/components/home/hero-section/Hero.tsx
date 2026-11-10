"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client/react";
import { motion, AnimatePresence } from "motion/react";
import CustomImage from "@/components/custom-image/CustomImage";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import { GET_PRODUCT_HOME_BANNERS_QUERY } from "../operation";
import { defaultBanner } from "./default-banner";
import "./hero-section.scss";

const variants = {
  enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0.4 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0.4 }),
};

function Hero() {
  const BANNER_NUM = 3;
  const { data } = useQuery(GET_PRODUCT_HOME_BANNERS_QUERY, {
    variables: { take: BANNER_NUM },
  });

  const fetchBanners = data?.productHomeBanners;
  const banners =
    fetchBanners && fetchBanners.length > 0 ? [defaultBanner, ...fetchBanners] : [defaultBanner];
  const totalBanners = banners.length;
  const wrap = (i: number) => ((i % totalBanners) + totalBanners) % totalBanners;

  const isSliderActive = totalBanners > 1;

  const autoSlideId = useRef<NodeJS.Timeout | null>(null);
  const [autoSlideFlag, setAutoSlideFlag] = useState(false);
  const [[currentSlide, direction], setCurrentSlide] = useState([0, 0]);
  const activeIndex = wrap(currentSlide);
  const banner = banners[activeIndex];

  const paginate = useCallback((direction: number) => {
    setCurrentSlide(([p]) => [p + direction, direction]);
  }, []);

  const changeSlide = (direction: 1 | -1) => {
    if (autoSlideId.current) {
      clearInterval(autoSlideId.current);
      setAutoSlideFlag((prvState) => !prvState);
    }
    paginate(direction);
  };

  useEffect(() => {
    if (isSliderActive) {
      autoSlideId.current = setInterval(() => {
        paginate(1);
      }, 7000);
    }

    return () => {
      if (autoSlideId.current) {
        clearInterval(autoSlideId.current);
      }
    };
  }, [paginate, autoSlideFlag, isSliderActive]);

  return (
    <section className="hero">
      <div className="hero__slider">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            className="hero__slider-item"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 32 },
              opacity: { duration: 0.25 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, { offset, velocity }) => {
              const power = Math.abs(offset.x) * velocity.x;
              if (offset.x < -80 || power < -8000) paginate(1);
              else if (offset.x > 80 || power > 8000) paginate(-1);
            }}
          >
            <div className="hero__image-container">
              {banner.product?.images && (
                <CustomImage
                  src={banner.product?.images[0].image?.url || ""}
                  alt={banner.product?.name ?? "Hero Image"}
                  fill
                  className="hero__product-image"
                  data-testid="hero-banner-image"
                  preload
                />
              )}
            </div>

            <div className="hero__image-container">
              {banner.product?.images && (
                <CustomImage
                  src={banner.product?.images[1]?.image?.url || ""}
                  alt={banner.product?.name ?? "Hero Image"}
                  fill
                  className="hero__product-image"
                  data-testid="hero-banner-image"
                  preload
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero__info">
        <div className="hero__info-text-wrapper">
          {activeIndex !== 0 && <h5 className="hero__product-badge">Хит продаж</h5>}
          <h3 className="hero__product-name">{banners[activeIndex].product?.name}</h3>
          <p className="hero__product-description" data-testid="hero-banner-text">
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

        {/* Controller */}
        {isSliderActive && (
          <>
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

            {/* Paginations */}
            <ul className="hero__pagination-list">
              {banners.map((_, idx) => (
                <li
                  key={idx}
                  className={["hero__pagination-item", activeIndex === idx ? "active" : ""].join(
                    " ",
                  )}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

export default Hero;
