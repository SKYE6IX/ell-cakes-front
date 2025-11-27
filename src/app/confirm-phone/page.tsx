"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/button/Button";
import HelpSidebar from "@/components/help-sidebar/HelpSidebar";
import "./confirm-phone.scss";

interface ConfirmPhonePageProps {
  phone?: string;
  onConfirm?: (code: string) => void;
  onResend?: () => void;
  onChangePhoneClick?: () => void; 
  confirmHref?: string;          
  changePhoneHref?: string;       
}

function ConfirmPhonePage({
  phone = "+7 xxx xxx-xx-xx",
  onConfirm,
  onResend,
  onChangePhoneClick,
}: ConfirmPhonePageProps) {
  const LEN = 6;

  const [codeArr, setCodeArr] = useState<string[]>(
    Array.from({ length: LEN }, () => "")
  );
  const [secondsLeft, setSecondsLeft] = useState(60);

  const code = useMemo(() => codeArr.join(""), [codeArr]);
  const isComplete = useMemo(
    () => code.replace(/\D/g, "").length === LEN,
    [code]
  );

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const getInputs = (el: HTMLInputElement) =>
    Array.from(
      el.parentElement?.querySelectorAll<HTMLInputElement>(".otp__cell") ?? []
    );

  const handleChange = (i: number, raw: string, el: HTMLInputElement) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const next = [...codeArr];
    next[i] = digit;
    setCodeArr(next);

    if (digit) {
      const inputs = getInputs(el);
      inputs[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    const inputs = getInputs(el);

    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...codeArr];

      if (next[i]) {
        next[i] = "";
        setCodeArr(next);
      } else if (i > 0) {
        inputs[i - 1]?.focus();
        next[i - 1] = "";
        setCodeArr(next);
      }
    }

    if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      inputs[i - 1]?.focus();
    }
    if (e.key === "ArrowRight" && i < LEN - 1) {
      e.preventDefault();
      inputs[i + 1]?.focus();
    }
  };

  const handlePaste = (i: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    e.preventDefault();
    const digits = pasted.slice(0, LEN - i).split("");

    const next = [...codeArr];
    digits.forEach((d, idx) => {
      next[i + idx] = d;
    });
    setCodeArr(next);

    const inputs = getInputs(e.currentTarget);
    const lastIndex = Math.min(i + digits.length - 1, LEN - 1);
    inputs[lastIndex]?.focus();
  };

  const handleConfirmClick = () => {
    if (!isComplete) return;
    onConfirm?.(code);
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(45);
    setCodeArr(Array.from({ length: LEN }, () => ""));
    onResend?.();
  };

  return (
    <section className="confirm-phone">
      <div className="confirm-phone__inner-wrapper">
      <HelpSidebar active="register"/>

        {/* RIGHT */}
        <div className="confirm-phone-right">
          <h1 className="confirm-phone-right__title">Подтвердите номер</h1>
          <p className="confirm-phone-right__subtitle">
            Мы отправили 6-значный код на {phone}
          </p>

          <div className="confirm-phone-form">
            <div className="confirm-phone-otp">
              {codeArr.map((v, i) => (
                <input
                  key={i}
                  className="confirm-phone-otp__cell"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="\d*"
                  maxLength={1}
                  value={v}
                  autoFocus={i === 0}
                  onChange={(e) =>
                    handleChange(i, e.target.value, e.currentTarget)
                  }
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={(e) => handlePaste(i, e)}
                />
              ))}
            </div>

            {/* confirm button */}
            <div
              className={`confirm-phone-form__submit ${
                !isComplete ? "is-disabled" : ""
              }`}
              onClick={handleConfirmClick}
            >
              <Button textKey="Подтвердить" href="/" fullWidth/>
            </div>

            {/* resend */}
            <div className="confirm-phone-resend">
              <span className="confirm-phone-resend__label">Не пришёл код?</span>
              <button
                type="button"
                className={`confirm-phone-resend__btn ${secondsLeft > 0 ? "is-disabled" : ""}`}
                onClick={handleResend}
                disabled={secondsLeft > 0}
              >
                Отправить ещё раз
                {secondsLeft > 0 &&
                  ` через 00:${String(secondsLeft).padStart(2, "0")}`}
              </button>
            </div>

            <div className="confirm-phone__divider" />

            {/* change phone button */}
            <div className="confirm-phone__change" onClick={onChangePhoneClick}>
              <Button textKey="Изменить номер" href="/" fullWidth variant="outline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConfirmPhonePage;