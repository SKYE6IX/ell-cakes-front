"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import Input from "@/components/input/Input";
import "./confirm-phone.scss";

function ConfirmPhonePage() {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [token, setToken] = useState("");
  const [values, setValues] = useState<string[]>(new Array(6).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [numberChange, setNumberChange] = useState({
    showInput: false,
    newNumber: "",
  });

  useMemo(() => {
    const inputToken = values.join("");
    setToken(inputToken);
  }, [values]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const input = inputRefs.current[index];
    const digit = value.replace(/\D/g, "");
    const newValues = [...values];
    newValues[index] = digit;
    setValues(newValues);
    if (input.nextElementSibling) {
      (input.nextElementSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const input = inputRefs.current[index];
      const newValues = [...values];
      newValues[index] = "";
      setValues(newValues);
      if (input.previousElementSibling) {
        (input.previousElementSibling as HTMLInputElement).focus();
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text/plain").replace(/\D/g, "");
    if (!pasted) return;
    const digits = pasted.slice(0, 6).split("");
    if (digits.length > 0) {
      const newValues = new Array("").fill("");
      digits.forEach((d, i) => {
        if (i < 6) {
          newValues[i] = d;
        }
      });
      setValues(newValues);
      inputRefs.current[5].focus();
    }
  };

  const onInputChange = ({ value }: { name: string; value: string }) => {
    setNumberChange((prvState) => ({ ...prvState, newNumber: value }));
  };

  const handleResend = () => {};

  const handleShowChangeNumber = () => {
    setNumberChange((prvState) => ({
      ...prvState,
      showInput: !prvState.showInput,
    }));
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
            <button className="confirm-phone__change-number-btn">
              Изменить
            </button>
          </div>
        ) : (
          <div className="confirm-phone__otp-wrapper">
            <h3
              className="confirm-phone__otp-title"
              data-testid="confirm-phone-page-title"
            >
              Подтвердите номер
            </h3>
            <h5
              className="confirm-phone__otp-subtitle"
              data-testid="confirm-phone-page-sub-title"
            >
              Мы отправили 6-значный код на +7 993 233 4556
            </h5>

            <div className="confirm-phone__otp-inputs">
              {Array.from({ length: 6 }).map((value, i) => (
                <input
                  key={i}
                  className="confirm-phone-otp__cell"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="\d*"
                  maxLength={1}
                  value={values[i]}
                  autoFocus={i === 0}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onPaste={handlePaste}
                  ref={(el) => {
                    if (el) {
                      inputRefs.current[i] = el;
                    }
                  }}
                />
              ))}
            </div>

            <button className="confirm-phone__submit">Подтвердить</button>

            <div className="confirm-phone-resend">
              <span className="confirm-phone-resend__label">
                Не пришёл код?
              </span>
              <button
                className="confirm-phone-resend__btn"
                disabled={secondsLeft > 0}
              >
                Отправить ещё раз
                {secondsLeft > 0 &&
                  `через 00:${String(secondsLeft).padStart(2, "0")}`}
              </button>
            </div>

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
