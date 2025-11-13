import { useState } from "react";
import CloseIcon from "@/components/icons/CloseIcon";
import "./product-customisations.scss";

function AddCustomiseInscription() {
  const [isActive, setIsActive] = useState(false);
  const handleSetIsActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="add-customise-insription">
      {isActive ? (
        <div className="add-customise-insription__input-wrapper">
          <label
            htmlFor="inscription-input"
            className="add-customise-insription__label"
          >
            Добавить надпись
          </label>
          <input
            type="text"
            id="inscription-input"
            className="add-customise-insription__input"
            placeholder="+500"
          />
          <button
            className="add-customise-insription__close-input"
            onClick={handleSetIsActive}
          >
            <CloseIcon />
          </button>
        </div>
      ) : (
        <button
          className="add-customise-insription__button"
          onClick={handleSetIsActive}
        >
          Добавить надпись
        </button>
      )}
    </div>
  );
}

export default AddCustomiseInscription;
