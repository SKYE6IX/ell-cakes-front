"use client";

import { useMemo, useState } from "react";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import HelpSidebar from "@/components/help-sidebar/HelpSidebar";
import Footer from "@/components/footer/Footer";
import "./registration.scss";
import Link from "next/link";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [subscribe, setSubscribe] = useState(false);

  const isComplete = useMemo(() => {
    return (
      name.trim().length > 0 &&
      phone.trim().length > 0 &&
      email.trim().length > 0 &&
      pass.trim().length > 0
    );
  }, [name, phone, email, pass]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;

    console.log({ name, phone, email, pass, subscribe });
  };

  return (
    <>
      <section className="registration">
        <div className="registration__inner-wrapper">
          <HelpSidebar active="register" />

          <div className="registration-right">
            <h1 className="registration-right__title">Регистрация</h1>

            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="registration-form__fields">
                <Input
                  placeholder="имя"
                  value={name}
                  onChange={setName}
                  autoComplete="given-name"
                  required
                />

                <Input
                  placeholder="ТЕЛЕФОН"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  autoComplete="tel"
                  required
                />

                <Input
                  placeholder="ПОЧТА"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  autoComplete="email"
                  required
                />

                <Input
                  placeholder="ПАРОЛЬ"
                  type="password"
                  value={pass}
                  onChange={setPass}
                  autoComplete="new-password"
                  required
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

              <p className="registration-form__policy">
                нажимая кнопку вы соглашаетесь{" "}
                <Link href="/policy">с согласием на обработку персональных данных</Link>
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

      <Footer />
    </>
  );
}

export default RegistrationPage;
