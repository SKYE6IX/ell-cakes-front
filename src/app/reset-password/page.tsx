"use client";
import { useMemo, useState } from "react";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import "./reset-password.scss";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const isComplete = useMemo(() => email.trim().length > 0, [email]);
  const onInputChange = ({ value }: { name: string; value: string }) => {
    setEmail(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;
  };

  return (
    <section className="reset-password">
      <div className="reset-password__inner-wrapper">
        <div className="reset-password-card">
          <h3 className="reset-password-card__title">Смена пароля</h3>
          <form className="reset-password-form" onSubmit={handleSubmit}>
            <Input
              initialValue={email}
              name="email"
              placeholder="ПОЧТА"
              type="email"
              hasError={false}
              onInputChange={onInputChange}
            />
            <div
              className={`reset-password-form__submit ${
                !isComplete ? "is-disabled" : ""
              }`}
            >
              <Button textKey="Отправить" href="/" fullWidth />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
