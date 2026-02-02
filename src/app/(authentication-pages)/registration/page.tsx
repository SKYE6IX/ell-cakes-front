"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { validateRegistrationFields } from "@/utils/validations";
import { useUserDataExistQuery } from "@/hooks/useUserDataExistQuery";
import { useRegisterUserMutation } from "@/hooks/useRegisterUserMutation";
import Loader from "@/components/loader/Loader";
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

  const {
    emailValidation,
    phoneValidation,
    debounceEmailInUse,
    debouncePhoneInUser,
  } = useUserDataExistQuery();
  const { registerUser, loading } = useRegisterUserMutation({
    formState,
    onComplete() {
      router.push("/verify-user");
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
      <h3
        className="registration__heading"
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
          <div className="registration-form__fields-phone">
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
          </div>

          <div className="registration-form__fields-email">
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
          </div>

          <Input
            initialValue={formState.password}
            name="password"
            placeholder="Пароль"
            type="password"
            onInputChange={onInputChange}
            hasError={errorFeilds.includes("password")}
          />
        </div>

        <button
          className="registration-form__submit-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? <Loader /> : <span>Зарегистрироваться</span>}
        </button>
      </form>

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
    </section>
  );
}

export default RegistrationPage;
