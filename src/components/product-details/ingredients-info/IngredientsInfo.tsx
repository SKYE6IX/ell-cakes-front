import { useState } from "react";
import ProductInfoBtn from "../product-info-btn/ProductInfoBtn";
import Modal from "@/components/modal/Modal";
import { ProductFilling } from "@/types/__generated__/graphql";
import "./ingredients-info.scss";

type IngredientsInfoProp = {
  productFilling: ProductFilling;
};

function IngredientsInfo({ productFilling }: IngredientsInfoProp) {
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
              Ккал {String(productFilling.calories)}
            </span>
            <ul className="ingredients-info__nutrition-list">
              <li className="ingredients-info__nutrition-item">
                <span className="ingredients-info__nutrition-metric">
                  {String(productFilling.protein)}
                </span>
                <span className="ingredients-info__nutrition-name">Белки</span>
              </li>
              <li className="ingredients-info__nutrition-item">
                <span className="ingredients-info__nutrition-metric">
                  {String(productFilling.fat)}
                </span>
                <span className="ingredients-info__nutrition-name">Жиры</span>
              </li>
              <li className="ingredients-info__nutrition-item">
                <span className="ingredients-info__nutrition-metric">
                  {String(productFilling.carbonhydrate)}
                </span>
                <span className="ingredients-info__nutrition-name">
                  Углеводы
                </span>
              </li>
            </ul>
          </div>
          <div className="ingredients-info__description">
            <h5 className="ingredients-info__description-title">Состав:</h5>
            <p className="ingredients-info__description-text">
              {productFilling.ingredients}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default IngredientsInfo;
