"use client";
import { useMemo, useState, useRef } from "react";
import Input from "@/components/input/Input";
import "./reset-password.scss";

export default function ResetPasswordPage() {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [values, setValues] = useState<string[]>(new Array(6).fill(""));
  const [resetPasswordState, setResetPasswordState] = useState({
    token: "",
    phoneNumber: "",
    password: "",
  });

  useMemo(() => {
    const inputToken = values.join("");
    setResetPasswordState((prvState) => ({ ...prvState, token: inputToken }));
  }, [values]);

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

  const onInputChange = ({ value, name }: { name: string; value: string }) => {
    setResetPasswordState((prvState) => ({ ...prvState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="reset-password">
      <div className="reset-password__inner-wrapper">
        <div className="reset-password-card">
          <div className="reset-password__new-password">
            <h5 className="reset-password__new-password-header">
              Введите новый пароль
            </h5>
            <Input
              initialValue={resetPasswordState.password}
              name="password"
              placeholder="ПАРОЛЬ"
              type="password"
              onInputChange={onInputChange}
              hasError={false}
            />
            <button className="reset-password__submit-new-password">
              Подтвердить
            </button>
          </div>
          {/* <div className="reset-password__otp-wrapper">
            <h5 className="reset-password__otp-header">
              Мы отправили 6-значный код на +7 993 233 4556
            </h5>
            <div className="reset-password__otp-inputs">
              {Array.from({ length: 6 }).map((value, i) => (
                <input
                  key={i}
                  className="reset-password__otp-cell"
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
            <button className="reset-password__otp-submit">Подтвердить</button>

            <div className="reset-password__divider" />

            <button className="reset-password__change-number">
              Изменить номер
            </button>
          </div> */}

          {/* <h3 className="reset-password-card__title">Смена пароля</h3>
          <form className="reset-password-form" onSubmit={handleSubmit}>
            <Input
              initialValue={""}
              name="phoneNumber"
              placeholder="ТЕЛЕФОН"
              type="tel"
              onInputChange={onInputChange}
              hasError={false}
            />
            <button className="reset-password-form__submit">Отправить</button>
          </form> */}
        </div>
      </div>
    </section>
  );
}
