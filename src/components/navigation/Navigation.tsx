import React, { useState } from "react";
import Link from "next/link";
import ArrowDown from "../icons/ArrowDown";
import "./navigation.scss";

type NavigationProps = {
  isMenuOpen: boolean;
};

const categories = [
  { key: "cupcake", label: "Пироженые" },
  { key: "birthday", label: "ДЕНЬ РОЖДЕНИЯ" },
];
const navigationMenu = [
  ...categories,
  { key: "contact", label: "КОНТАКТЫ" },
  { key: "cooporation", label: "СОТРУДНИЧЕСТВО" },
];

const subMenu = [
  "Торты на День рождения",
  "Корпоративные Торты",
  "Торты для детей",
  "Торты для Нее",
  "Торты для Него",
  "ягодные торты",
  "Свадебные торты",
  "бенто торты",
];

function Navigation({ isMenuOpen }: NavigationProps) {
  const [isSubMenuActive, setIsSubMenuActive] = useState(false);
  const handleSubMenuActive = () => {
    setIsSubMenuActive(!isSubMenuActive);
  };
  return (
    <nav className={["navigation", isMenuOpen ? "active" : ""].join(" ")}>
      <ul className="navigation__menu-wrapper">
        {/* Navigation menu with sub-menu */}
        <li className="navigation__menu-item show-widget">
          <span className="navigation__menu-item-label">ТОрты</span>
          <span
            className={[
              "navigation__sub-menu-trigger",
              isSubMenuActive ? "active" : "",
            ].join(" ")}
            onClick={handleSubMenuActive}
          >
            <ArrowDown />
          </span>
          <div
            className={[
              "navigation__widget",
              isSubMenuActive ? "open-sub-menu" : "",
            ].join(" ")}
          >
            <div className="navigation__widget-anchor" />
            <div className="navigation__sub-menu-wrapper">
              <div className="navigation__sub-menu">
                {subMenu.map((menu) => (
                  <Link
                    key={menu}
                    href={menu}
                    className="navigation__sub-menu-item"
                  >
                    {menu}
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
          <Link key={menu.key} href="" className="navigation__menu-link">
            <li className="navigation__menu-item">{menu.label}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
export default Navigation;
