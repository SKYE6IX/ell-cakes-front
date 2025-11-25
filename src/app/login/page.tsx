"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import HelpSidebar from "@/components/help-sidebar/HelpSidebar";
import Footer from "@/components/footer/Footer";
import "./login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const isComplete = useMemo(() => {
    return email.trim().length > 0 && pass.trim().length > 0;
  }, [email, pass]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;

    console.log({ email, pass });
  };

  return (
    <>
      <section className="login">
        <div className="login__inner-wrapper">
          <HelpSidebar active="login" />

          <div className="login-right">
            <h1 className="login-right__title">Авторизация</h1>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-form__fields">
                <Input
                  placeholder="почта"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  autoComplete="email"
                  required
                />

                <Input
                  placeholder="пароль"
                  type="password"
                  value={pass}
                  onChange={setPass}
                  autoComplete="current-password"
                  required
                />
              </div>

              <div
                className={`login-form__submit ${
                  !isComplete ? "is-disabled" : ""
                }`}
              >
                <Button textKey="Войти" href="/" fullWidth />
              </div>

              <Link href="/forgot-password" className="login-form__forgot">
                Забыли свой пароль?
              </Link>

              <div className="login__divider" />

              <div className="login-register">
                <h2 className="login-register__title">
                  Зарегистрироваться
                </h2>

                <p className="login-register__subtitle">
                  зарегистрируйтесь и получите скидку 15% на первую покупку!
                </p>

                <div className="login-register__btn">
                  <Button
                    textKey="Создать аккаунт"
                    href="/registration"
                    fullWidth
                    variant="outline"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Login;
