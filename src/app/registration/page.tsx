"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import HelpSidebar from "@/components/help-sidebar/HelpSidebar";
import { validateRegistrationFields } from "@/utils/validations";
import { useUserDataExistQuery } from "@/hooks/useUserDataExistQuery";
import { useRegisterUserMutation } from "@/hooks/useRegisterUserMutation";
import "./registration.scss";

const initialState = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
};

function RegistrationPage() {
  const router = useRouter();
  const [formState, setFormState] = useState(initialState);
  const [errorFeilds, setErrorFeilds] = useState<string[]>([]);
  const [subscribe, setSubscribe] = useState(false);

  const {
    emailValidation,
    phoneValidation,
    debounceEmailInUse,
    debouncePhoneInUser,
  } = useUserDataExistQuery();
  const { registerUser, loading } = useRegisterUserMutation({
    formState,
    onComplete() {
      router.push("/confirm-phone");
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
                placeholder="Имя"
                onInputChange={onInputChange}
                type="text"
                hasError={errorFeilds.includes("name")}
              />
              <Input
                initialValue={formState.phoneNumber}
                name="phoneNumber"
                placeholder="Телефон"
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
                placeholder="Почта"
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
                placeholder="Пароль"
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
