import { useState, Dispatch } from "react";
import Modal from "@/components/modal/Modal";
import { ToppingOption } from "@/types/__generated__/graphql";
import { ACTIONTYPE } from "../product-info-panel/productConfigurationReducer";

import "./product-customisations.scss";

type AddToppingProps = {
  toppingOptions: ToppingOption[];
  dispatch: Dispatch<ACTIONTYPE>;
};

function AddTopping({ toppingOptions, dispatch }: AddToppingProps) {
  const [showModal, setShowModal] = useState(false);

  const [selectedToppingId, setSelectedToppingId] = useState("default");

  const handleSetShowModal = () => {
    setShowModal(!showModal);
  };

  const selectTopping = (topping: ToppingOption) => {
    setSelectedToppingId(topping.id);
    dispatch({ type: "add_topping", payload: topping });
  };

  const removeTopping = () => {
    setSelectedToppingId("default");
    dispatch({ type: "remove_topping" });
  };

  const selectedOption = toppingOptions.find(
    (option) => option.id === selectedToppingId
  );

  return (
    <div className="add-topping">
      <button className="add-topping__button" onClick={handleSetShowModal}>
        {selectedOption
          ? `топпинг (${selectedOption.weight!}кг)`
          : "Добавить топпинг"}
        {/*  */}
        {}
      </button>

      <Modal
        showModal={showModal}
        headingText="Добавить ягоды"
        handleCloseModal={handleSetShowModal}
      >
        <ul className="add-topping__list">
          <li
            className={[
              "add-topping__item",
              selectedToppingId === "default" ? "selected" : "",
            ].join(" ")}
            onClick={removeTopping}
          >
            ничто
          </li>

          {toppingOptions.map((option) => (
            <li
              className={[
                "add-topping__item",
                selectedToppingId === option.id ? "selected" : "",
              ].join(" ")}
              key={option.id}
              onClick={() => selectTopping(option)}
            >
              {String(option.weight)}кг - {option.extraPrice} руб.
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}

export default AddTopping;
