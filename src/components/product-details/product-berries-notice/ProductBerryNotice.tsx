import Berry from "@/components/icons/Berry";
import "./product-berry-notice.scss";

function ProductBerryNotice() {
  return (
    <div className="product-details__berry-notice">
      <div className="product-details__berry-icon">
        <Berry/>
      </div>

      <div className="product-details__berry-content">
        <p className="product-details__berry-title">
          Ягоды в стоимость торта не входят
        </p>
        <p className="product-details__berry-text">
          Клубника и голубика - это топпинг. Вы можете добавить их к торту отдельно.
        </p>
      </div>
    </div>
  );
}

export default ProductBerryNotice;