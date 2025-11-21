import { useReducer } from "react";
import ProductFillingSelector from "../product-filling-selector/ProductFillingSelector";
import ProductVariantSelector from "../product-variant-selector/ProductVariantSelector";
import ProductShape from "../product-customisations/ProductShape";
import AddCustomisePhoto from "../product-customisations/AddCustomisePhoto";
import AddCustomiseInscription from "../product-customisations/AddCustomiseInscription";
import AddTopping from "../product-customisations/AddTopping";
import StorageInfo from "../storage-info/StorageInfo";
import IngredientsInfo from "../ingredients-info/IngredientsInfo";
import ProductReviews from "../product-reviews/ProductReviews";
import ProductFAQ from "../product-faq/ProductFAQ";
import MixProductOption from "../mix-product-option/MixProductOption";
import { Product } from "@/types/__generated__/graphql";
import { reducer } from "./productConfigurationReducer";
import "./product-info-panel.scss";

type ProductInfoPanelProps = {
  product: Product;
};

function ProductInfoPanel({ product }: ProductInfoPanelProps) {
  // Picking the first item from the fillings and the and the first item from
  // the filling variants, works also for a product that only has a single filling.
  const initialProductFilling = product.fillings![0];
  const [productConfiguration, dispatch] = useReducer(reducer, {
    selectedProductFilling: initialProductFilling,
    selectedProductVariant: initialProductFilling.variants![0],
    selectedTopping: null,
    customizations: null,
    compositions: null,
  });

  return (
    <div className="product-info-panel">
      <div className="product-info-panel__top-section">
        <div className="product-info-panel__title-wrapper">
          <h3 className="product-info-panel__title">{product.name}</h3>
        </div>
        <p className="product-info-panel__description">
          {product.baseDescription}
        </p>

        {Number(product.fillingsCount) > 1 && (
          <ProductFillingSelector
            fillings={product.fillings!}
            dispatch={dispatch}
          />
        )}

        <ProductVariantSelector
          variants={productConfiguration.selectedProductFilling.variants!}
          variantType={product.variantType!}
          dispatch={dispatch}
        />

        {product.type === "mixed_box" && (
          <MixProductOption
            selectedVariant={productConfiguration.selectedProductVariant}
            compositionProducts={product.mixBoxCompositions!}
            compositionsConfig={productConfiguration.compositions}
            dispatch={dispatch}
          />
        )}

        <div className="product-info-panel__customisations-wrapper">
          {product.customization && (
            <>
              <ProductShape
                customOptions={product.customization.customOptions!}
                dispatch={dispatch}
              />
              <AddCustomisePhoto
                customOptions={product.customization.customOptions!}
                dispatch={dispatch}
              />
              <AddCustomiseInscription
                customOptions={product.customization.customOptions!}
                dispatch={dispatch}
              />
            </>
          )}
          {product.topping && (
            <AddTopping
              toppingOptions={product.topping.options!}
              dispatch={dispatch}
            />
          )}
        </div>

        <button className="product-info-panel__add-to-cart">
          <span className="product-info-panel__add-to-cart-text">
            Добавить в корзину
          </span>
          <span className="product-info-panel__unit-price">
            {productConfiguration.selectedProductVariant.price} ₽
          </span>
        </button>
      </div>

      <div className="product-info-panel__bottom-section">
        <StorageInfo />

        <IngredientsInfo
          productFilling={productConfiguration.selectedProductFilling}
        />

        <div className="product-info-panel__promotion-section">
          <h5 className="product-info-panel__promotion-text1">
            Первая покупка — еще вкуснее 
          </h5>
          <h5 className="product-info-panel__promotion-text2">
            с 15% скидкой!
          </h5>
        </div>

        <ProductReviews />

        <ProductFAQ />
      </div>
    </div>
  );
}

export default ProductInfoPanel;
