import { Dispatch, useState } from "react";
import CustomImage from "@/components/custom-image/CustomImage";
import { ProductFilling } from "@/types/__generated__/graphql";
import type { ACTIONTYPE } from "../product-info-panel/productConfigurationReducer";
import "./product-filling-selector.scss";

type ProductFillingSelectorProps = {
  fillings: ProductFilling[];
  dispatch: Dispatch<ACTIONTYPE>;
};

function ProductFillingSelector({
  fillings,
  dispatch,
}: ProductFillingSelectorProps) {
  const [selectedFillingId, setSelectedFillinId] = useState(fillings[0].id);

  const handleSetSelectedFilling = (newFilling: ProductFilling) => {
    setSelectedFillinId(newFilling.id);
    dispatch({ type: "set_selected_product_filling", payload: newFilling });
  };

  const getFillingDescription = (fillingId: string) => {
    const filling = fillings.find((filling) => filling.id === fillingId);
    return filling?.description;
  };

  return (
    <div className="product-filling-selector">
      <ul className="product-filling-selector__list">
        {fillings.map((filling) => (
          <li
            key={filling.id}
            className={[
              "product-filling-selector__item",
              selectedFillingId === filling.id ? "selected" : " ",
            ].join(" ")}
            onClick={() => handleSetSelectedFilling(filling)}
            data-testid="product-filling-item"
          >
            <div className="product-filling-selector__image-container">
              {filling.image_icon?.url === undefined ? (
                <div className="product-filling-selector__fallback-icon-wrapper">
                  <span className="product-filling-selector__fallback-icon">
                    {filling.name?.substring(0, 2)}
                  </span>
                </div>
              ) : (
                <CustomImage
                  src={filling.image_icon.url}
                  alt="Mock Image"
                  fill
                  className="product-filling-selector__image"
                  data-testid="product-filling-image"
                />
              )}
            </div>
            <h5 className="product-filling-selector__name">{filling.name}</h5>
          </li>
        ))}
      </ul>
      <p className="product-filling-selector__description">
        {getFillingDescription(selectedFillingId)}
      </p>
    </div>
  );
}
export default ProductFillingSelector;
