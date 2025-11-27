"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import HelpSidebar from "@/components/help-sidebar/HelpSidebar";
import "./login.scss";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [formState, setFormState] = useState(initialState);

  // I need to undderstand why this ?
  const isComplete = useMemo(() => {
    const { email, password } = formState;
    return email.trim().length > 0 && password.trim().length > 0;
  }, [formState]);

  const onInputChange = ({ name, value }: { name: string; value: string }) => {
    setFormState((prvState) => ({
      ...prvState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;
  };

  return (
    <section className="login">
      <div className="login__inner-wrapper">
        <HelpSidebar active="login" />

        <div className="login-right">
          <h3 className="login-right__title" data-testid="login-page-heading">
            Авторизация
          </h3>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__fields">
              <Input
                initialValue={formState.email}
                name="email"
                placeholder="почта"
                type="email"
                autoComplete="email"
                required
                onInputChange={onInputChange}
              />

              <Input
                initialValue={formState.password}
                name="password"
                placeholder="пароль"
                type="password"
                autoComplete="current-password"
                required
                onInputChange={onInputChange}
              />
            </div>

            <div
              className={`login-form__submit ${
                !isComplete ? "is-disabled" : ""
              }`}
            >
              <Button textKey="Войти" href="/" fullWidth />
            </div>

            <Link
              href="/reset-password"
              aria-current="page"
              className="login-form__forgot"
              data-testid="login-page-link"
            >
              Забыли свой пароль?
            </Link>

            <div className="login__divider" />

            <div className="login-register">
              <h4
                className="login-register__title"
                data-testid="login-page-title"
              >
                Зарегистрироваться
              </h4>

              <h5
                className="login-register__subtitle"
                data-testid="login-page-sub-title"
              >
                зарегистрируйтесь и получите скидку 15% на первую покупку!
              </h5>

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
  );
}

export default Login;
