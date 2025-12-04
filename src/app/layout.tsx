import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import ApolloQueryProvider from "src/contexts/ApolloQueryProvider";
import Header from "src/components/header/Header";
import Footer from "@/components/footer/Footer";
import Cart from "@/components/cart/Cart";
import { createServerApolloClient } from "@/lib/apolloServer";
import "../global-styles/globals.scss";
import { gql, TypedDocumentNode } from "@apollo/client";
import { Category, CategoryWhereInput } from "@/types/__generated__/graphql";

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

const GET_CATEGORIES: TypedDocumentNode<
  { categories: Category[] },
  { where: CategoryWhereInput }
> = gql`
  query GetCategories($where: CategoryWhereInput!) {
    categories(where: $where) {
      id
      name
      slug
    }
  }
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createServerApolloClient();
  const { data } = await client.query({
    query: GET_CATEGORIES,
    variables: { where: { parent: { slug: { equals: "torty" } } } },
  });

  return (
    <html lang="ru" className={`${fontUncage.variable} ${montserrat.variable}`}>
      <body>
        <ApolloQueryProvider>
          <Header categories={data?.categories} />
          <Cart />
          {children}
          <Footer />
        </ApolloQueryProvider>
      </body>
    </html>
  );
}
