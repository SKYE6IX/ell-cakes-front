import { useState } from "react";
import CloseIcon from "@/components/icons/CloseIcon";
import { CustomiseComponentProps } from "./sharedType";
import "./product-customisations.scss";

function debounceFn(fn: (value: string) => void, time: number) {
  let timeoutId: NodeJS.Timeout;
  return (value: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(value);
    }, time);
  };
}

function AddCustomiseInscription({
  customOptions,
  dispatch,
}: CustomiseComponentProps) {
  const [inscriptionInput, setInscriptionInput] = useState("");
  const [isAddInscription, setIsAddInscription] = useState(false);

  const handleSetIsActive = () => {
    setIsAddInscription(!isAddInscription);
  };

  const customInscription = customOptions.find(
    (option) => option.name?.toUpperCase() === "INSCRIPTION"
  );

  const optionId = customInscription?.id ?? "";

  const valueId = customInscription?.customValues![0].id ?? "";

  const extraPrice = customInscription?.customValues![0].extraPrice ?? 0;

  const addInscripiton = (value: string) => {
    dispatch({
      type: "add_customization",
      payload: {
        optionId,
        valueId,
        inscriptionText: value,
        extraPrice,
        imagesId: null,
      },
    });
  };

  const debounceAddInscription = debounceFn(addInscripiton, 1000);

  const onInscriptionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInscriptionInput(value);
    debounceAddInscription(value);
  };

  const removeCustomiseInscription = () => {
    dispatch({ type: "remove_customization", payload: { optionId } });
    setInscriptionInput("");
    handleSetIsActive();
  };

  if (!customInscription) return null;

  return (
    <div className="add-customise-insription">
      {isAddInscription ? (
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
            placeholder={`+ ${customInscription.customValues![0].extraPrice}`}
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
