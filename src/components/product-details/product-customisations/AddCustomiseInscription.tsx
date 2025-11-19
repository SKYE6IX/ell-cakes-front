import { useState, useEffect } from "react";
import CloseIcon from "@/components/icons/CloseIcon";
import { CustomiseComponentProps } from "./sharedType";
import "./product-customisations.scss";

function AddCustomiseInscription({
  customOptions,
  dispatch,
}: CustomiseComponentProps) {
  const [inscriptionInput, setInscriptionInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const handleSetIsActive = () => {
    setIsActive(!isActive);
  };
  const addCustomInscription = customOptions.find(
    (option) => option.name?.toUpperCase() === "INSCRIPTION"
  );
  const optionId = addCustomInscription?.id ?? "";
  const valueId = addCustomInscription?.customValues![0].id ?? "";

  const onInscriptionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInscriptionInput(e.target.value);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (inscriptionInput) {
      timeoutId = setTimeout(() => {
        dispatch({
          type: "add_customization",
          payload: {
            optionId,
            valueId,
            inscriptionText: inscriptionInput,
            imagesId: null,
          },
        });
      }, 1000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inscriptionInput, optionId, valueId, dispatch]);

  const removeCustomiseInscription = () => {
    dispatch({ type: "remove_customization", payload: { optionId } });
    setInscriptionInput("");
    handleSetIsActive();
  };

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
            value={inscriptionInput}
            placeholder={`+ ${
              addCustomInscription.customValues![0].extraPrice
            }`}
            onChange={onInscriptionInputChange}
          />
          <button
            className="add-customise-insription__close-input"
            onClick={removeCustomiseInscription}
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
