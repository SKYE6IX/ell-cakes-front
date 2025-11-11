import React from "react";
import Link from "next/link";
import PersonIcon from "../icons/PersonIcon";
import "./user-menu.scss";

function UserMenu() {
  return (
    <Link href="" className="user-menu">
      <span className="user-menu__text">User</span>
      <PersonIcon />
    </Link>
  );
}

export default UserMenu;
