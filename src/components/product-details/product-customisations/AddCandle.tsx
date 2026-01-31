import { useState, useRef, useEffect } from "react";
import { Variants } from "motion";
import * as motion from "motion/react-client";
import CloseIcon from "@/components/icons/CloseIcon";
import { CustomiseComponentProps } from "./sharedType";
import { CustomizationOptionValue } from "@/types/__generated__/graphql";
import "./product-customisations.scss";

const variant: Variants = {
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

function AddCandle({ customOptions, dispatch }: CustomiseComponentProps) {
  const dropDownRef = useRef<HTMLDivElement>(null);

  const customCandle = customOptions.find(
    (option) => option.name?.toUpperCase() === "CANDLE"
  );
  const optionId = customCandle?.id ?? "";

  const [openDropDown, setOpenDropDown] = useState(false);
  const [selectedValue, setSelectedvalue] = useState("");

  useEffect(() => {
    const onClickOutsideRef = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpenDropDown(false);
      }
    };
    const onEscapeKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropDown(false);
      }
    };

    if (openDropDown) {
      document.addEventListener("mousedown", onClickOutsideRef);
      document.addEventListener("keydown", onEscapeKeyPress);
    }

    return () => {
      document.removeEventListener("mousedown", onClickOutsideRef);
      document.removeEventListener("keydown", onEscapeKeyPress);
    };
  }, [openDropDown]);

  const handleSetOpenDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  const handleSelectOption = (option: CustomizationOptionValue) => {
    setSelectedvalue(option.value!);
    dispatch({
      type: "add_customization",
      payload: {
        optionId: optionId,
        valueId: option.id,
        extraPrice: option.extraPrice!,
      },
    });
    handleSetOpenDropDown();
  };

  const removeCustomization = () => {
    setSelectedvalue("");
    dispatch({ type: "remove_customization", payload: { optionId } });
  };

  if (!customCandle) return null;

  return (
    <div className="add-customise-candle" ref={dropDownRef}>
      {selectedValue ? (
        <div className="add-customise-candle__selection">
          <p className="add-customise-candle__selected-value">
            <span className="icon">🎂</span>
            <span className="value">{selectedValue}</span>
          </p>
          <button
            className="add-customise-candle__selection-btn"
            onClick={removeCustomization}
          >
            <CloseIcon />
          </button>
        </div>
      ) : (
        <>
          <button
            className="add-customise-candle__button"
            onClick={handleSetOpenDropDown}
          >
            добавить Свеча
          </button>

          <motion.ul
            className="customisation__drop-down candle"
            initial={false}
            animate={openDropDown ? "open" : "close"}
            variants={variant}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {customCandle.customValues?.map((option) => (
              <li
                className="customisation__option"
                key={option.id}
                onClick={() => handleSelectOption(option)}
              >
                🎂 {option.value}
              </li>
            ))}
          </motion.ul>
        </>
      )}
    </div>
  );
}

export default AddCandle;
