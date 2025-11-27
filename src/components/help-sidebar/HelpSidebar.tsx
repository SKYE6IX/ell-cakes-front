"use client";

import Link from "next/link";
import "./help-sidebar.scss";

interface HelpSidebarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  active?: "login" | "register";
}

function HelpSidebar({
  onLoginClick,
  onRegisterClick,
  active = "login",
}: HelpSidebarProps) {
  return (
    <div className="help-sidebar">
      <div className="help-sidebar__box">
        <h2 className="help-sidebar__title">Добро пожаловать!</h2>

        <div className="help-sidebar__links">
          <Link
            href="/login"
            className={`help-sidebar__link ${active === "login" ? "help-sidebar__link--accent" : ""}`}
            onClick={onLoginClick}
          >
            Войти
          </Link>

          <Link
            href="/registration"
            className={`help-sidebar__link  ${active === "register" ? "help-sidebar__link--accent" : ""}`}
            onClick={onRegisterClick}
          >
            Зарегистрироваться
          </Link>
        </div>

        <div className="help-sidebar__bottom">
          <div className="help-sidebar__bottom-title">Нужна помощь?</div>

          <div className="help-sidebar__bottom-links">
           <Link href="/contact" className="help-sidebar__bottom-link">Контакты</Link>

            <Link href="/faq" className="help-sidebar__bottom-link">FAQ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HelpSidebar;
