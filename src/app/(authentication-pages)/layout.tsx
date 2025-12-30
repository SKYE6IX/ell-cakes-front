import React from "react";
import HelpSidebar from "@/components/help-sidebar/HelpSidebar";
import "./authentication-pages-layout.scss";

function AuthenticationPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="authentication-page-layout">
      <HelpSidebar />
      <div className="authentication-page-layout__content">{children}</div>
    </div>
  );
}

export default AuthenticationPagesLayout;
