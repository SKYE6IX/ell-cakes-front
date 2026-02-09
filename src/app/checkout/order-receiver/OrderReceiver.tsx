import { Dispatch, useState } from "react";
import Input from "@/components/input/Input";
import { ACTIONTYPE } from "../checkoutReducer";
import "./order-receiver.scss";

type OrderReceiverProps = {
  dispatch: Dispatch<ACTIONTYPE>;
};

function OrderReceiver({ dispatch }: OrderReceiverProps) {
  const [showInputs, setShowInputs] = useState(false);

  const handleSetShowInputs = () => {
    setShowInputs(!showInputs);
    dispatch({ type: "manage_order_receiver" });
  };

  const onInputChange = ({ name, value }: { name: string; value: string }) => {
    dispatch({
      type: "manage_order_receiver_inputs",
      payload: {
        name,
        value,
      },
    });
  };

  const removeOrderReceiver = () => {
    dispatch({ type: "remove_order_receiver" });
    handleSetShowInputs();
  };

  return (
    <div className="order-receiver">
      {showInputs ? (
        <div className="order-receiver__inputs-wrapper">
          <Input
            name="name"
            initialValue=""
            placeholder="Имя"
            onInputChange={onInputChange}
            type="text"
            hasError={false}
          />
          <Input
            name="phoneNumber"
            initialValue=""
            placeholder="Телефон"
            onInputChange={onInputChange}
            type="tel"
            hasError={false}
          />
          <button
            className="order-receiver__close-btn"
            onClick={removeOrderReceiver}
          >
            Закрывать
          </button>
        </div>
      ) : (
        <button
          className="order-receiver__open-btn"
          onClick={handleSetShowInputs}
        >
          Добавить
        </button>
      )}
    </div>
  );
}

export default OrderReceiver;
