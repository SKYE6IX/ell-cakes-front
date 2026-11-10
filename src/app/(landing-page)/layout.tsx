import React from "react";
import "../../global-styles/globals.scss";

function LandingLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}

export default LandingLayout;
