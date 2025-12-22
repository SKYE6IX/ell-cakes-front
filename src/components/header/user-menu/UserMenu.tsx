"use client";
import { useEffect, useRef } from "react";
import {
  skipToken,
  useQuery,
  useReactiveVar,
  useReadQuery,
  QueryRef,
} from "@apollo/client/react";
import Link from "next/link";
import PersonIcon from "@/components/icons/PersonIcon";
import { User } from "@/types/__generated__/graphql";
import { userVar } from "@/lib/cache";
import { AUTHORIZED_USER_QUERY } from "../operation";
import "./user-menu.scss";

interface UserMenuProps {
  queryRef: QueryRef<{ queryAuthorizedUser: User | null }>;
}

function UserMenu({ queryRef }: UserMenuProps) {
  const initialLoad = useRef(true);

  const { data: preloadData } = useReadQuery(queryRef);
  const preloadQuery = preloadData.queryAuthorizedUser;

  const { data: clientData } = useQuery(
    AUTHORIZED_USER_QUERY,
    initialLoad.current ? skipToken : {}
  );

  useEffect(() => {
    const nextQueryUser = clientData;
    if (initialLoad.current) {
      userVar(preloadQuery);
    } else {
      userVar(nextQueryUser?.queryAuthorizedUser);
    }
    initialLoad.current = false;
  }, [preloadQuery, clientData]);

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
