import "./product-list.scss";

function ProductListSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="product-card skeleton" key={i}>
          <div className="product-card__image-container skeleton"></div>
          <div className="product-card__name skeleton"></div>
          <div className="product-card__description skeleton"></div>
        </div>
      ))}
    </>
  );
}

export default ProductListSkeleton;
