"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useLazyQuery } from "@apollo/client/react";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import HelpSidebar from "@/components/help-sidebar/HelpSidebar";
import {
  REGISTER_USER,
  IS_EMAIL_IN_USE,
  IS_PHONE_NUMBER_IN_USE,
} from "./operation";
import { validateRegistrationFields } from "@/utils/validations";
import { userVar } from "@/lib/cache";
import "./registration.scss";

const initialState = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
};

const debounce = (fn: (arg: string) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (arg: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(arg), delay);
  };
};

function RegistrationPage() {
  const router = useRouter();
  const [formState, setFormState] = useState(initialState);
  const [errorFeilds, setErrorFeilds] = useState<string[]>([]);
  const [subscribe, setSubscribe] = useState(false);

  const [isEmailInUse, { data: emailValidation }] = useLazyQuery(
    IS_EMAIL_IN_USE,
    { fetchPolicy: "network-only" }
  );
  const [isPhoneInUse, { data: phoneValidation }] = useLazyQuery(
    IS_PHONE_NUMBER_IN_USE,
    { fetchPolicy: "network-only" }
  );

  const executeEmailInUse = (email: string) => {
    isEmailInUse({ variables: { email } });
  };
  const executePhoneInUse = (phoneNumber: string) => {
    isPhoneInUse({ variables: { phoneNumber } });
  };
  const debounceEmailInUse = debounce(executeEmailInUse, 500);
  const debouncePhoneInUser = debounce(executePhoneInUse, 500);

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    variables: { registerData: formState },
    onCompleted(data) {
      router.push("/confirm-phone");
      userVar(data.registerUser);
    },
  });

  const onInputChange = ({ name, value }: { name: string; value: string }) => {
    setFormState((prvState) => ({ ...prvState, [name]: value }));

    // Check for exising data
    if (name === "email") {
      debounceEmailInUse(value);
    }
    if (name === "phoneNumber") {
      debouncePhoneInUser(value);
    }

    if (errorFeilds.includes(name)) {
      // Field sanitize and validation
      setErrorFeilds((prevState) => prevState.filter((prev) => prev !== name));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validatedFields = validateRegistrationFields(formState);
    if (validatedFields.error) {
      validatedFields.error.issues.forEach((issue) => {
        setErrorFeilds((prevState) => [...prevState, issue.path[0].toString()]);
      });
      return;
    }
    registerUser();
  };

  return (
    <section className="registration">
      <div className="registration__inner-wrapper">
        <HelpSidebar active="register" />

        <div className="registration-right">
          <h3
            className="registration-right__title"
            data-testid="registration-page-heading"
          >
            Регистрация
          </h3>

          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="registration-form__fields">
              <Input
                initialValue={formState.name}
                name="name"
                placeholder="имя"
                onInputChange={onInputChange}
                type="text"
                hasError={errorFeilds.includes("name")}
              />
              <Input
                initialValue={formState.phoneNumber}
                name="phoneNumber"
                placeholder="ТЕЛЕФОН"
                type="tel"
                onInputChange={onInputChange}
                hasError={errorFeilds.includes("phoneNumber")}
              />
              {phoneValidation?.isPhoneNumberInUse && (
                <span className="registration__field-validation">
                  ТЕЛЕФОН используется
                </span>
              )}
              <Input
                initialValue={formState.email}
                name="email"
                placeholder="ПОЧТА"
                type="email"
                onInputChange={onInputChange}
                hasError={errorFeilds.includes("email")}
              />
              {emailValidation?.isEmailInUse && (
                <span className="registration__field-validation">
                  почта используется
                </span>
              )}
              <Input
                initialValue={formState.password}
                name="password"
                placeholder="ПАРОЛЬ"
                type="password"
                onInputChange={onInputChange}
                hasError={errorFeilds.includes("password")}
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

            <button
              className="registration-form__submit-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="loader"></div>
              ) : (
                <span>Зарегистрироваться</span>
              )}
            </button>

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
                href="/login"
                textKey="Уже есть аккаунт"
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
