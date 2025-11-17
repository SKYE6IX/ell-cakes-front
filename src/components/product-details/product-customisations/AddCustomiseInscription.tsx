import { useState } from "react";
import CloseIcon from "@/components/icons/CloseIcon";
import { CustomiseComponentProps } from "./sharedType";

import "./product-customisations.scss";

function AddCustomiseInscription({ customOptions }: CustomiseComponentProps) {
  const [isActive, setIsActive] = useState(false);
  const handleSetIsActive = () => {
    setIsActive(!isActive);
  };
  const addCustomInscription = customOptions.find(
    (option) => option.name?.toUpperCase() === "INSCRIPTION"
  );
  if (!addCustomInscription) return null;
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
            placeholder={`+ ${
              addCustomInscription.customValues![0].extraPrice
            }`}
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
