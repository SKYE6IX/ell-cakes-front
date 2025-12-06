"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useReactiveVar } from "@apollo/client/react";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import HelpSidebar from "@/components/help-sidebar/HelpSidebar";
import { validateLoginFields } from "@/utils/validations";
import { AUTHORIZED_USER } from "./operation";
import { CONNECT_CART_TO_USER } from "@/components/cart/operations";
import { userVar, cartVar } from "@/lib/cache";
import { OrderDirection } from "@/types/__generated__/graphql";
import "./login.scss";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const router = useRouter();
  const [formState, setFormState] = useState(initialState);
  const [errorFeilds, setErrorFeilds] = useState<string[]>([]);

  const cart = useReactiveVar(cartVar);
  const [connectCartToUser] = useMutation(CONNECT_CART_TO_USER, {
    variables: {
      takeImage: 1,
      cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
      orderImagesBy: [{ createdAt: OrderDirection.Asc }],
    },
    onCompleted(data) {
      cartVar(data.connectCartToUser);
    },
  });

  const [authorizeUser, { loading, error }] = useMutation(AUTHORIZED_USER, {
    variables: formState,
    onCompleted(data) {
      userVar(data.authorizedUser);
      router.push("/dashboard");

      if (cart) {
        connectCartToUser({ variables: { userId: data.authorizedUser.id } });
      }
    },

    onError(error) {
      console.error("Error happen when log in", error);
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
                onInputChange={onInputChange}
                hasError={errorFeilds.includes("email")}
              />

              <Input
                initialValue={formState.password}
                name="password"
                placeholder="пароль"
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
              {loading ? <div className="loader"></div> : <span>Войти</span>}
            </button>

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
