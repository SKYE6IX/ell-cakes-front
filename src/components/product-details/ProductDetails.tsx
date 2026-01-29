import { Suspense } from "react";
import ProductGallery from "./product-gallery/ProductGallery";
import ProductInfoPanel from "./product-info-panel/ProductInfoPanel";
import SimilarProducts from "./SimilarProducts";
import {
  ProductMediaSkeleton,
  ProductPanelSkeleton,
} from "./skeleton/ProductDetailsSkeleton";
import { PreloadQuery } from "@/ApolloClient";
import {
  GET_PRODUCT_IMAGES_QUERY,
  GET_PRODUCT_VIDEO_QUERY,
  GET_PRODUCT_QUERY,
  GET_PRODUCT_FILLINGS_QUERY,
  GET_MIX_BOX_PRODUCT_QUERY,
} from "./operations";
import { OrderDirection } from "@/types/__generated__/graphql";
import "./product-details.scss";

function ProductDetails({ productSlug }: { productSlug: string }) {
  return (
    <div className="product-details">
      <div className="product-details__product-wrapper">
        <section className="product-details__gallery-section">
          <PreloadQuery
            query={GET_PRODUCT_IMAGES_QUERY}
            variables={{
              where: { product: { slug: { equals: productSlug } } },
              orderImageBy: [{ id: OrderDirection.Asc }],
            }}
          >
            {(imagesQueryRef) => (
              <PreloadQuery
                query={GET_PRODUCT_VIDEO_QUERY}
                variables={{ where: { product: { slug: productSlug } } }}
              >
                {(videoQueryRef) => (
                  <Suspense fallback={<ProductMediaSkeleton />}>
                    <ProductGallery
                      imagesQueryRef={imagesQueryRef}
                      videoQueryRef={videoQueryRef}
                    />
                  </Suspense>
                )}
              </PreloadQuery>
            )}
          </PreloadQuery>
        </section>

        <section className="product-details__product-info-section">
          <PreloadQuery
            query={GET_PRODUCT_QUERY}
            variables={{
              where: { slug: productSlug },
              orderToppingOptionBy: [{ extraPrice: OrderDirection.Asc }],
            }}
          >
            {(productQueryRef) => (
              <PreloadQuery
                query={GET_PRODUCT_FILLINGS_QUERY}
                variables={{
                  where: {
                    products: { some: { slug: { equals: productSlug } } },
                  },
                  orderVariantsBy: [{ price: OrderDirection.Asc }],
                }}
              >
                {(fillingsQueryRef) => (
                  <PreloadQuery
                    query={GET_MIX_BOX_PRODUCT_QUERY}
                    variables={{ where: { product: { slug: productSlug } } }}
                  >
                    {(mixBoxQueryRef) => (
                      <Suspense fallback={<ProductPanelSkeleton />}>
                        <ProductInfoPanel
                          productQueryRef={productQueryRef}
                          fillingsQueryRef={fillingsQueryRef}
                          mixBoxQueryRef={mixBoxQueryRef}
                        />
                      </Suspense>
                    )}
                  </PreloadQuery>
                )}
              </PreloadQuery>
            )}
          </PreloadQuery>
        </section>
      </div>
      <SimilarProducts productSlug={productSlug} />
    </div>
  );
}

export default ProductDetails;
