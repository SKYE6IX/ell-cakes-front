import { useState } from "react";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import "./input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  value: string;
  onInputChange: ({}: { name: string; value: string }) => void;
  type: "text" | "email" | "password" | "tel";
  hasError: boolean;
  customClassName?: string;
}

export default function Input({
  name,
  placeholder,
  value,
  onInputChange,
  type,
  hasError,
  disabled,
  customClassName,
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      onInputChange({ name, value: value.replace(/[+\s-]/g, "") });
    } else {
      onInputChange({ name, value });
    }
  };

  return (
    <input
      className={["input", hasError ? "error" : "", customClassName].join(" ")}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}
