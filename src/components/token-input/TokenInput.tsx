import { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { RESEND_USER_VERIFICATION_TOKEN } from "./operation";
import { ErrorLike } from "@apollo/client";
import Loader from "../loader/Loader";
import "./token-input.scss";

type TokenInputProps = {
  inputEmail: string | undefined;
  reedeemToken: (token: string) => void;
  loading: boolean;
  error: ErrorLike | undefined;
};

const maskEmailAddress = (email: string | undefined) => {
  if (email) {
    const masked = email.replace(
      /^(.)([^@]*)(@.*)$/,
      (_, first, middle, domain) => {
        return first + "*".repeat(middle.length) + domain;
      }
    );
    return masked;
  }
  return "";
};

function TokenInput({
  inputEmail,
  reedeemToken,
  loading,
  error,
}: TokenInputProps) {
  const SECONDS = 60;
  const TOKEN_LENGTH = 6;
  const [secondsLeft, setSecondsLeft] = useState(SECONDS);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [token, setToken] = useState("");
  const [values, setValues] = useState<string[]>(
    new Array(TOKEN_LENGTH).fill("")
  );

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const input = inputRefs.current[index];

    const digit = value.replace(/\D/g, "");
    const newValues = [...values];
    newValues[index] = digit;
    setValues(newValues);

    const token = newValues.join("");
    setToken(token);

    if (input.nextElementSibling) {
      (input.nextElementSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const input = inputRefs.current[index];
      const newValues = [...values];
      newValues[index] = "";
      setValues(newValues);
      const token = newValues.join("");
      setToken(token);
      if (input.previousElementSibling) {
        (input.previousElementSibling as HTMLInputElement).focus();
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text/plain").replace(/\D/g, "");
    if (!pasted) return;
    const digits = pasted.slice(0, TOKEN_LENGTH).split("");
    if (digits.length > 0) {
      const newValues = new Array("").fill("");
      digits.forEach((d, i) => {
        if (i < TOKEN_LENGTH) {
          newValues[i] = d;
        }
      });
      setValues(newValues);
      setToken(newValues.join(""));
      inputRefs.current[TOKEN_LENGTH - 1].focus();
    }
  };

  const [resendPhoneNumberToken, { loading: isResendLoading }] = useMutation(
    RESEND_USER_VERIFICATION_TOKEN,
    {
      variables: {
        email: inputEmail,
      },
      onCompleted() {
        setSecondsLeft(SECONDS);
      },
    }
  );

  const handleReedeemToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.length < TOKEN_LENGTH) {
      return;
    }
    reedeemToken(token);
  };

  return (
    <div className="token-input">
      <h3 className="token-input__title">Подтвердите почта</h3>
      <h5 className="token-input__subtitle">
        Мы отправили 6-значный код на {maskEmailAddress(inputEmail)}
      </h5>

      <form onSubmit={handleReedeemToken} className="token-input__form">
        <div className="token-input__list">
          {Array.from({ length: TOKEN_LENGTH }).map((value, i) => (
            <input
              key={i}
              className="token-input__cell"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d*"
              maxLength={1}
              value={values[i]}
              autoFocus={i === 0}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              ref={(el) => {
                if (el) {
                  inputRefs.current[i] = el;
                }
              }}
              data-testid="token-input"
            />
          ))}
        </div>

        {error && (
          <span className="token-input__error">
            Неверный или устаревший код!
          </span>
        )}

        <button
          className="token-input__submit"
          type="submit"
          disabled={loading}
        >
          {loading ? <Loader /> : "Подтвердить"}
        </button>
      </form>

      <div className="token-input__resend">
        <span className="token-input__resend-label">Не пришёл код?</span>
        <button
          className="token-input__resend-btn"
          disabled={secondsLeft > 0 || isResendLoading}
          onClick={() => resendPhoneNumberToken()}
        >
          Отправить ещё раз
          {secondsLeft > 0 &&
            `через 00:${String(secondsLeft).padStart(2, "0")}`}
        </button>
      </div>
    </div>
  );
}

export default TokenInput;
