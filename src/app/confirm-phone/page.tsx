"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/input/Input";
import TokenInput from "@/components/token-input/TokenInput";
import "./confirm-phone.scss";

function ConfirmPhonePage() {
  const router = useRouter();
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

  const onTokenReedeem = () => {
    router.push("/dashboard");
  };

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
            <button className="confirm-phone__change-number-btn" disabled>
              Изменить
            </button>
          </div>
        ) : (
          <div className="confirm-phone__otp-wrapper">
            <TokenInput onTokenReedeem={onTokenReedeem} />

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
