import { useState } from "react";
import ProductInfoBtn from "../product-info-btn/ProductInfoBtn";
import "./product-reviews.scss";

function ProductReviews() {
  const [showModal, setShowModal] = useState(false);
  const handleSetShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="product-reviews">
      <ProductInfoBtn buttonText="Отзывы" handleOnClick={handleSetShowModal} />
    </div>
  );
}

export default ProductReviews;
