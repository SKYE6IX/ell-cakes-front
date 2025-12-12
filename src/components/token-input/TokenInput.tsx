import { useState, useRef, useEffect } from "react";
import "./token-input.scss";

type TokenInputProps = {
  handleSetToken: ({ token }: { token: string }) => void;
};

function TokenInput({ handleSetToken }: TokenInputProps) {
  const TOKEN_LENGTH = 6;
  const [secondsLeft, setSecondsLeft] = useState(60);
  const inputRefs = useRef<HTMLInputElement[]>([]);
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
    handleSetToken({ token });

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
      handleSetToken({ token });
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
      inputRefs.current[TOKEN_LENGTH - 1].focus();
    }
  };

  return (
    <div className="token-input">
      <h3 className="token-input__title">Подтвердите номер</h3>
      <h5 className="token-input__subtitle">
        Мы отправили 6-значный код на +7 993 233 4556
      </h5>

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

      <button className="token-input__submit" disabled>
        Подтвердить
      </button>

      <div className="token-input__resend">
        <span className="token-input__resend-label">Не пришёл код?</span>
        <button className="token-input__resend-btn" disabled={secondsLeft > 0}>
          Отправить ещё раз
          {secondsLeft > 0 &&
            `через 00:${String(secondsLeft).padStart(2, "0")}`}
        </button>
      </div>
    </div>
  );
}
export default TokenInput;
