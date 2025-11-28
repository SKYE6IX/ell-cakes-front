import React from "react";
import Link from "next/link";
import PersonIcon from "@/components/icons/PersonIcon";
import "./user-menu.scss";

function UserMenu() {
  return (
    <Link href="/login" className="user-menu">
      <span className="user-menu__text">войти</span>
      <PersonIcon />
    </Link>
  );
}

export default UserMenu;
