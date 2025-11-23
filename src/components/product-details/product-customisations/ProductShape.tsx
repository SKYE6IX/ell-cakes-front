import { useState } from "react";
import { Variants } from "motion";
import * as motion from "motion/react-client";
import ArrowDown from "@/components/icons/ArrowDown";
import { CustomiseComponentProps } from "./sharedType";
import { CustomizationOptionValue } from "@/types/__generated__/graphql";
import "./product-customisations.scss";

export const variant: Variants = {
  open: {
    translateY: 0,
    visibility: "visible",
    opacity: 1,
  },
  close: {
    translateY: -30,
    opacity: 0,
    visibility: "hidden",
  },
};

function ProductShape({ customOptions, dispatch }: CustomiseComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const productShapes = customOptions.find(
    (option) => option.name?.toUpperCase() === "SHAPE"
  );

  const optionId = productShapes?.id ?? "";
  const [selectedShape, setSelectedShape] = useState(
    productShapes?.customValues![0]
  );

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSetSelectedShape = (option: CustomizationOptionValue) => {
    setSelectedShape(option);
    handleSetIsOpen();
    dispatch({
      type: "add_customization",
      payload: { optionId, valueId: option.id },
    });
  };

  if (!productShapes) return null;
  return (
    <div className="product-shape">
      <h5 className="product-shape__label">Выбрать форму</h5>
      <div
        className="product-shape__selection-wrapper"
        onClick={handleSetIsOpen}
      >
        <span className="product-shape__selected-option">
          {selectedShape?.value}
        </span>
        <span
          className={[
            "product-shape__selection-icon",
            isOpen ? "active" : "",
          ].join(" ")}
        >
          <ArrowDown />
        </span>
      </div>
      <motion.ul
        className="customisation__drop-down shape"
        initial={false}
        animate={isOpen ? "open" : "close"}
        variants={variant}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {productShapes.customValues?.map((customValue) => (
          <li
            key={customValue.id}
            className="customisation__option"
            onClick={() => handleSetSelectedShape(customValue)}
          >
            {customValue.value}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

export default ProductShape;
