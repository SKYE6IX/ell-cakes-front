"use client";
import React from "react";
import { usePathname } from "next/navigation";
import UserSidebar from "@/components/user-sidebar/UserSidebar";
import "./user-panel-layout.scss";

function UserPanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeLink = pathname.slice(1) as "dashboard" | "order-history";
  return (
    <div className="user-panel-layout">
      <UserSidebar active={activeLink} />
      <div className="user-panel-layout__content">{children}</div>
    </div>
  );
}

export default UserPanelLayout;
