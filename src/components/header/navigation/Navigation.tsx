"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useReactiveVar } from "@apollo/client/react";
import { isMenuOpenVar } from "@/lib/cache";
import ArrowDown from "../../icons/ArrowDown";
import { Category } from "@/types/__generated__/graphql";
import "./navigation.scss";

const STATIC_NAV_MENU = [
  { href: "/quick-order", label: "Срочные заказы" },
  { href: "/contact", label: "КОНТАКТЫ" },
  { href: "/delivery", label: "Доставка и оплата" },
];

type NavigationProps = {
  categories: Category[] | null | undefined;
};

function Navigation({ categories }: NavigationProps) {
  const pathname = usePathname();
  const isMenuOpen = useReactiveVar(isMenuOpenVar);
  const [isSubMenuActive, setIsSubMenuActive] = useState(false);

  const topLevelCategory = categories?.find((cat) => !cat.parent);

  const subLevelCategories = categories
    ?.filter((cat) => cat.parent?.slug === topLevelCategory?.slug)
    .sort((a, b) => {
      if (a.priority === null && b.priority === null) return 0;
      if (a.priority === null) return 1;
      if (b.priority === null) return -1;
      return a.priority - b.priority;
    });

  // Used on menu item and sub-menu item to close the menu when
  // click to naavigate
  const closeMenu = () => {
    isMenuOpenVar(false);
  };

  const handleSubMenuActive = () => {
    setIsSubMenuActive(!isSubMenuActive);
  };

  return (
    <nav className={["navigation", isMenuOpen ? "active" : ""].join(" ")}>
      <ul className="navigation__menu-wrapper">
        {/* Top level category navigation menu  */}
        <li className="navigation__menu-item">
          <span
            className={[
              "navigation__menu-item-label",
              pathname === "/collections" ? "active" : "",
            ].join(" ")}
            data-testid="navigation-menu-item"
          >
            {topLevelCategory?.name}
          </span>

          <span
            className={[
              "navigation__sub-menu_mobile-trigger",
              isSubMenuActive ? "active" : "",
            ].join(" ")}
            onClick={handleSubMenuActive}
            data-testid="navigation-sub-menu-trigger"
          >
            <ArrowDown />
          </span>

          {/* Sub level category navigation menu */}
          <div
            className={["navigation__sub-menu", isSubMenuActive ? "open-sub-menu" : ""].join(" ")}
            data-testid="navigation-sub-menu"
          >
            <div className="navigation__sub-menu-list-wrapper">
              <div className="navigation__sub-menu-list">
                <Link
                  href="/fillings"
                  className="navigation__sub-menu-item"
                  onClick={closeMenu}
                  data-testid="navigation-sub-menu-item"
                >
                  Начинки
                </Link>

                {subLevelCategories?.map((cat) => (
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

            <div className="navigation__sub-menu-bottom">
              <div className="navigation__sub-menu-bottom-item">
                <h5>Более 20 000 выполненных заказов</h5>
              </div>

              <div className="navigation__sub-menu-bottom-item">
                <h5>Доставка по Москве и области</h5>
                <Link href="/collections" className="navigation__sub-menu-bottom-link">
                  Купить сейчас
                </Link>
              </div>
            </div>
          </div>
        </li>

        {/* Static navigation menu list */}
        {STATIC_NAV_MENU.map((menu, i) => (
          <li
            key={i + menu.label}
            className={["navigation__menu-item", pathname === menu.href ? "active" : ""].join(" ")}
            data-testid="navigation-menu-item"
            onClick={closeMenu}
          >
            <Link href={menu.href} className="navigation__menu-link">
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
