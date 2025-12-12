import { useEffect } from "react";
import { useQuery, useReactiveVar } from "@apollo/client/react";
import Link from "next/link";
import PersonIcon from "@/components/icons/PersonIcon";
import { AUTHORIZED_USER_QUERY } from "./operation";
import { userVar } from "@/lib/cache";
import "./user-menu.scss";

function UserMenu() {
  const { data } = useQuery(AUTHORIZED_USER_QUERY);
  const authUser = useReactiveVar(userVar);

  useEffect(() => {
    if (data) {
      const { queryAuthorizedUser } = data;
      userVar(queryAuthorizedUser);
    }
  }, [data]);

  return (
    <Link href={`${authUser ? "/dashboard" : "/login"}`} className="user-menu">
      {authUser ? (
        <span className="user-menu__text">{authUser.name}</span>
      ) : (
        <span className="user-menu__text">войти</span>
      )}
      <PersonIcon />
    </Link>
  );
}

export default UserMenu;
