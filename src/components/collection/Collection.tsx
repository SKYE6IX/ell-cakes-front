import { Suspense } from "react";
import Image from "next/image";
import ProductListSkeleton from "../product-list/ProductListSkeleton";
import collectionDeliveryInfoImage from "./collection-delivery-section-image.png";
import CandleCakeIcon from "../icons/CandleCakeIcon";
import PresentIcon from "../icons/PresentIcon";
import SmileyIcon from "../icons/SmileyIcon";
import CollectionProducts from "./CollectionProducts";
import { getHeroSectionData } from "./hero-section-data";
import { ProductWhereInput } from "@/types/__generated__/graphql";
import ErrorBoundaryWrapper from "../ErrorBoundaryWrapper";
import "./collection.scss";

type CollectionProps = {
  categorySlug: string;
  where: ProductWhereInput;
};

function Collection({ categorySlug, where }: CollectionProps) {
  const heroSectionData = getHeroSectionData(categorySlug);

  return (
    <div className="collection">
      <section className="collection__hero-section">
        <div className="collection__media">
          {heroSectionData.images.map((image, i) => (
            <div
              className="collection__hero-image-container"
              key={i + heroSectionData.name}
            >
              <Image
                src={image}
                alt="Collection Image"
                fill
                className="collection__hero-image"
                data-testid="collection-hero-image"
              />
            </div>
          ))}
        </div>
        <div className="collection__text-wrapper">
          <h3
            className="collection__hero-heading"
            data-testid="collection-hero-heading"
          >
            {heroSectionData.name}
          </h3>
          <p
            className="collection__hero-text"
            data-testid="collection-hero-text"
          >
            {heroSectionData.description}
          </p>
        </div>
      </section>

      <section className="collection__product-list">
        <ErrorBoundaryWrapper>
          <Suspense fallback={<ProductListSkeleton />}>
            <CollectionProducts where={where} />
          </Suspense>
        </ErrorBoundaryWrapper>
      </section>

      <section className="collection__delivery-process">
        <div className="collection__delivery-info-text-wrapper">
          <h3
            className="collection__delivery-info-heading"
            data-testid="collection-delivery-info-heading"
          >
            Десерты с доставкой? Конечно!
          </h3>
          <ul className="collection__delivery-info-list">
            <li
              className="collection__delivery-info-item"
              data-testid="collection-delivery-info-item"
            >
              <span className="collection__delivery-info-icon">
                <CandleCakeIcon />
              </span>

              <div className="collection__delivery-info-item-inner">
                <h5 className="collection__delivery-info-item-heading">
                  Выбери свой десерт
                </h5>
                <p className="collection__delivery-info-item-text">
                  Для подарка, для друзей или просто для себя — выбери то, что
                  хочется прямо сейчас!
                </p>
              </div>
            </li>

            <li
              className="collection__delivery-info-item"
              data-testid="collection-delivery-info-item"
            >
              <span className="collection__delivery-info-icon">
                <PresentIcon />
              </span>

              <div className="collection__delivery-info-item-inner">
                <h5 className="collection__delivery-info-item-heading">
                  Назначь дату доставки
                </h5>
                <p className="collection__delivery-info-item-text">
                  Планируешь заранее или заказываешь в последний момент? Мы
                  доставляем 7 дней в неделю
                </p>
              </div>
            </li>

            <li
              className="collection__delivery-info-item"
              data-testid="collection-delivery-info-item"
            >
              <span className="collection__delivery-info-icon">
                <SmileyIcon />
              </span>

              <div className="collection__delivery-info-item-inner">
                <h5 className="collection__delivery-info-item-heading">
                  Жди с нетерпением!
                </h5>
                <p className="collection__delivery-info-item-text">
                  Мы аккуратно упакуем и отправим твой десерт так, чтобы он
                  приехал свежим и в идеальном виде.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="collection__delivery-info-image-container">
          <Image
            src={collectionDeliveryInfoImage}
            alt="An image used for giving information about delivery process"
            className="collection__delivery-info-image"
            fill
            data-testid="collection-delivery-info-image"
          />
        </div>
      </section>
    </div>
  );
}

export default Collection;
