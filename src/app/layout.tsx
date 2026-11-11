import React from "react";
import localFont from "next/font/local";
import { Tenor_Sans, Manrope, Montserrat } from "next/font/google";

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
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--manrope-font",
  preload: true,
});

// @depricated
const fontUncage = localFont({
  src: [
    {
      path: "../../public/font/uncage/UNCAGE-Bold.otf",
      weight: "700",
    },
    {
      path: "../../public/font/uncage/UNCAGE-SemiBold.otf",
      weight: "600",
    },
    {
      path: "../../public/font/uncage/UNCAGE-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/font/uncage/UNCAGE-Regular.otf",
      weight: "400",
    },
  ],
  variable: "--font-uncage",
  preload: true,
});

// @depricated
const montserrat = Montserrat({
  subsets: ["cyrillic"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600"],
  variable: "--font-montserrat",
  preload: true,
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      className={[
        tenorSans.variable,
        manrope.variable,
        fontUncage.variable,
        montserrat.variable,
      ].join(" ")}
    >
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
