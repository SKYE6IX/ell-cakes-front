const QR_PATH =
  "M0 0h7v1h-7zM9 0h1v1h-1zM11 0h1v1h-1zM14 0h1v1h-1zM16 0h1v1h-1zM18 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM8 1h3v1h-3zM14 1h1v1h-1zM18 1h1v1h-1zM24 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM9 2h3v1h-3zM14 2h1v1h-1zM18 2h1v1h-1zM20 2h3v1h-3zM24 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM8 3h3v1h-3zM13 3h3v1h-3zM18 3h1v1h-1zM20 3h3v1h-3zM24 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM9 4h2v1h-2zM15 4h2v1h-2zM18 4h1v1h-1zM20 4h3v1h-3zM24 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h1v1h-1zM13 5h4v1h-4zM18 5h1v1h-1zM24 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h7v1h-7zM9 7h2v1h-2zM13 7h2v1h-2zM16 7h1v1h-1zM0 8h5v1h-5zM6 8h5v1h-5zM12 8h1v1h-1zM15 8h3v1h-3zM19 8h1v1h-1zM21 8h1v1h-1zM23 8h1v1h-1zM2 9h1v1h-1zM4 9h1v1h-1zM7 9h1v1h-1zM9 9h1v1h-1zM11 9h2v1h-2zM16 9h2v1h-2zM19 9h2v1h-2zM24 9h1v1h-1zM1 10h1v1h-1zM3 10h2v1h-2zM6 10h4v1h-4zM13 10h2v1h-2zM17 10h2v1h-2zM20 10h1v1h-1zM22 10h1v1h-1zM0 11h1v1h-1zM2 11h1v1h-1zM5 11h1v1h-1zM7 11h3v1h-3zM13 11h1v1h-1zM17 11h1v1h-1zM0 12h1v1h-1zM5 12h2v1h-2zM9 12h1v1h-1zM12 12h1v1h-1zM15 12h2v1h-2zM19 12h3v1h-3zM23 12h2v1h-2zM0 13h1v1h-1zM2 13h4v1h-4zM7 13h1v1h-1zM9 13h1v1h-1zM11 13h2v1h-2zM17 13h4v1h-4zM0 14h1v1h-1zM2 14h2v1h-2zM5 14h2v1h-2zM8 14h1v1h-1zM12 14h4v1h-4zM17 14h2v1h-2zM20 14h1v1h-1zM22 14h2v1h-2zM0 15h1v1h-1zM3 15h1v1h-1zM7 15h2v1h-2zM14 15h1v1h-1zM16 15h1v1h-1zM23 15h2v1h-2zM0 16h1v1h-1zM2 16h6v1h-6zM9 16h2v1h-2zM12 16h1v1h-1zM14 16h8v1h-8zM24 16h1v1h-1zM8 17h2v1h-2zM11 17h1v1h-1zM16 17h1v1h-1zM20 17h1v1h-1zM24 17h1v1h-1zM0 18h7v1h-7zM8 18h1v1h-1zM10 18h1v1h-1zM13 18h1v1h-1zM16 18h1v1h-1zM18 18h1v1h-1zM20 18h1v1h-1zM22 18h3v1h-3zM0 19h1v1h-1zM6 19h1v1h-1zM9 19h4v1h-4zM14 19h3v1h-3zM20 19h2v1h-2zM0 20h1v1h-1zM2 20h3v1h-3zM6 20h1v1h-1zM8 20h3v1h-3zM12 20h1v1h-1zM14 20h8v1h-8zM0 21h1v1h-1zM2 21h3v1h-3zM6 21h1v1h-1zM8 21h3v1h-3zM15 21h2v1h-2zM18 21h1v1h-1zM20 21h1v1h-1zM23 21h2v1h-2zM0 22h1v1h-1zM2 22h3v1h-3zM6 22h1v1h-1zM8 22h1v1h-1zM10 22h1v1h-1zM14 22h1v1h-1zM17 22h2v1h-2zM20 22h1v1h-1zM22 22h1v1h-1zM24 22h1v1h-1zM0 23h1v1h-1zM6 23h1v1h-1zM8 23h1v1h-1zM11 23h3v1h-3zM15 23h2v1h-2zM18 23h4v1h-4zM23 23h1v1h-1zM0 24h7v1h-7zM8 24h3v1h-3zM14 24h1v1h-1zM16 24h1v1h-1zM22 24h3v1h-3z";

type ReviewQrProps = {
  className?: string;
};

function ReviewQr({ className }: ReviewQrProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 25 25"
      shapeRendering="crispEdges"
      role="img"
      aria-label="QR-код на отзывы Ell Cakes в Яндекс Картах"
    >
      <path d={QR_PATH} fill="currentColor" />
    </svg>
  );
}

export default ReviewQr;
