import { useState } from "react";
import ProductInfoBtn from "../product-info-btn/ProductInfoBtn";
import "./product-faq.scss";

function ProductFAQ() {
  const [showModal, setShowModal] = useState(false);
  const handleSetShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="product-faq">
      <ProductInfoBtn buttonText="FAQ" handleOnClick={handleSetShowModal} />
    </div>
  );
}
export default ProductFAQ;
