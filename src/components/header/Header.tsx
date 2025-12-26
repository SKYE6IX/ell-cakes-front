import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "./navigation/Navigation";
import CartMenuBtn from "./cart-menu/CartMenuBtn";
import MenuButton from "./MenuButton";
import { PreloadQuery } from "@/ApolloClient";
import { GET_CATEGORIES } from "./operation";
import "./header.scss";
import UserMenu from "./user-menu/UserMenu";

async function Header() {
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

        <PreloadQuery
          query={GET_CATEGORIES}
          variables={{ where: { parent: { slug: { equals: "torty" } } } }}
        >
          {(queryRef) => (
            <Suspense>
              <Navigation queryRef={queryRef} />
            </Suspense>
          )}
        </PreloadQuery>

        <div className="header__user-action-wrapper">
          <UserMenu />
          <CartMenuBtn />
          <MenuButton />
        </div>
      </div>
    </header>
  );
}
export default Header;
