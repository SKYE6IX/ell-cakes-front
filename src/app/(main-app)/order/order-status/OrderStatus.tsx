"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { TypedDocumentNode, gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
import {
  OrderIntent,
  OrderIntentWhereUniqueInput,
} from "@/types/__generated__/graphql";
import "./order-status.scss";

const GET_ORDER_INTENT: TypedDocumentNode<
  { orderIntent: OrderIntent },
  { where: OrderIntentWhereUniqueInput }
> = gql`
  query OrderIntent($where: OrderIntentWhereUniqueInput!) {
    orderIntent(where: $where) {
      id
      paymentStatus
      order {
        id
        orderNumber
      }
    }
  }
`;

function OrderStatus() {
  const [initialLoad, setInitialLoad] = useState(true);
  const searchParams = useSearchParams();
  const intentId = searchParams.get("iid");
  const { data, loading } = useQuery(GET_ORDER_INTENT, {
    variables: { where: { intentId } },
  });

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  if (initialLoad || loading) {
    return (
      <div className="order-status">
        <div className="order-status__inner">
          <div className="order-status__loader"></div>
          <h4 className="order-status__loading-title">Подождите...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="order-status">
      <div className="order-status__inner">
        {data && (
          <>
            {data.orderIntent?.paymentStatus === "SUCCEEDED" ? (
              <>
                <svg
                  width="60"
                  height="41"
                  viewBox="0 0 60 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.4188 41L0.482669 20.3018C0.153821 19.9218 -0.0180163 19.433 0.00149701 18.9331C0.0210103 18.4332 0.230437 17.9589 0.587926 17.6052C0.945415 17.2514 1.42464 17.0442 1.92982 17.0248C2.43501 17.0055 2.92896 17.1756 3.31296 17.501L21.3787 35.3785L56.687 0.477642C57.071 0.152218 57.565 -0.0178286 58.0702 0.00148141C58.5754 0.0207914 59.0546 0.228036 59.4121 0.581802C59.7696 0.935567 59.979 1.4098 59.9985 1.90972C60.018 2.40965 59.8462 2.89845 59.5173 3.27845L21.4188 41Z"
                    fill="#B9C889"
                  />
                </svg>
                <h3 className="order-status__heading">Спасибо за заказ!</h3>
                <h4 className="order-status__sub-heading">
                  Оплата прошла успешно
                </h4>

                <p className="order-status__order-number">
                  Номер заказа: {data.orderIntent.order?.orderNumber}
                </p>

                <div className="order-status__body">
                  <h5 className="order-status__body-title">Мы на связи</h5>
                  <p className="order-status__body-text">
                    Вам придет смс о готовности заказа
                  </p>
                  <Link href="/" className="order-status__link">
                    Вернуться в каталог
                  </Link>
                </div>
              </>
            ) : (
              <>
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 6.25L6.25 0L22.5 16.25L38.75 0L45 6.25L28.75 22.5L45 38.75L38.75 45L22.5 28.75L6.25 45L0 38.75L16.25 22.5L0 6.25Z"
                    fill="#FF5C5F"
                  />
                </svg>
                <h3 className="order-status__heading error">
                  Оплата не прошла
                </h3>
                <h4 className="order-status__sub-heading error">
                  Заказ пока не оформлен — можно попробовать ещё раз
                </h4>

                <div className="order-status__body error">
                  <Link href="/checkout" className="order-status__link error">
                    Повторить попытку
                  </Link>
                  <div className="order-status__contact">
                    <h5 className="order-status__contact-header">
                      Нужна помощь?
                    </h5>
                    <Link
                      href="mailto:info@ellcakes.net"
                      className="order-status__contact-mail"
                    >
                      info@ellcakes.net
                    </Link>
                    <Link
                      href="tel:89651950599"
                      className="order-status__contact-phone"
                    >
                      8(965)-195-05-99 <span>(10:00–20:00)</span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default OrderStatus;
