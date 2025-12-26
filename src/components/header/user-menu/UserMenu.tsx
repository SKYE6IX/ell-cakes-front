"use client";
import { useReactiveVar } from "@apollo/client/react";
import Link from "next/link";
import PersonIcon from "@/components/icons/PersonIcon";
import { userVar } from "@/lib/cache";
import "./user-menu.scss";

function UserMenu() {
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
