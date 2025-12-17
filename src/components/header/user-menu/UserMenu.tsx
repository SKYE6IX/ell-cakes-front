"use client";
import { useEffect, useRef } from "react";
import { skipToken, useQuery, useReactiveVar } from "@apollo/client/react";
import Link from "next/link";
import { AUTHORIZED_USER_QUERY } from "./operation";
import PersonIcon from "@/components/icons/PersonIcon";
import { User } from "@/types/__generated__/graphql";
import { userVar } from "@/lib/cache";
import "./user-menu.scss";

interface UserMenuProps {
  userQuery: User | null;
}

function UserMenu({ userQuery }: UserMenuProps) {
  const initialLoad = useRef(true);
  const { data } = useQuery(
    AUTHORIZED_USER_QUERY,
    initialLoad.current ? skipToken : {}
  );

  useEffect(() => {
    const nextQueryUser = data;
    if (initialLoad.current) {
      userVar(userQuery);
    } else {
      userVar(nextQueryUser?.queryAuthorizedUser);
    }
    initialLoad.current = false;
  }, [userQuery, data]);

  const authUser = useReactiveVar(userVar);

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
