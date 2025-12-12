"use client";
import { useState } from "react";
import Input from "@/components/input/Input";
import TokenInput from "@/components/token-input/TokenInput";
import "./reset-password.scss";

export default function ResetPasswordPage() {
  const [resetPasswordState, setResetPasswordState] = useState({
    token: "",
    phoneNumber: "",
    password: "",
  });

  const onInputChange = ({ value, name }: { name: string; value: string }) => {
    setResetPasswordState((prvState) => ({ ...prvState, [name]: value }));
  };

  const handleSetToken = ({ token }: { token: string }) => {
    setResetPasswordState((prvState) => ({ ...prvState, token }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="reset-password">
      <div className="reset-password__inner-wrapper">
        <div className="reset-password-card">
          <div className="reset-password__new-password">
            <h3 className="reset-password__new-password-header">
              Введите новый пароль
            </h3>
            <Input
              initialValue={resetPasswordState.password}
              name="password"
              placeholder="ПАРОЛЬ"
              type="password"
              onInputChange={onInputChange}
              hasError={false}
            />
            <button className="reset-password__submit-new-password" disabled>
              Подтвердить
            </button>
          </div>
          {/* <TokenInput handleSetToken={handleSetToken} /> */}
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
