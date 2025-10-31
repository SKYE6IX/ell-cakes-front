import type { Metadata } from "next";
import localFont from "next/font/local";
import ApolloQueryProvider from "src/contexts/ApolloQueryProvider";
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
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={fontUncage.variable}>
      <body>
        <ApolloQueryProvider>{children}</ApolloQueryProvider>
      </body>
    </html>
  );
}
