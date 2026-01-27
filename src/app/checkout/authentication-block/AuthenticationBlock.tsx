import { useState } from "react";
import { TypedDocumentNode, gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import Link from "next/link";
import Input from "@/components/input/Input";
import TokenInput from "@/components/token-input/TokenInput";
import { validateLoginFields } from "@/utils/validations";
import { useUserDataExistQuery } from "@/hooks/useUserDataExistQuery";
import { useRegisterUserMutation } from "@/hooks/useRegisterUserMutation";
import { useLoginUserMutation } from "@/hooks/useLoginUserMutation";
import { useVerifyPhoneNumber } from "@/hooks/useVerifyPhoneNumber";
import Loader from "@/components/loader/Loader";
import { User } from "@/types/__generated__/graphql";
import "./authentication-block.scss";

const RESEND_PHONE_NUMBER_TOKEN: TypedDocumentNode<
  {
    resendPhoneNumberToken: string;
  },
  { phoneNumber: string }
> = gql`
  mutation ResendPhoneNumberToken($phoneNumber: String!) {
    resendPhoneNumberToken(phoneNumber: $phoneNumber)
  }
`;

const loginState = {
  email: "",
  password: "",
};

const registerState = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
};

interface AuthenticationState {
  errorFeilds: string[];
  loginState: {
    email: string;
    password: string;
  };
  registerState: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
  };
  currentView: "login" | "register";
}

type AuthenticationBlockProps = {
  authUser: User | null | undefined;
};

function AuthenticationBlock({ authUser }: AuthenticationBlockProps) {
  const [authenticationState, setAuthenticationState] =
    useState<AuthenticationState>({
      errorFeilds: [],
      loginState: loginState,
      registerState: registerState,
      currentView: "login",
    });

  // RESEND PHONE NUMBER TOKEN
  const [resendPhoneNumberToken] = useMutation(RESEND_PHONE_NUMBER_TOKEN);

  const {
    loading: isLoginLoading,
    authorizeUser,
    error,
  } = useLoginUserMutation({
    formState: authenticationState.loginState,
    onComplete(data) {
      if (data && !data.authorizedUser.isPhoneNumberVerified) {
        resendPhoneNumberToken({
          variables: { phoneNumber: data.authorizedUser.phoneNumber! },
        });
      }
    },
  });

  const { loading: isRegisterLoading, registerUser } = useRegisterUserMutation({
    formState: authenticationState.registerState,
    onComplete() {
      setAuthenticationState((prvState) => ({
        ...prvState,
        currentView: "login",
      }));
    },
  });

  const {
    reedeemPhoneToken,
    error: verifyPhoneError,
    loading: verifyPhoneLoading,
  } = useVerifyPhoneNumber({
    phoneNumber: authUser?.phoneNumber as string,
    callback() {},
  });

  const {
    debounceEmailInUse,
    debouncePhoneInUser,
    emailValidation,
    phoneValidation,
  } = useUserDataExistQuery();

  const setCurrentView = (view: "login" | "register") => {
    setAuthenticationState((prvState) => ({
      ...prvState,
      currentView: view,
    }));
  };

  // CONTROL LOGIN INPUT
  const onLoginInputChange = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    setAuthenticationState((preState) => ({
      ...preState,
      loginState: { ...preState.loginState, [name]: value },
    }));
    if (authenticationState.errorFeilds.includes(name)) {
      setAuthenticationState((prvState) => ({
        ...prvState,
        errorFeilds: prvState.errorFeilds.filter((prev) => prev !== name),
      }));
    }
  };

  // CONTROL REGISTER INPUT
  const onRegisterInputChange = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    setAuthenticationState((preState) => ({
      ...preState,
      registerState: { ...preState.registerState, [name]: value },
    }));

    if (name === "email") {
      debounceEmailInUse(value);
    }

    if (name === "phoneNumber") {
      debouncePhoneInUser(value);
    }

    if (authenticationState.errorFeilds.includes(name)) {
      setAuthenticationState((prvState) => ({
        ...prvState,
        errorFeilds: prvState.errorFeilds.filter((prev) => prev !== name),
      }));
    }
  };

  // LOGIN USER
  const handleLoginUser = (e: React.FormEvent) => {
    e.preventDefault();
    const validatedFields = validateLoginFields(authenticationState.loginState);
    if (validatedFields.error) {
      validatedFields.error.issues.forEach((issue) => {
        setAuthenticationState((prvState) => ({
          ...prvState,
          errorFeilds: [...prvState.errorFeilds, issue.path[0].toString()],
        }));
      });
      return;
    }
    authorizeUser();
  };

  // REGISTER USER
  const handleRegisterUser = (e: React.FormEvent) => {
    e.preventDefault();

    const validatedFields = validateLoginFields(
      authenticationState.registerState
    );

    if (validatedFields.error) {
      validatedFields.error.issues.forEach((issue) => {
        setAuthenticationState((prvState) => ({
          ...prvState,
          errorFeilds: [...prvState.errorFeilds, issue.path[0].toString()],
        }));
      });
      return;
    }
    registerUser();
  };

  // VERIFY USER BY PHONE NUMBER
  const reedeemConfirmPhoneNumberToken = (token: string) => {
    reedeemPhoneToken({ variables: { token } });
  };

  return (
    <div className="authentication-block">
      {/* LOGIN USER */}
      {authenticationState.currentView === "login" && !authUser && (
        <div className="authentication-block__login">
          <h3 className="authentication-block__login-title"> Авторизация</h3>
          <form
            onSubmit={handleLoginUser}
            className="authentication-block__login-form"
          >
            <div className="authentication-block__input-wrapper">
              <Input
                name="email"
                initialValue={authenticationState.loginState.email}
                placeholder="Почта"
                type="email"
                onInputChange={onLoginInputChange}
                hasError={authenticationState.errorFeilds.includes("email")}
              />
              <Input
                name="password"
                initialValue={authenticationState.loginState.password}
                placeholder="Пароль"
                type="password"
                onInputChange={onLoginInputChange}
                hasError={authenticationState.errorFeilds.includes("password")}
              />
              {error && (
                <span className="authentication-block__login-error">
                  Неверный почты или пароль
                </span>
              )}
            </div>
            <div className="authentication-block__btn-wrapper">
              <button className="authentication-block__login-btn" type="submit">
                {isLoginLoading ? <Loader /> : "Войти"}
              </button>
              <button
                className="authentication-block__switch-to-register-btn"
                onClick={() => setCurrentView("register")}
                type="button"
              >
                Нет аккаунта? Создать!
              </button>
            </div>
          </form>

          <div className="authentication-block__need-help">
            <h4 className="authentication-block__need-help-heading">
              Есть вопросы? Мы на связи!
            </h4>
            <ul className="authentication-block__need-help-list">
              <li className="authentication-block__need-help-item">
                <Link href="tel:+79651950599">+7(965)-195-05-99</Link>
              </li>
              <li className="authentication-block__need-help-item">
                <Link href="https://t.me/ellcakes1" target="_blank">
                  Написать в Telegram
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* REGISTER USER */}
      {authenticationState.currentView === "register" && !authUser && (
        <div className="authentication-block__register">
          <h3 className="authentication-block__register-title">Регистрация</h3>
          <form
            onSubmit={handleRegisterUser}
            className="authentication-block__register-form"
          >
            <div className="authentication-block__input-wrapper">
              <Input
                initialValue={authenticationState.registerState.name}
                name="name"
                placeholder="Имя"
                onInputChange={onRegisterInputChange}
                type="text"
                hasError={authenticationState.errorFeilds.includes("name")}
              />

              <div className="authentication-block__input-email">
                <Input
                  initialValue={authenticationState.registerState.email}
                  name="email"
                  placeholder="Почта"
                  type="email"
                  onInputChange={onRegisterInputChange}
                  hasError={authenticationState.errorFeilds.includes("email")}
                />
                {emailValidation?.isEmailInUse && (
                  <span className="authentication-block__input-email-validation">
                    почта используется
                  </span>
                )}
              </div>

              <div className="authentication-block__input-phone">
                <Input
                  initialValue={authenticationState.registerState.phoneNumber}
                  name="phoneNumber"
                  placeholder="Телефон"
                  type="tel"
                  onInputChange={onRegisterInputChange}
                  hasError={authenticationState.errorFeilds.includes(
                    "phoneNumber"
                  )}
                />
                {phoneValidation?.isPhoneNumberInUse && (
                  <span className="authentication-block__input-phone-validation">
                    ТЕЛЕФОН используется
                  </span>
                )}
              </div>

              <Input
                initialValue={authenticationState.registerState.password}
                name="password"
                placeholder="Пароль"
                type="password"
                onInputChange={onRegisterInputChange}
                hasError={authenticationState.errorFeilds.includes("password")}
              />
            </div>
            <div className="authentication-block__btn-wrapper">
              <button
                className="authentication-block__register-btn"
                type="submit"
              >
                {isRegisterLoading ? <Loader /> : "Зарегистрироваться"}
              </button>
              <button
                className="authentication-block__switch-to-login-btn"
                onClick={() => setCurrentView("login")}
                type="button"
              >
                Уже есть аккаунт ?
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VERIFIY USER PHONE NUMBER */}
      {authUser && !authUser.isPhoneNumberVerified && (
        <div className="authentication-block__register">
          <TokenInput
            inputPhoneNumber={authUser?.phoneNumber as string}
            reedeemToken={reedeemConfirmPhoneNumberToken}
            error={verifyPhoneError}
            loading={verifyPhoneLoading}
          />
        </div>
      )}
    </div>
  );
}
export default AuthenticationBlock;
