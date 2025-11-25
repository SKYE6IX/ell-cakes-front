"use client";

import "./input.scss";

interface InputProps {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "email" | "password" | "tel";
  name?: string;
  autoComplete?: string;
  required?: boolean;
}

export default function Input({
  placeholder,
  value = "",
  onChange,
  type = "text",
  name,
  autoComplete,
  required,
}: InputProps) {
  return (
    <input
      className="input"
      type={type}
      name={name}
      autoComplete={autoComplete}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}
