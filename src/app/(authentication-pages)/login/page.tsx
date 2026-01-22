"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { validateLoginFields } from "@/utils/validations";
import { useLoginUserMutation } from "@/hooks/useLoginUserMutation";
import Loader from "@/components/loader/Loader";
import "./login.scss";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const router = useRouter();
  const [formState, setFormState] = useState(initialState);
  const [errorFeilds, setErrorFeilds] = useState<string[]>([]);

  const { authorizeUser, loading, error } = useLoginUserMutation({
    formState,
    onComplete() {
      router.push("/dashboard");
    },
  });

  const onInputChange = ({ name, value }: { name: string; value: string }) => {
    setFormState((prvState) => ({
      ...prvState,
      [name]: value,
    }));
    if (errorFeilds.includes(name)) {
      setErrorFeilds((prevState) => prevState.filter((prev) => prev !== name));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validatedFields = validateLoginFields(formState);
    if (validatedFields.error) {
      validatedFields.error.issues.forEach((issue) => {
        setErrorFeilds((prevState) => [...prevState, issue.path[0].toString()]);
      });
      return;
    }
    authorizeUser();
  };

  return (
    <section className="login">
      <h3 className="login-right__title" data-testid="login-page-heading">
        Авторизация
      </h3>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__fields">
          <Input
            initialValue={formState.email}
            name="email"
            placeholder="Почта"
            type="email"
            onInputChange={onInputChange}
            hasError={errorFeilds.includes("email")}
          />

          <Input
            initialValue={formState.password}
            name="password"
            placeholder="Пароль"
            type="password"
            onInputChange={onInputChange}
            hasError={errorFeilds.includes("password")}
          />

          {error && (
            <span className="login-form__error-message">
              Неверный почты или пароль
            </span>
          )}
        </div>

        <button type="submit" className="login-form__submit-button">
          {loading ? <Loader /> : <span>Войти</span>}
        </button>
      </form>

      <Link
        href="/reset-password"
        aria-current="page"
        className="login-form__forgot"
        data-testid="login-page-link"
      >
        Забыли свой пароль?
      </Link>

      <div className="login__divider" />

      <div className="login__footer">
        <h5
          className="login__footer__subtitle"
          data-testid="login-page-sub-title"
        >
          зарегистрируйтесь и получите скидку 15% на первую покупку!
        </h5>

        <div className="login__footer-btn">
          <Button
            textKey="Создать аккаунт"
            href="/registration"
            fullWidth
            variant="outline"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
