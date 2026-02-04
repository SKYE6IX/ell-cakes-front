import { useState, useEffect } from "react";
import CloseIcon from "@/components/icons/CloseIcon";
import { CustomiseComponentProps } from "./sharedType";
import { ProductVariant } from "@/types/__generated__/graphql";
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

type InscriptionSizes = "SMALL" | "MEDIUM" | "LARGE";

type AddCustomiseInscriptionProps = CustomiseComponentProps & {
  selectedVariant: ProductVariant;
};

function AddCustomiseInscription({
  selectedVariant,
  customOptions,
  dispatch,
}: AddCustomiseInscriptionProps) {
  const [inscriptionInput, setInscriptionInput] = useState("");
  const [isAddInscription, setIsAddInscription] = useState(false);

  // Reset when user change the variant
  useEffect(() => {
    setIsAddInscription(false);
    setInscriptionInput("");
  }, [selectedVariant]);

  const chosenWeight = parseFloat(selectedVariant.weight as string);

  const PRICE_TRACKER_BY_WEIGHT: InscriptionSizes =
    chosenWeight >= 10 ? "LARGE" : chosenWeight >= 5 ? "MEDIUM" : "SMALL";

  const handleSetIsActive = () => {
    setIsAddInscription(!isAddInscription);
  };

  const customInscription = customOptions.find(
    (option) => option.name?.toUpperCase() === "INSCRIPTION"
  );

  const optionId = customInscription?.id ?? "";

  const optionValue = customInscription?.customValues!.find(
    (cv) => cv.value === PRICE_TRACKER_BY_WEIGHT
  );

  const valueId = optionValue?.id ?? "";
  const extraPrice = optionValue?.extraPrice ?? 0;

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
            placeholder={`+ ${extraPrice} руб`}
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
