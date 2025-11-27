import { useState } from "react";
import "./input.scss";

interface InputProps {
  name: string;
  placeholder: string;
  initialValue: string;
  onInputChange: ({}: { name: string; value: string }) => void;
  type?: "text" | "email" | "password" | "tel";
  autoComplete?: string;
  required?: boolean;
}

export default function Input({
  name,
  placeholder,
  initialValue,
  onInputChange,
  type = "text",
  autoComplete,
  required,
}: InputProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputValue(value);
    onInputChange({ name, value });
  };

  return (
    <input
      className="input"
      type={type}
      name={name}
      autoComplete={autoComplete}
      required={required}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
    />
  );
}
