import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import Header from "src/components/header/Header";
import Footer from "@/components/footer/Footer";
import Cart from "@/components/cart/Cart";
import { ApolloWrapper } from "@/ApolloWrapper";
import AuthenticationWrapper from "@/authentication/Authentication";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${fontUncage.variable} ${montserrat.variable}`}>
      <body>
        <ApolloWrapper>
          <AuthenticationWrapper>
            <div className="app-container">
              <Header />
              <Cart />
              {children}
              <Footer />
            </div>
          </AuthenticationWrapper>
        </ApolloWrapper>
        <Script
          src={`https://api-maps.yandex.ru/v3/?apikey=${process.env.NEXT_PUBLIC_Y_MAP_API_KEY}&lang=ru_RU`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
