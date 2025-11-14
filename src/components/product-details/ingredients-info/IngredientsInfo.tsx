import { useState } from "react";
import ProductInfoBtn from "../product-info-btn/ProductInfoBtn";
import Modal from "@/components/modal/Modal";
import "./ingredients-info.scss";

function IngredientsInfo() {
  const [showModal, setShowModal] = useState(false);
  const handleSetShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="ingredients-info">
      <ProductInfoBtn
        buttonText="Ингредиенты"
        handleOnClick={handleSetShowModal}
      />
      <Modal
        showModal={showModal}
        handleCloseModal={handleSetShowModal}
        headingText="Ингридиенты"
      >
        <div className="ingredients-info__content">
          <div className="ingredients-info__nutrition-wrapper">
            <span className="ingredients-info__nutrition-calories">
              Ккал 311.8
            </span>
            <ul className="ingredients-info__nutrition-list">
              <li className="ingredients-info__nutrition-item">
                <span className="ingredients-info__nutrition-metric">9.8</span>
                <span className="ingredients-info__nutrition-name">Белки</span>
              </li>
              <li className="ingredients-info__nutrition-item">
                <span className="ingredients-info__nutrition-metric">4.7</span>
                <span className="ingredients-info__nutrition-name">Жиры</span>
              </li>
              <li className="ingredients-info__nutrition-item">
                <span className="ingredients-info__nutrition-metric">56.2</span>
                <span className="ingredients-info__nutrition-name">
                  Углеводы
                </span>
              </li>
            </ul>
          </div>
          <div className="ingredients-info__description">
            <h5 className="ingredients-info__description-title">Состав:</h5>
            <p className="ingredients-info__description-text">
              Мука высшего сорта, сахар, сахарная пудра, куриные яйца, кефир
              3,2%, сливочное масло 82,5%, сливочный сыр Cremette, натуральные
              сливки, рафинированное подсолнечное масло, натуральные цветки
              лаванды, ваниль в стручках, свежемороженая черника, лимонный сок.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default IngredientsInfo;
