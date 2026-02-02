"use client";
import { useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import Input from "@/components/input/Input";
import TokenInput from "@/components/token-input/TokenInput";
import Loader from "@/components/loader/Loader";
import {
  REQUEST_PASSWORD_RESET_TOKEN,
  VALIDATE_PASSWORD_RESET_TOKEN,
  UPDATE_PASSWORD,
} from "./operation";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";
import "./reset-password.scss";

interface IResetPasswordState {
  token: string;
  email: string;
  password: string;
  stage: "request" | "confirm" | "reset";
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [resetPasswordState, setResetPasswordState] =
    useState<IResetPasswordState>({
      token: "",
      email: "",
      password: "",
      stage: "request",
    });

  const onInputChange = ({ value, name }: { name: string; value: string }) => {
    setResetPasswordState((prvState) => ({ ...prvState, [name]: value }));
  };

  // VALIDATE PASSWORD RESET TOKEN
  const [
    validatePasswordResetToken,
    { error: isValidateError, loading: isValidateLoading },
  ] = useLazyQuery(VALIDATE_PASSWORD_RESET_TOKEN);

  const reedeemPasswordResetToken = async (token: string) => {
    const { data } = await validatePasswordResetToken({
      variables: {
        token: token,
        email: resetPasswordState.email,
      },
    });
    if (data?.validatePasswordResetToken) {
      setResetPasswordState((prvState) => ({
        ...prvState,
        token,
        stage: "reset",
      }));
    } else {
    }
  };

  // REQUEST PASSWORD TOKEN MUTATION!
  const [
    requestPasswordResetToken,
    { loading: isRequestLoading, error: requestError },
  ] = useMutation(REQUEST_PASSWORD_RESET_TOKEN, {
    variables: { email: resetPasswordState.email },
    onCompleted(data) {
      if (data.sendPasswordResetToken) {
        setResetPasswordState((prvState) => ({
          ...prvState,
          stage: "confirm",
        }));
      }
    },
  });

  // UPDATE PASSOWRD MUTATION!
  const [updatePassword, { loading: isUpdateLoading, error: updateError }] =
    useMutation(UPDATE_PASSWORD, {
      variables: {
        token: resetPasswordState.token,
        email: resetPasswordState.email,
        newPassword: resetPasswordState.password,
      },
      onCompleted() {
        router.push("/dashboard");
      },
      refetchQueries(result) {
        if (result.data.updatePassword) {
          return [AUTHORIZED_USER_QUERY];
        }
        return [];
      },
    });

  // REQUEST PASSWORD TOKEN
  const handleRequestResetToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPasswordState.email) {
      return;
    }
    requestPasswordResetToken();
  };

  // UPDATE PASSOWRD!
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const { token, email, password } = resetPasswordState;
    if (!token || !email || !password) {
      return;
    }
    updatePassword();
  };

  return (
    <section className="reset-password">
      <div className="reset-password__inner-wrapper">
        <div className="reset-password-card">
          {/* FIRST STEP */}
          {resetPasswordState.stage === "request" && (
            <>
              <h3 className="reset-password-card__title">Смена пароля</h3>
              <form
                className="reset-password-form"
                onSubmit={handleRequestResetToken}
              >
                <Input
                  initialValue={resetPasswordState.email}
                  name="email"
                  placeholder="Почта"
                  type="email"
                  onInputChange={onInputChange}
                  hasError={false}
                />

                {requestError && (
                  <span className="reset-password__error">
                    Пользователь не существует!
                  </span>
                )}

                <button
                  className="reset-password-form__submit"
                  type="submit"
                  disabled={isRequestLoading}
                >
                  {isRequestLoading ? <Loader /> : "Отправить "}
                </button>
              </form>
            </>
          )}

          {/* SECOND STEP */}
          {resetPasswordState.stage === "confirm" && (
            <TokenInput
              inputEmail={resetPasswordState.email}
              reedeemToken={reedeemPasswordResetToken}
              error={isValidateError}
              loading={isValidateLoading}
            />
          )}

          {/* LAST STEP */}
          {resetPasswordState.stage === "reset" && (
            <div className="reset-password__new-password">
              <h3 className="reset-password__new-password-header">
                Введите новый пароль
              </h3>
              <form onSubmit={handleUpdatePassword}>
                <Input
                  initialValue={resetPasswordState.password}
                  name="password"
                  placeholder="ПАРОЛЬ"
                  type="password"
                  onInputChange={onInputChange}
                  hasError={false}
                />

                {updateError && (
                  <span className="reset-password__error">
                    Не удалось обновить пароль. Попробуйте еще раз.
                  </span>
                )}

                <button
                  className="reset-password__submit-new-password"
                  disabled={isUpdateLoading}
                  type="submit"
                >
                  {isUpdateLoading ? <Loader /> : "Подтвердить"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
