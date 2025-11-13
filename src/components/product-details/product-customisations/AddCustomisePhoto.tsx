import { useState } from "react";
import * as motion from "motion/react-client";
import { variant } from "./ProductShape";
import PhotoIcon from "@/components/icons/PhotoIcon";
import "./product-customisations.scss";

function AddCustomisePhoto() {
  const [isOpen, setIsOpen] = useState(false);
  const handleSetOpen = () => {
    setIsOpen(!isOpen);
  };
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
        <li className="customisation__option">
          <label htmlFor="add-single-image" className="photo-option__label">
            <div className="photo-option__count-wrapper">
              <PhotoIcon />
              <span className="photo-option__count">1x</span>
            </div>
            <span className="photo-option__cost">+200</span>
          </label>
          <input
            type="file"
            id="add-single-image"
            className="photo-option__selection"
            max={1}
          />
        </li>
        <li className="customisation__option">
          <label htmlFor="add-multiple-image" className="photo-option__label">
            <div className="photo-option__count-wrapper">
              <PhotoIcon />
              <span className="photo-option__count">2x</span>
            </div>
            <span className="photo-option__cost">+700</span>
          </label>
          <input
            type="file"
            id="add-multiple-image"
            className="photo-option__selection"
            multiple
            max={2}
          />
        </li>
      </motion.ul>
    </div>
  );
}
export default AddCustomisePhoto;
