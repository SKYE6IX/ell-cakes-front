import Image from "next/image";
import Link from "next/link";
import { TypedDocumentNode, gql } from "@apollo/client";
import Navigation from "./navigation/Navigation";
import UserMenu from "./user-menu/UserMenu";
import CartMenuBtn from "./cart-menu/CartMenuBtn";
import MenuButton from "./MenuButton";
import { Category, CategoryWhereInput } from "@/types/__generated__/graphql";
import { AUTHORIZED_USER_QUERY } from "./user-menu/operation";
import { query } from "@/ApolloClient";
import "./header.scss";

const GET_CATEGORIES: TypedDocumentNode<
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

async function Header() {
  const { data } = await query({
    query: GET_CATEGORIES,
    variables: { where: { parent: { slug: { equals: "torty" } } } },
  });

  const { data: userQuery } = await query({
    query: AUTHORIZED_USER_QUERY,
    fetchPolicy: "network-only",
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

        <Navigation categories={data?.categories} />

        <div className="header__user-action-wrapper">
          {userQuery && <UserMenu userQuery={userQuery.queryAuthorizedUser} />}
          <CartMenuBtn />
          <MenuButton />
        </div>
      </div>
    </header>
  );
}
export default Header;
