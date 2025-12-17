"use client";
import { useEffect } from "react";
import { useReactiveVar } from "@apollo/client/react";
import { isMenuOpenVar } from "@/lib/cache";
import MenuBarIcon from "../icons/MenuBarIcon";
import "./header.scss";

function MenuButton() {
  const isMenuOpen = useReactiveVar(isMenuOpenVar);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <button
      className={["header__menu-button", isMenuOpen ? "active" : ""].join(" ")}
      onClick={() => isMenuOpenVar(!isMenuOpen)}
      data-testid="header-menu-button"
    >
      <MenuBarIcon />
    </button>
  );
}

export default MenuButton;
