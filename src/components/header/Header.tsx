"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "./navigation/Navigation";
import UserMenu from "./user-menu/UserMenu";
import CartMenuBtn from "./cart-menu/CartMenuBtn";
import MenuBarIcon from "../icons/MenuBarIcon";
import { Category } from "@/types/__generated__/graphql";
import "./header.scss";

type HeaderProps = {
  categories: Category[] | undefined;
};

function Header({ categories }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const handleSetIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <header className="header">
      <div className="header__inner-wrapper">
        <div className="header__site-icon">
          <Link href="/">
            <Image
              src="/ell-cake-icon.png"
              width={98}
              height={63}
              alt="Site Icon"
              data-testid="header-site-icon"
              loading="eager"
            />
          </Link>
        </div>

        <Navigation
          isMenuOpen={isMenuOpen}
          categories={categories}
          closeMenu={closeMenu}
        />
        <div className="header__user-action-wrapper">
          <UserMenu />
          <CartMenuBtn />
          <button
            className={["header__menu-button", isMenuOpen ? "active" : ""].join(
              " "
            )}
            onClick={handleSetIsMenuOpen}
            data-testid="header-menu-button"
          >
            <MenuBarIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
export default Header;
