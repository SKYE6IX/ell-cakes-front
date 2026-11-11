import React from "react";
import "./landing-layout.scss";

function LandingLayout({ children }: { children: React.ReactNode }) {
  return <main className="landing-layout">{children}</main>;
}

export default LandingLayout;
