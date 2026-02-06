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
    handleSetShowModal();
  };

  const removeTopping = () => {
    setSelectedToppingId("default");
    dispatch({ type: "remove_topping" });
    handleSetShowModal();
  };

  const selectedOption = toppingOptions.find(
    (option) => option.id === selectedToppingId
  );

  return (
    <div className="add-topping">
      <button
        className={[
          "add-topping__button",
          selectedOption ? "preview" : "",
        ].join(" ")}
        onClick={handleSetShowModal}
      >
        {selectedOption
          ? `топпинг (${selectedOption.weight!}кг)`
          : "Добавить топпинг"}
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
            без добавления
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

        <p className="add-topping__info">
          Обратите внимание: указанная цена торта включает ягодное оформление
          весом 150 г — это частичное покрытие. Для полного покрытия всей
          поверхности вы можете выбрать дополнительный ягодный топпинг.
          Количество ягод рассчитывается в зависимости от веса торта (например,
          для торта 2 кг — 350 г ягод)
        </p>
      </Modal>
    </div>
  );
}

export default AddTopping;
