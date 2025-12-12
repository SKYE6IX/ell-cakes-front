"use client";
import { useState } from "react";
import Input from "@/components/input/Input";
import TokenInput from "@/components/token-input/TokenInput";
import "./confirm-phone.scss";

function ConfirmPhonePage() {
  const [token, setToken] = useState("");
  const [numberChange, setNumberChange] = useState({
    showInput: false,
    newNumber: "",
  });
  const onInputChange = ({ value }: { name: string; value: string }) => {
    setNumberChange((prvState) => ({ ...prvState, newNumber: value }));
  };
  const handleShowChangeNumber = () => {
    setNumberChange((prvState) => ({
      ...prvState,
      showInput: !prvState.showInput,
    }));
  };
  const handleSetToken = ({ token }: { token: string }) => {
    setToken(token);
  };

  console.log("Here is the value of token > ", token);

  return (
    <section className="confirm-phone">
      <div className="confirm-phone__inner-wrapper">
        {numberChange.showInput ? (
          <div className="confirm-phone__change-phone-wrapper">
            <Input
              initialValue={""}
              name="phoneNumber"
              placeholder="ТЕЛЕФОН"
              type="tel"
              onInputChange={onInputChange}
              hasError={false}
            />
            <button className="confirm-phone__change-number-btn">
              Изменить
            </button>
          </div>
        ) : (
          <div className="confirm-phone__otp-wrapper">
            <TokenInput handleSetToken={handleSetToken} />

            <div className="confirm-phone__divider" />

            <button
              className="confirm-phone__show-change-number-btn"
              onClick={handleShowChangeNumber}
            >
              Изменить номер
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ConfirmPhonePage;
