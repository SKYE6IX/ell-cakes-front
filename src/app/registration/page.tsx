"use client";
import { useMemo, useState } from "react";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import HelpSidebar from "@/components/help-sidebar/HelpSidebar";
import "./registration.scss";
import Link from "next/link";

const initialState = {
  name: "",
  email: "",
  password: "",
  phone: "",
};

function RegistrationPage() {
  const [formState, setFormState] = useState(initialState);
  const [subscribe, setSubscribe] = useState(false);

  const isComplete = useMemo(() => {
    const { name, phone, email, password } = formState;
    return (
      name.trim().length > 0 &&
      phone.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0
    );
  }, [formState]);

  const onInputChange = ({ name, value }: { name: string; value: string }) => {
    setFormState((prvState) => ({
      ...prvState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (!isComplete) return;
    // console.log({ name, phone, email, pass, subscribe });
  };

  return (
    <section className="registration">
      <div className="registration__inner-wrapper">
        <HelpSidebar active="register" />

        <div className="registration-right">
          <h1
            className="registration-right__title"
            data-testid="registration-page-heading"
          >
            Регистрация
          </h1>

          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="registration-form__fields">
              <Input
                initialValue={formState.name}
                name="name"
                placeholder="имя"
                autoComplete="given-name"
                required
                onInputChange={onInputChange}
              />
              <Input
                initialValue={formState.phone}
                name="phone"
                placeholder="ТЕЛЕФОН"
                type="tel"
                autoComplete="tel"
                required
                onInputChange={onInputChange}
              />
              <Input
                initialValue={formState.email}
                name="email"
                placeholder="ПОЧТА"
                type="email"
                autoComplete="email"
                required
                onInputChange={onInputChange}
              />
              <Input
                initialValue={formState.password}
                name="password"
                placeholder="ПАРОЛЬ"
                type="password"
                autoComplete="new-password"
                required
                onInputChange={onInputChange}
              />
            </div>

            <label className="registration-checkbox">
              <input
                type="checkbox"
                checked={subscribe}
                onChange={(e) => setSubscribe(e.target.checked)}
              />
              <span className="registration-checkbox__box" />
              <span className="registration-checkbox__label">
                Подписаться на новости
              </span>
            </label>

            <div
              className={`registration-form__submit ${
                !isComplete ? "is-disabled" : ""
              }`}
            >
              <Button textKey="Зарегистрироваться" href="/" fullWidth />
            </div>

            <p
              className="registration-form__policy"
              data-testid="registration-page-policy"
            >
              нажимая кнопку вы соглашаетесь{" "}
              <Link href="/policy" data-testid="registration-page-policy-link">
                с согласием на обработку персональных данных
              </Link>
            </p>

            <div className="registration__divider" />

            <div className="registration-form__login">
              <Button
                textKey="Уже есть аккаунт"
                href="/login"
                fullWidth
                variant="outline"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default RegistrationPage;
