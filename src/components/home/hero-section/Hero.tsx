"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import { wrap, useMotionValue, useMotionValueEvent } from "motion/react";
import { ProductHomeBanner } from "@/types/__generated__/graphql";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import Button from "@/components/button/Button";
import FallBackBanner from "./FallBackBanner";
import "./hero-section.scss";

type HeroProps = {
  banners: ProductHomeBanner[] | undefined;
};
interface HeroState {
  direction: 1 | -1;
  currentIndex: number;
  positions: number[];
}

function Hero({ banners }: HeroProps) {
  const isBannerData = banners && banners.length === 0;
  const SLIDES_LENGHT = banners?.length ?? 0;
  const DRAG_THRESSHOLD = 50;
  const dragX = useMotionValue(0);
  const dragXProgress = useMotionValue(0);
  const slideItemsRef = useRef<HTMLLIElement[]>([]);
  const [heroState, setHeroState] = useState<HeroState>({
    direction: 1,
    currentIndex: 0,
    positions: [],
  });

  useEffect(() => {
    const setSlidePosition = () => {
      if (!isBannerData) {
        const slideWidth = slideItemsRef.current[0].offsetWidth;
        const positionSlot = [
          1,
          slideWidth,
          -(slideItemsRef.current.length - 1) * slideWidth,
        ];
        setHeroState((prvState) => ({ ...prvState, positions: positionSlot }));
      }
    };
    setSlidePosition();
    window.addEventListener("resize", setSlidePosition);
    return () => window.removeEventListener("resize", setSlidePosition);
  }, [isBannerData]);

  useMotionValueEvent(dragX, "change", (latest) => {
    if (typeof latest === "number") {
      dragXProgress.set(latest);
    } else {
      dragXProgress.set(0);
    }
  });

  const changeSlide = (newDirection: 1 | -1) => {
    const nextIdx = wrap(
      0,
      SLIDES_LENGHT,
      heroState.currentIndex + newDirection
    );
    setHeroState((prvState) => ({
      ...prvState,
      direction: newDirection,
      currentIndex: nextIdx,
    }));
  };

  const isJumping = (positionIdx: number) =>
    (positionIdx === 1 && heroState.direction === -1) ||
    (positionIdx === SLIDES_LENGHT - 1 && heroState.direction === 1);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_THRESSHOLD) {
      changeSlide(-1);
    } else if (x >= DRAG_THRESSHOLD) {
      changeSlide(1);
    }
  };

  if (isBannerData || banners === undefined) return <FallBackBanner />;
  return (
    <section className="hero">
      <motion.ul
        className="hero__media"
        drag="x"
        style={{ x: dragX }}
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        onDragEnd={onDragEnd}
      >
        {banners.map((banner, i) => {
          const positonIndex = (i + heroState.currentIndex) % SLIDES_LENGHT;
          return (
            <motion.li
              className="hero__images-wrapper"
              key={banner.id}
              ref={(el) => {
                if (el) {
                  slideItemsRef.current[i] = el;
                }
              }}
              style={{ x: heroState.positions[positonIndex] }}
              initial={false}
              animate={{
                x: heroState.positions[positonIndex],
                opacity: positonIndex === 0 ? 1 : 0,
              }}
              transition={
                isJumping(positonIndex)
                  ? { duration: 0 }
                  : { ease: "easeInOut", duration: 0.3 }
              }
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
            </motion.li>
          );
        })}
      </motion.ul>

      <div className="hero__info">
        <h5 className="hero__product-badge">Хит продаж</h5>
        <h3 className="hero__product-name">
          {banners[heroState.currentIndex].product?.name}
        </h3>
        <p className="hero__product-description" data-testid="hero-banner-text">
          {banners[heroState.currentIndex].bannerText}
        </p>
        <Button textKey="ЗАказать" />
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
      </div>

      <ul className="hero__pagination-list">
        {banners.map((_, idx) => (
          <li
            key={idx}
            className={[
              "hero__pagination-item",
              heroState.currentIndex === idx ? "active" : "",
            ].join(" ")}
          />
        ))}
      </ul>
    </section>
  );
}

export default Hero;
