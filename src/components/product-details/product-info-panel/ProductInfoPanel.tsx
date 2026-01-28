"use client";
import { useReducer } from "react";
import { useReadQuery, QueryRef } from "@apollo/client/react";
import ProductFillingSelector from "../product-filling-selector/ProductFillingSelector";
import ProductVariantSelector from "../product-variant-selector/ProductVariantSelector";
import AddCustomisePhoto from "../product-customisations/AddCustomisePhoto";
import AddCustomiseInscription from "../product-customisations/AddCustomiseInscription";
import AddTopping from "../product-customisations/AddTopping";
import StorageInfo from "../storage-info/StorageInfo";
import IngredientsInfo from "../ingredients-info/IngredientsInfo";
import MixProductOption from "../mix-product-option/MixProductOption";
import AddToCartButton from "@/components/add-to-cart-btn/AddToCartButton";
import {
  Product,
  ProductFilling,
  MixBoxProduct,
} from "@/types/__generated__/graphql";
import { reducer } from "./productConfigurationReducer";
import "./product-info-panel.scss";

type ProductInfoPanelProps = {
  productQueryRef: QueryRef<{ product: Product }>;
  fillingsQueryRef: QueryRef<{ productFillings: ProductFilling[] }>;
  mixBoxQueryRef: QueryRef<{ mixBoxProduct: MixBoxProduct }>;
};

function ProductInfoPanel({
  productQueryRef,
  fillingsQueryRef,
  mixBoxQueryRef,
}: ProductInfoPanelProps) {
  const { data: productResult } = useReadQuery(productQueryRef);
  const { data: fillingsResult } = useReadQuery(fillingsQueryRef);

  // Picking the first item from the fillings and the and the first item from
  // the filling variants, works also for a product that only has a single filling.
  const product = productResult.product;
  const initialProductFilling = fillingsResult.productFillings[0];

  const [productConfiguration, dispatch] = useReducer(reducer, {
    selectedProductFilling: initialProductFilling,
    selectedProductVariant: initialProductFilling.variants![0],
    selectedTopping: null,
    customizations: null,
    compositions: null,
  });

  const customizationInput =
    productConfiguration.customizations?.map((customization) => {
      return {
        optionId: customization.optionId,
        valueId: customization.valueId,
        imagesId: customization.imagesId,
        inscriptionText: customization.inscriptionText,
      };
    }) ?? null;

  const customizationsExtraPrice =
    productConfiguration.customizations?.reduce(
      (acc, cus) => acc + (cus.extraPrice ?? 0),
      0
    ) ?? 0;

  const toppingExtraPrice =
    productConfiguration.selectedTopping?.extraPrice ?? 0;

  const selectedVariantPrice =
    productConfiguration.selectedProductVariant.price ?? 0;

  const totalAmout =
    customizationsExtraPrice + toppingExtraPrice + selectedVariantPrice;

  return (
    <div className="product-info-panel">
      <h3 className="product-info-panel__title" data-testid="product-title">
        {product.name}
      </h3>
      <p
        className="product-info-panel__description"
        data-testid="product-description"
      >
        {product.baseDescription}
      </p>

      {Number(product.fillingsCount) > 1 && (
        <ProductFillingSelector
          fillings={fillingsResult.productFillings}
          dispatch={dispatch}
        />
      )}

      <ProductVariantSelector
        variants={productConfiguration.selectedProductFilling.variants!}
        variantType={product.variantType!}
        dispatch={dispatch}
      />

      <MixProductOption
        mixBoxQueryRef={mixBoxQueryRef}
        selectedVariant={productConfiguration.selectedProductVariant}
        compositionsConfig={productConfiguration.compositions}
        dispatch={dispatch}
      />

      <div className="product-info-panel__customisations-wrapper">
        {product.customization && (
          <>
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

      <AddToCartButton
        parentComponent="product-details"
        productPrice={totalAmout}
        addToCartArgs={{
          productId: product.id,
          variantId: productConfiguration.selectedProductVariant.id,
          customizations: customizationInput,
          compositionOptions: productConfiguration.compositions,
          toppingOptionId: productConfiguration.selectedTopping?.id ?? null,
        }}
      />

      <StorageInfo />

      {initialProductFilling.hasDetails && (
        <IngredientsInfo
          productFilling={productConfiguration.selectedProductFilling}
        />
      )}

      <div className="product-info-panel__promotion-section">
        <h5 className="product-info-panel__promotion-text1">
          Первая покупка — еще вкуснее
        </h5>
        <h5 className="product-info-panel__promotion-text2">с 15% скидкой!</h5>
      </div>
    </div>
  );
}

export default ProductInfoPanel;
