import Image from "next/image";
import Link from "next/link";
import Navigation from "./navigation/Navigation";
import CartMenuBtn from "./cart-menu/CartMenuBtn";
import MenuButton from "./MenuButton";
import Authentication from "@/authentication/Authentication";
import { getClient } from "@/ApolloClient";
import { GET_CATEGORIES } from "./operation";
import "./header.scss";

async function getCategories() {
  const client = await getClient();
  try {
    const { data } = await client.query({
      query: GET_CATEGORIES,
      variables: { where: { isAvailable: { equals: true } } },
    });
    return data?.categories;
  } catch (error) {
    console.error("Error occur when fetching categorie -> ", error);
    return null;
  }
}

async function Header() {
  const categories = await getCategories();

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
        <Navigation categories={categories} />
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
