import { useState, useCallback } from "react";
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
import {
  Product,
  ProductFilling,
  ProductVariant,
  CustomizationInput,
  ToppingOption,
} from "@/types/__generated__/graphql";
import "./product-info-panel.scss";

type ProductInfoPanelProps = {
  product: Product;
};
interface ProductConfiguration {
  selectedProductFilling: ProductFilling;
  selectedProductVariant: ProductVariant;
  selectedTopping: ToppingOption | null;
}
export interface SetProductConfigurationArgs {
  key: keyof ProductConfiguration;
  configuration: Partial<ProductConfiguration>;
}

function ProductInfoPanel({ product }: ProductInfoPanelProps) {
  // Picking the first item from the fillings and the and the first item from
  // the filling variants, works also for a product that only has a single filling.
  const initialProductFilling = product.fillings![0];

  const [productConfiguration, setProductConfiguration] =
    useState<ProductConfiguration>({
      selectedProductFilling: initialProductFilling,
      selectedProductVariant: initialProductFilling.variants![0],
      selectedTopping: null,
    });
  const handleSetProductConfiguration = useCallback(
    ({ key, configuration }: SetProductConfigurationArgs) => {
      setProductConfiguration((prvState) => ({
        ...prvState,
        [key]: configuration[key],
      }));
    },
    []
  );

  const [selectedCustomization, setSelectedCustomization] = useState<
    CustomizationInput[] | null
  >(null);
  const handleSetSelectedCustomization = (
    customization: CustomizationInput
  ) => {
    const existCustomization = selectedCustomization?.find(
      (cus) => cus.optionId === customization.optionId
    );
    if (existCustomization) {
      setSelectedCustomization((prvState) => {
        if (prvState) {
          return prvState.map((obj) => {
            if (obj.optionId === existCustomization.optionId) {
              return { ...obj, valueId: customization.valueId };
            }
            return obj;
          });
        }
        return prvState;
      });
    } else {
      setSelectedCustomization((prvState) => {
        if (!prvState) {
          return [
            {
              optionId: customization.optionId,
              valueId: customization.valueId,
            },
          ];
        } else if (prvState) {
          return [
            ...prvState,
            {
              optionId: customization.optionId,
              valueId: customization.valueId,
            },
          ];
        }
        return prvState;
      });
    }
  };

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
            setProductConfiguration={handleSetProductConfiguration}
          />
        )}

        <ProductVariantSelector
          variants={productConfiguration.selectedProductFilling.variants!}
          variantType={product.variantType!}
          setProductConfiguration={handleSetProductConfiguration}
        />

        <div className="product-info-panel__customisations-wrapper">
          {product.customization && (
            <>
              <ProductShape
                customOptions={product.customization.customOptions!}
                setSelectedCustomization={handleSetSelectedCustomization}
              />
              <AddCustomisePhoto
                customOptions={product.customization.customOptions!}
                setSelectedCustomization={handleSetSelectedCustomization}
              />
              <AddCustomiseInscription
                customOptions={product.customization.customOptions!}
                setSelectedCustomization={handleSetSelectedCustomization}
              />
            </>
          )}
          {product.topping && (
            <AddTopping
              toppingOptions={product.topping.options!}
              setProductConfiguration={handleSetProductConfiguration}
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
        <MixProductOption />
      </div>

      <div className="product-info-panel__bottom-section">
        <StorageInfo />

        <IngredientsInfo />

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
