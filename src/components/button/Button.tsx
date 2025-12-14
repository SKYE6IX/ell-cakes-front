import React from "react";
import Link from "next/link";
import "./button.scss";

interface ButtonProps {
  textKey: string;
  href?: string;
  handleClick?: () => void;
  disabled?: boolean;
  target?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "outline";
}

function Button({
  textKey,
  href,
  disabled,
  target,
  fullWidth = false,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant} ${fullWidth ? "button--full" : ""}`}
      disabled={disabled}
    >
      <Link
        href={href ? href : ""}
        className="button__link"
        target={target ? "_blank" : ""}
        aria-disabled={disabled}
      >
        <span className="button__text">{textKey}</span>
      </Link>
    </button>
  );
}

export default Button;
