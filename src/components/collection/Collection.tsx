import { Suspense } from "react";
import ProductListSkeleton from "../product-list/ProductListSkeleton";
import collectionDeliveryInfoImage from "./collection-delivery-section-image.png";
import CandleCakeIcon from "../icons/CandleCakeIcon";
import PresentIcon from "../icons/PresentIcon";
import SmileyIcon from "../icons/SmileyIcon";
import CollectionProducts from "./CollectionProducts";
import CustomImage from "../custom-image/CustomImage";
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
          {heroSectionData?.media?.map((m, i) => (
            <div className="collection__hero-image-container" key={i + heroSectionData.name}>
              {!m.isVideo ? (
                <CustomImage
                  src={m.href}
                  alt="Collection Image"
                  fill
                  className="collection__hero-image"
                  data-testid="collection-hero-image"
                />
              ) : (
                <video
                  className="collection__hero-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  webkit-playsinline="true"
                  controls={false}
                  disablePictureInPicture
                  disableRemotePlayback
                >
                  <source src={m.href.toString()} />
                </video>
              )}
            </div>
          ))}
        </div>
        <div className="collection__text-wrapper">
          <h3 className="collection__hero-heading" data-testid="collection-hero-heading">
            {heroSectionData?.name}
          </h3>
          <p className="collection__hero-text" data-testid="collection-hero-text">
            {heroSectionData?.description}
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
            Заказ и доставка в три шага
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
                <h5 className="collection__delivery-info-item-heading">Выберите десерт</h5>
                <p className="collection__delivery-info-item-text">
                  Огромный выбор десертов для любого повода — от уютного чаепития до масштабного
                  торжества.
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
                <h5 className="collection__delivery-info-item-heading">Назначьте дату</h5>
                <p className="collection__delivery-info-item-text">
                  Работаем без выходных. Вы можете заказать торт как за неделю, так и в срочном
                  порядке.
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
                <h5 className="collection__delivery-info-item-heading">Ожидайте курьера</h5>
                <p className="collection__delivery-info-item-text">
                  Мы отвечаем за сохранность: аккуратная упаковка и доставка в идеальном виде
                  гарантированы.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="collection__delivery-info-image-container">
          <CustomImage
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
