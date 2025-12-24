import Link from "next/link";
import { useRouter } from "next/navigation";
import { TypedDocumentNode, gql } from "@apollo/client";
import { useReactiveVar, useMutation } from "@apollo/client/react";
import { GET_CART_QUERY } from "../cart/operations";
import { AUTHORIZED_USER_QUERY } from "../header/operation";
import { userVar } from "@/lib/cache";
import "./user-sidebar.scss";

export const END_SESSION: TypedDocumentNode<
  { endSession: boolean },
  Record<string, null>
> = gql`
  mutation EndSession {
    endSession
  }
`;

interface UserSidebarProps {
  active?: "dashboard" | "order-history";
}

export default function UserSidebar({
  active = "dashboard",
}: UserSidebarProps) {
  const user = useReactiveVar(userVar);
  const router = useRouter();

  const [endSession] = useMutation(END_SESSION, {
    onCompleted(data) {
      if (data.endSession) {
        router.push("/");
        userVar(null);
      }
    },
    refetchQueries: [GET_CART_QUERY, AUTHORIZED_USER_QUERY],
  });

  const handleEndSession = () => {
    endSession();
  };

  return (
    <aside className="user-sidebar">
      <div className="user-sidebar__box">
        <h3 className="user-sidebar__title">Добро пожаловать!</h3>

        <nav className="user-sidebar__links" aria-label="Профиль навигация">
          <Link
            href="/dashboard"
            aria-current="page"
            className={`user-sidebar__link ${
              active === "dashboard" ? "user-sidebar__link--accent" : ""
            }`}
          >
            Мои данные
          </Link>

          <Link
            href="/order-history"
            aria-current="page"
            className={`user-sidebar__link ${
              active === "order-history" ? "user-sidebar__link--accent" : ""
            }`}
          >
            История заказов
          </Link>

          {user && (
            <button className="user-sidebar__link" onClick={handleEndSession}>
              выход
            </button>
          )}
        </nav>

        <div className="user-sidebar__help">
          <h4 className="user-sidebar__help-title">Нужна помощь?</h4>

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
