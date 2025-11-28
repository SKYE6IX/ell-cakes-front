import { useState } from "react";
import Link from "next/link";
import ArrowDown from "../../icons/ArrowDown";
import { Category } from "@/types/__generated__/graphql";
import { getTransliteration } from "@/utils/getTransliteration";
import "./navigation.scss";

type NavigationProps = {
  isMenuOpen: boolean;
  categories: Category[] | undefined;
  closeMenu: () => void;
};

const categories = [
  { key: `product/${getTransliteration("Пироженые")}`, label: "Пироженые" },
  {
    key: `product/cakes/${getTransliteration("Свадебные торты")}`,
    label: "ДЕНЬ РОЖДЕНИЯ",
  },
];
const navigationMenu = [
  ...categories,
  { key: "contact", label: "КОНТАКТЫ" },
  { key: "collaboration", label: "СОТРУДНИЧЕСТВО" },
];

function Navigation({ isMenuOpen, categories, closeMenu }: NavigationProps) {
  const [isSubMenuActive, setIsSubMenuActive] = useState(false);
  const handleSubMenuActive = () => {
    setIsSubMenuActive(!isSubMenuActive);
  };

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
                {categories?.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/product/cakes/${cat.slug}`}
                    className="navigation__sub-menu-item"
                    data-testid="navigation-sub-menu-item"
                    onClick={closeMenu}
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
                <Link href="/registration" className="navigation__banner-link">
                  регистрация
                </Link>
              </div>
            </div>
          </div>
        </li>

        {navigationMenu.map((menu) => (
          <Link
            key={menu.key}
            href={`/${menu.key}`}
            className="navigation__menu-link"
          >
            <li
              className="navigation__menu-item"
              data-testid="navigation-menu-item"
              onClick={closeMenu}
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
