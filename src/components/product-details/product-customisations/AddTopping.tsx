import { useState } from "react";
import Modal from "@/components/modal/Modal";
import "./product-customisations.scss";

function AddTopping() {
  const [showModal, setShowModal] = useState(false);
  const handleSetShowModal = () => {
    setShowModal(!showModal);
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
          <li className="add-topping__item">100 г - 200 руб.</li>
          <li className="add-topping__item">100 г - 200 руб.</li>
          <li className="add-topping__item">100 г - 200 руб.</li>
        </ul>
      </Modal>
    </div>
  );
}

export default AddTopping;
