import Image from "next/image";
import Link from "next/link";
import Navigation from "./navigation/Navigation";
import CartMenuBtn from "./cart-menu/CartMenuBtn";
import MenuButton from "./MenuButton";
import Authentication from "@/authentication/Authentication";
import "./header.scss";

function Header() {
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
        <Navigation />
        <div className="header__user-action-wrapper">
          <Authentication />
          <CartMenuBtn />
          <MenuButton />
        </div>
      </div>
    </header>
  );
}
export default Header;
