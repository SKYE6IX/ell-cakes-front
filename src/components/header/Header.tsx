"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Navigation from "./navigation/Navigation";
import UserMenu from "./user-menu/UserMenu";
import CartMenu from "./cart-menu/CartMenu";
import MenuBarIcon from "../icons/MenuBarIcon";
import { Category, CategoryWhereInput } from "@/types/__generated__/graphql";
import "./header.scss";

export const GET_CATEGORIES: TypedDocumentNode<
  { categories: Category[] },
  { where: CategoryWhereInput }
> = gql`
  query GetCategories($where: CategoryWhereInput!) {
    categories(where: $where) {
      id
      name
      slug
    }
  }
`;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { data } = useQuery(GET_CATEGORIES, {
    variables: { where: { parent: { slug: { equals: "torty" } } } },
  });

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

        <Navigation isMenuOpen={isMenuOpen} categories={data?.categories} />
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
