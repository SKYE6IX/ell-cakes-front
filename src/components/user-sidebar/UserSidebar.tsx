import Link from "next/link";
import { useRouter } from "next/navigation";
import { TypedDocumentNode, gql } from "@apollo/client";
import { useReactiveVar, useMutation } from "@apollo/client/react";
import { userVar } from "@/lib/cache";
import "./user-sidebar.scss";

const END_SESSION: TypedDocumentNode<
  { endSession: boolean },
  Record<string, null>
> = gql`
  mutation Mutation {
    endSession
  }
`;

interface UserSidebarProps {
  active?: "profile" | "orders";
}

export default function UserSidebar({ active = "profile" }: UserSidebarProps) {
  const user = useReactiveVar(userVar);
  const router = useRouter();
  const [endSession] = useMutation(END_SESSION, {
    onCompleted(data) {
      if (data.endSession) {
        router.push("/");
        userVar(null);
      }
    },
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

          {user && (
            <button className="user-sidebar__link" onClick={handleEndSession}>
              выход
            </button>
          )}
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
