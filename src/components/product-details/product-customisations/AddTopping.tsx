import { useState } from "react";
import Modal from "@/components/modal/Modal";
import { ToppingOption } from "@/types/__generated__/graphql";
import { SetProductConfigurationArgs } from "../product-info-panel/ProductInfoPanel";
import "./product-customisations.scss";

type AddToppingProps = {
  toppingOptions: ToppingOption[];
  setProductConfiguration: ({}: SetProductConfigurationArgs) => void;
};

function AddTopping({
  toppingOptions,
  setProductConfiguration,
}: AddToppingProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedToppingId, setSelectedToppingId] = useState("");
  const handleSetShowModal = () => {
    setShowModal(!showModal);
  };
  const selectTopping = (topping: ToppingOption) => {
    setSelectedToppingId(topping.id);
    setProductConfiguration({
      key: "selectedTopping",
      configuration: { selectedTopping: topping },
    });
  };

  return (
    <div className="add-topping">
      <button className="add-topping__button" onClick={handleSetShowModal}>
        Добавить топпинг
      </button>
      <Modal
        showModal={showModal}
        headingText="Добавить ягоды"
        handleCloseModal={handleSetShowModal}
      >
        <ul className="add-topping__list">
          {toppingOptions.map((option) => (
            <li
              className={[
                "add-topping__item",
                selectedToppingId === option.id ? "selected" : "",
              ].join(" ")}
              key={option.id}
              onClick={() => selectTopping(option)}
            >
              {String(option.weight)} г - {option.extraPrice} руб.
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}

export default AddTopping;
