import "./product-details-sekeleton.scss";

export function ProductPanelSkeleton() {
  return (
    <ul className="product-details-skeleton__info-list">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="product-details-skeleton__info-item"></li>
      ))}
    </ul>
  );
}

export function ProductMediaSkeleton() {
  return <div className="product-details-skeleton__image"></div>;
}

{
  /* <div className="product-details-skeleton">
  <div className="product-details-skeleton__image"></div>
</div>; */
}
