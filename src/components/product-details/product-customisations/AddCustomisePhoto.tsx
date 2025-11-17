import { useState } from "react";
import * as motion from "motion/react-client";
import { variant } from "./ProductShape";
import PhotoIcon from "@/components/icons/PhotoIcon";
import { CustomiseComponentProps } from "./sharedType";
import "./product-customisations.scss";

function AddCustomisePhoto({ customOptions }: CustomiseComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleSetOpen = () => {
    setIsOpen(!isOpen);
  };
  const addCustomPhoto = customOptions.find(
    (option) => option.name?.toUpperCase() === "PHOTO"
  );

  if (!addCustomPhoto) return null;
  return (
    <div className="add-customise-photo">
      <button className="add-customise-photo__button" onClick={handleSetOpen}>
        добавить фото
      </button>
      <motion.ul
        className="customisation__drop-down photo"
        initial={false}
        animate={isOpen ? "open" : "close"}
        variants={variant}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {addCustomPhoto.customValues?.map((customValue) => (
          <li className="customisation__option" key={customValue.id}>
            <label
              htmlFor={
                Number(customValue.value) > 1
                  ? "add-multiple-image"
                  : "add-single-image"
              }
              className="photo-option__label"
            >
              <div className="photo-option__count-wrapper">
                <PhotoIcon />
                <span className="photo-option__count">
                  {customValue.value}x
                </span>
              </div>
              <span className="photo-option__cost">
                +{customValue.extraPrice}
              </span>
            </label>
            <input
              type="file"
              id={
                Number(customValue.value) > 1
                  ? "add-multiple-image"
                  : "add-single-image"
              }
              className="photo-option__selection"
              max={Number(customValue.value)}
              multiple={Number(customValue.value) > 1}
            />
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
export default AddCustomisePhoto;
