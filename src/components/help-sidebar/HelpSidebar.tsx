"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./help-sidebar.scss";

function HelpSidebar() {
  const pathname = usePathname();
  return (
    <div className="help-sidebar">
      <div className="help-sidebar__box">
        <h3 className="help-sidebar__title">Добро пожаловать!</h3>
        <div className="help-sidebar__links">
          <Link
            href="/login"
            aria-current="page"
            className={`help-sidebar__link ${
              pathname === "/login" ? "help-sidebar__link--accent" : ""
            }`}
          >
            Войти
          </Link>

          <Link
            href="/registration"
            aria-current="page"
            className={`help-sidebar__link  ${
              pathname === "/registration" ? "help-sidebar__link--accent" : ""
            }`}
          >
            Зарегистрироваться
          </Link>
        </div>

        <div className="help-sidebar__bottom">
          <h5 className="help-sidebar__bottom-title">Нужна помощь?</h5>

          <div className="help-sidebar__bottom-links">
            <Link
              href="/contact"
              aria-current="page"
              className="help-sidebar__bottom-link"
            >
              Контакты
            </Link>

            <Link
              href="/faq"
              aria-current="page"
              className="help-sidebar__bottom-link"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HelpSidebar;
