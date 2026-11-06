import React from "react";
import { Tenor_Sans, Manrope } from "next/font/google";

const tenorSans = Tenor_Sans({
  subsets: ["cyrillic"],
  display: "swap",
  weight: ["400"],
  variable: "--tenor-sans-font",
  preload: true,
});

const manrope = Manrope({
  subsets: ["cyrillic"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600"],
  variable: "--manrope-font",
  preload: true,
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={[tenorSans.variable, manrope.variable].join(" ")}>
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
