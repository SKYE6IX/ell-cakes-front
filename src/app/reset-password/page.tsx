"use client";

import { useMemo, useState } from "react";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Footer from "@/components/footer/Footer";
import "./reset-password.scss";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const isComplete = useMemo(() => email.trim().length > 0, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;

    console.log({ email });
  };

  return (
    <>
      <section className="reset-password">
        <div className="reset-password__inner-wrapper">
          <div className="reset-password-card">
            <h1 className="reset-password-card__title">Смена пароля</h1>

            <form className="reset-password-form" onSubmit={handleSubmit}>
              <Input
                placeholder="ПОЧТА"
                type="email"
                value={email}
                onChange={setEmail}
                autoComplete="email"
                required
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

      <Footer />
    </>
  );
}
