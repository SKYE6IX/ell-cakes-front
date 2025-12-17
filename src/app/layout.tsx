import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import Header from "src/components/header/Header";
import Footer from "@/components/footer/Footer";
import Cart from "@/components/cart/Cart";
import { ApolloWrapper } from "@/ApolloWrapper";
import "../global-styles/globals.scss";

export const metadata: Metadata = {
  title: "Ell Cakes",
  description: "",
};

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

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600"],
  variable: "--font-montserrat",
  preload: true,
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${fontUncage.variable} ${montserrat.variable}`}>
      <body>
        <ApolloWrapper>
          <div className="app-container">
            <Header />
            <Cart />
            {children}
            <Footer />
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
}
