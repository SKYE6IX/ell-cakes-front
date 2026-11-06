import { Suspense } from "react";
import OrderStatus from "./OrderStatus";

function page() {
  return (
    <Suspense>
      <OrderStatus />
    </Suspense>
  );
}

export default page;
