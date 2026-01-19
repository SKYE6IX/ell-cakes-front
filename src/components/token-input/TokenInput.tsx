import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";
import {
  REEDEEM_PHONE_NUMBER_TOKEN,
  RESEND_PHONE_NUMBER_TOKEN,
} from "./operation";
import Loader from "../loader/Loader";
import "./token-input.scss";

type TokenInputProps = {
  onTokenReedeem: () => void;
};

const maskPhoneNumber = (phoneNumber: string) => {
  const cleaned = phoneNumber.replace(/\D/g, "");

  const countryAndOperator = "+7 " + cleaned.slice(1, 4);
  const hiddenPart = "*** **";
  const lastDigits = cleaned.slice(-2);
  return `${countryAndOperator} ${hiddenPart} ${lastDigits}`;
};

function TokenInput({ onTokenReedeem }: TokenInputProps) {
  const { data } = useQuery(AUTHORIZED_USER_QUERY);
  const authUser = data?.queryAuthorizedUser;

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
    RESEND_PHONE_NUMBER_TOKEN,
    {
      variables: {
        phoneNumber: authUser?.phoneNumber || "",
      },
      onCompleted() {
        setSecondsLeft(SECONDS);
      },
    }
  );

  const [reedeemPhoneToken, { loading, error }] = useMutation(
    REEDEEM_PHONE_NUMBER_TOKEN,
    {
      variables: {
        token,
        phoneNumber: authUser?.phoneNumber || "",
      },
      onCompleted(data) {
        if (data.redeemPhoneNumberToken.status) {
          onTokenReedeem();
        }
      },

      refetchQueries(result) {
        if (result.data.redeemPhoneNumberToken.status) {
          return [AUTHORIZED_USER_QUERY];
        }
        return [];
      },
    }
  );

  const handleReedeemToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.length < TOKEN_LENGTH) {
      return;
    }
    reedeemPhoneToken();
  };

  return (
    <div className="token-input">
      <h3 className="token-input__title">Подтвердите номер</h3>
      <h5 className="token-input__subtitle">
        Мы отправили 6-значный код на{" "}
        {maskPhoneNumber(authUser?.phoneNumber || "79932334556")}
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
