"use client";
import { useReactiveVar } from "@apollo/client/react";
import UserSidebar from "@/components/user-sidebar/UserSidebar";
import OnWayIcon from "@/components/icons/OnWayIcon";
import CheckMark from "@/components/icons/ CheckMark";
import { userVar } from "@/lib/cache";
import { formatMoney } from "@/utils/formatMoney";
import "./order-history.scss";

function renderStatusIcon(status: string) {
  if (status === "delivered") {
    return <CheckMark />;
  }
  return <OnWayIcon />;
}

export default function OrdersHistory() {
  const authUser = useReactiveVar(userVar);

  const getDate = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("ru-RU");
  };

  return (
    <section className="order-history">
      <UserSidebar active="orders" />

      <div className="order-history__content">
        <h3 className="order-history__title">История заказов</h3>

        {authUser?.orders?.length === 0 && (
          <p className="order-history__empty">
            Тут пока пусто, но мы очень ждём Ваших заказов!
          </p>
        )}

        {authUser?.orders && authUser.orders.length > 0 && (
          <div className="order-history__card">
            {authUser.orders.map((order) => (
              <div className="order-history__row" key={order.id}>
                <div className="order-history__left">
                  <div className="order-history__group">
                    <span>{getDate(order.createdAt as string)}</span>
                    <span>{order.orderNumber}</span>
                  </div>

                  <ul className="order-history__product-list">
                    {order.orderItems?.map((item) => (
                      <li key={item.id} className="order-history__product-item">
                        {item.product?.name}{" "}
                        <span className="qty"> x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="order-history__price-wrapper">
                    <span className="order-history__price">
                      {formatMoney(order.totalAmount!)}
                    </span>
                  </div>
                </div>

                <div className="order-history__icon">
                  {renderStatusIcon(order.status!)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
