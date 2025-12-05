import { useState } from "react";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import "./input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  initialValue: string;
  onInputChange: ({}: { name: string; value: string }) => void;
  type: "text" | "email" | "password" | "tel";
  hasError: boolean;
}

export default function Input({
  name,
  placeholder,
  initialValue,
  onInputChange,
  type,
  hasError,
  disabled,
}: InputProps) {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const formatedNumber = formatPhoneNumber(value);
      setInputValue(formatedNumber);
      onInputChange({ name, value: value.replace(/[+\s-]/g, "") });
    } else {
      setInputValue(value);
      onInputChange({ name, value });
    }
  };

  return (
    <input
      className={`input ${hasError ? "error" : ""}`}
      type={type}
      name={name}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}
