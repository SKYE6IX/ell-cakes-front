"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useReactiveVar } from "@apollo/client/react";
import { isMenuOpenVar } from "@/lib/cache";
import ArrowDown from "../../icons/ArrowDown";
import { getTransliteration } from "@/utils/getTransliteration";
import { Category } from "@/types/__generated__/graphql";
import "./navigation.scss";

const cupCakeCategory = {
  href: `/collections/${getTransliteration("Пирожные")}`,
  label: "Пирожные",
};
const appMenuList = [
  { href: "/contact", label: "КОНТАКТЫ" },
  { href: "/delivery", label: "Доставка и оплата" },
];

type NavigationProps = {
  categories: Category[] | null | undefined;
};

function Navigation({ categories }: NavigationProps) {
  const CAKE_SLUG = "torty";
  const HOLIDAYS_SLUG = "holidays";

  const pathname = usePathname();
  const isMenuOpen = useReactiveVar(isMenuOpenVar);
  const [isSubMenuActive, setIsSubMenuActive] = useState(false);

  const cakeSubCategories = categories
    ?.filter((cat) => cat.parent?.slug === CAKE_SLUG)
    .sort((a, b) => {
      if (a.priority === null && b.priority === null) return 0;
      if (a.priority === null) return 1;
      if (b.priority === null) return -1;
      return a.priority - b.priority;
    });

  const holidaysCategories = categories
    ?.filter((cat) => cat.parent?.slug === HOLIDAYS_SLUG)
    .map((cat) => {
      return {
        href: `/collections/${cat.slug}`,
        label: cat.name!,
      };
    });

  const navigationMenu = holidaysCategories
    ? [cupCakeCategory, ...holidaysCategories, ...appMenuList]
    : [cupCakeCategory, ...appMenuList];

  const handleSubMenuActive = () => {
    setIsSubMenuActive(!isSubMenuActive);
  };

  const closeMenu = () => {
    isMenuOpenVar(false);
  };

  return (
    <nav className={["navigation", isMenuOpen ? "active" : ""].join(" ")}>
      <ul className="navigation__menu-wrapper">
        {/* Navigation menu with sub-menu */}
        <li className="navigation__menu-item show-widget">
          <span
            className={[
              "navigation__menu-item-label",
              pathname === "/collections" ? "active" : "",
            ].join(" ")}
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
                {cakeSubCategories?.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/collections/${cat.slug}`}
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

        {navigationMenu.map((menu, i) => (
          <Link
            key={i + menu.href}
            href={menu.href}
            className="navigation__menu-link"
          >
            <li
              className={[
                "navigation__menu-item",
                pathname === menu.href ? "active" : "",
              ].join(" ")}
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
