"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "./navigation/Navigation";
import UserMenu from "./user-menu/UserMenu";
import CartMenu from "./cart-menu/CartMenu";
import MenuBarIcon from "../icons/MenuBarIcon";
import "./header.scss";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
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

        <Navigation isMenuOpen={isMenuOpen} />
        <div className="header__user-action-wrapper">
          <UserMenu />
          <CartMenu />
          <button
            className={["header__menu-button", isMenuOpen ? "active" : ""].join(
              " "
            )}
            onClick={handleMenuOpen}
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
