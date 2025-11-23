import { useState } from "react";
import Link from "next/link";
import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import ArrowDown from "../../icons/ArrowDown";
import { Category, CategoryWhereInput } from "@/types/__generated__/graphql";
import { getTransliteration } from "@/utils/getTransliteration";
import "./navigation.scss";

type NavigationProps = {
  isMenuOpen: boolean;
};

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

const categories = [
  { key: getTransliteration("Пироженые"), label: "Пироженые" },
  { key: getTransliteration("Свадебные торты"), label: "ДЕНЬ РОЖДЕНИЯ" },
];
const navigationMenu = [
  ...categories,
  { key: "contact", label: "КОНТАКТЫ" },
  { key: "cooporation", label: "СОТРУДНИЧЕСТВО" },
];

function Navigation({ isMenuOpen }: NavigationProps) {
  const [isSubMenuActive, setIsSubMenuActive] = useState(false);
  const handleSubMenuActive = () => {
    setIsSubMenuActive(!isSubMenuActive);
  };
  const { data } = useQuery(GET_CATEGORIES, {
    variables: { where: { parent: { slug: { equals: "torty" } } } },
  });

  return (
    <nav className={["navigation", isMenuOpen ? "active" : ""].join(" ")}>
      <ul className="navigation__menu-wrapper">
        {/* Navigation menu with sub-menu */}
        <li className="navigation__menu-item show-widget">
          <span
            className="navigation__menu-item-label"
            data-testid="navigation-menu-item"
          >
            ТОрты
          </span>
          <span
            className={[
              "navigation__sub-menu-trigger",
              isSubMenuActive ? "active" : "",
            ].join(" ")}
            onClick={handleSubMenuActive}
            data-testid="navigation-sub-menu-trigger"
          >
            <ArrowDown />
          </span>
          <div
            className={[
              "navigation__widget",
              isSubMenuActive ? "open-sub-menu" : "",
            ].join(" ")}
            data-testid="navigation-widget"
          >
            <div className="navigation__widget-anchor" />
            <div className="navigation__sub-menu-wrapper">
              <div className="navigation__sub-menu">
                {data?.categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`cakes/${cat.slug}`}
                    className="navigation__sub-menu-item"
                    data-testid="navigation-sub-menu-item"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="navigation__banner-wrapper">
              <div className="navigation__banner">
                <h5 className="navigation__banner-text">
                  БОЛЕЕ 20 000 ВЫПОЛНЕННЫХ ЗАКАЗОВ
                </h5>
              </div>
              <div className="navigation__banner">
                <h5 className="navigation__banner-text">
                  скидка на первый заказ 15 %
                </h5>
                <Link href="/" className="navigation__banner-link">
                  регистрация
                </Link>
              </div>
            </div>
          </div>
        </li>
        {navigationMenu.map((menu) => (
          <Link
            key={menu.key}
            href={menu.key}
            className="navigation__menu-link"
          >
            <li
              className="navigation__menu-item"
              data-testid="navigation-menu-item"
            >
              {menu.label}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
export default Navigation;
