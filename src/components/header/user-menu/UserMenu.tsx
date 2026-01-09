"use client";
import { useRef, useEffect } from "react";
import { useQuery, useApolloClient } from "@apollo/client/react";
import Link from "next/link";
import PersonIcon from "@/components/icons/PersonIcon";
import { User } from "@/types/__generated__/graphql";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";
import "./user-menu.scss";

interface UserMenuProps {
  preloadQuery: User | null | undefined;
}

function UserMenu({ preloadQuery }: UserMenuProps) {
  const client = useApolloClient();
  const initialLoad = useRef(true);

  const { data } = useQuery(AUTHORIZED_USER_QUERY);

  const authUser = data?.queryAuthorizedUser;

  useEffect(() => {
    if (initialLoad.current && preloadQuery) {
      client.writeQuery({
        query: AUTHORIZED_USER_QUERY,
        data: { queryAuthorizedUser: preloadQuery },
      });
      initialLoad.current = false;
    }
  }, [preloadQuery, client]);

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
