import { useState } from "react";
import Input from "@/components/input/Input";
import TokenInput from "@/components/token-input/TokenInput";
import { validateLoginFields } from "@/utils/validations";
import { useUserDataExistQuery } from "@/hooks/useUserDataExistQuery";
import { useRegisterUserMutation } from "@/hooks/useRegisterUserMutation";
import { useLoginUserMutation } from "@/hooks/useLoginUserMutation";
import "./authentication-block.scss";

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

function AuthenticationBlock() {
  const [authenticationState, setAuthenticationState] =
    useState<AuthenticationState>({
      errorFeilds: [],
      loginState: loginState,
      registerState: registerState,
      currentView: "login",
    });
  const [tokenState, setTokenState] = useState({
    isOpen: false,
    token: "",
  });

  const {
    loading: isLoginLoading,
    authorizeUser,
    error,
  } = useLoginUserMutation({
    formState: authenticationState.loginState,
    onComplete() {},
  });

  const { loading: isRegisterLoading, registerUser } = useRegisterUserMutation({
    formState: authenticationState.registerState,
    onComplete() {
      setTokenState((prvState) => ({ ...prvState, isOpen: !prvState.isOpen }));
    },
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

  const handleSetToken = ({ token }: { token: string }) => {
    setTokenState((prvState) => ({ ...prvState, token }));
  };

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

  return (
    <div className="authentication-block">
      {authenticationState.currentView === "login" && (
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
                {isLoginLoading ? <div className="loader"></div> : "Войти"}
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
        </div>
      )}

      {authenticationState.currentView === "register" && (
        <div className="authentication-block__register">
          {tokenState.isOpen ? (
            <TokenInput handleSetToken={handleSetToken} />
          ) : (
            <>
              <h3 className="authentication-block__register-title">
                Регистрация
              </h3>
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
                      hasError={authenticationState.errorFeilds.includes(
                        "email"
                      )}
                    />
                    {emailValidation?.isEmailInUse && (
                      <span className="authentication-block__input-email-validation">
                        почта используется
                      </span>
                    )}
                  </div>

                  <div className="authentication-block__input-phone">
                    <Input
                      initialValue={
                        authenticationState.registerState.phoneNumber
                      }
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
                    hasError={authenticationState.errorFeilds.includes(
                      "password"
                    )}
                  />
                </div>
                <div className="authentication-block__btn-wrapper">
                  <button
                    className="authentication-block__register-btn"
                    type="submit"
                  >
                    {isRegisterLoading ? (
                      <div className="loader"></div>
                    ) : (
                      "Зарегистрироваться"
                    )}
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default AuthenticationBlock;
