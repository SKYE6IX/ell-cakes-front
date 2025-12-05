"use client";
import { useReactiveVar } from "@apollo/client/react";
import UserSidebar from "@/components/user-sidebar/UserSidebar";
import OnWayIcon from "@/components/icons/OnWayIcon";
import CheckMark from "@/components/icons/ CheckMark";
import { userVar } from "@/lib/cache";
import "./order-history.scss";

// type Order = {
//   id: string;
//   date: string;
//   product: string;
//   price: string;
//   status: OrderStatus;
// }

// const orders: Order[] = [
//   {
//     id: "EC-12847",
//     date: "14.02.2001",
//     product: "Птичье молоко",
//     price: "3200 ₽",
//     status: "onway",
//   },
//   {
//     id: "EC-12848",
//     date: "16.02.2001",
//     product: "Птичье молоко",
//     price: "3200 ₽",
//     status: "delivered",
//   },
// ];

function renderStatusIcon(status: string) {
  if (status === "delivered") {
    return <CheckMark />;
  }
  return <OnWayIcon />;
}

export default function OrdersHistory() {
  const user = useReactiveVar(userVar);
  return (
    <section className="order-history">
      <div className="order-history__inner">
        <UserSidebar active="orders" />

        <div className="order-history__right">
          <h1 className="order-history__title">История заказов</h1>

          {user?.orders?.length === 0 && (
            <article className="order-history__empty">
              Тут пока пусто, но мы очень ждём Ваших заказов!
            </article>
          )}
          {user?.orders && user.orders.length > 0 && (
            <article className="order-history__card">
              {user.orders.map((order) => (
                <div className="order-history__row" key={order.id}>
                  <div className="order-history__left">
                    <div className="order-history__group">
                      <span>{String(order.createdAt)}</span>
                      <span>{order.orderNumber}</span>
                    </div>

                    <div className="order-history__product">
                      {order.orderItems![0].product?.name}
                    </div>

                    <div className="order-history__price">
                      {order.totalAmount}
                    </div>
                  </div>
                  <div className="order-history__icon">
                    {renderStatusIcon(order.status!)}
                  </div>
                </div>
              ))}
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
