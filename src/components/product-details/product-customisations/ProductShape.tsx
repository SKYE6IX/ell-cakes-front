import { useState } from "react";
import { Variants } from "motion";
import * as motion from "motion/react-client";
import ArrowDown from "@/components/icons/ArrowDown";
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

function ProductShape() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedShape, setSelectedShape] = useState("Круг");
  const handleSetOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleSetSelectedShape = (option: string) => {
    setSelectedShape(option);
    handleSetOpen();
  };

  return (
    <div className="product-shape">
      <h5 className="product-shape__label">Выбрать форму</h5>
      <div className="product-shape__selection-wrapper" onClick={handleSetOpen}>
        <span className="product-shape__selected-option">{selectedShape}</span>
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
        <li
          className="customisation__option"
          onClick={() => handleSetSelectedShape("Круг")}
        >
          Круг
        </li>
        <li
          className="customisation__option"
          onClick={() => handleSetSelectedShape("Сердце")}
        >
          Сердце
        </li>
      </motion.ul>
    </div>
  );
}

export default ProductShape;
