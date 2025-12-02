"use client";

import Link from "next/link";
import "./user-sidebar.scss";

interface UserSidebarProps {
  active?: "profile" | "orders";
}

export default function UserSidebar({
  active = "profile",
}: UserSidebarProps) {
  return (
    <aside className="user-sidebar">
      <div className="user-sidebar__box">
        <h2 className="user-sidebar__title">Добро пожаловать!</h2>

        <nav className="user-sidebar__links" aria-label="Профиль навигация">
          <Link
            href="/dashboard"
            aria-current="page"
            className={`user-sidebar__link ${
              active === "profile" ? "user-sidebar__link--accent" : ""
            }`}
          >
            Мои данные
          </Link>

          <Link
            href="/order-history"
            aria-current="page"
            className={`user-sidebar__link ${
              active === "orders" ? "user-sidebar__link--accent" : ""
            }`}
          >
            История заказов
          </Link>
        </nav>

        <div className="user-sidebar__help">
          <div className="user-sidebar__help-title">Нужна помощь?</div>

          <div className="user-sidebar__help-links">
            <Link href="/contact" className="user-sidebar__help-link">
              Контакты
            </Link>

            <Link href="/faq" className="user-sidebar__help-link">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
