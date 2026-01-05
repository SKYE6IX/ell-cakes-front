/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import type { Organization, WithContext } from "schema-dts";
import Header from "src/components/header/Header";
import Footer from "@/components/footer/Footer";
import Cart from "@/components/cart/Cart";
import { ApolloWrapper } from "@/ApolloWrapper";
import "../global-styles/globals.scss";

export const metadata: Metadata = {
  title: "Ell Cakes",
  description:
    "Продаем торты всех видов для разных случаев: дни рождения, свадьбы, корпоративные вечеринки и любые другие радостные события.",
  metadataBase: new URL("https://ellcakes.ru"),
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Ell Cakes",
    description:
      "Продаем торты всех видов для разных случаев: дни рождения, свадьбы, корпоративные вечеринки и любые другие радостные события.",
    url: "https://ellcakes.ru",
    siteName: "Ell Cakes",
    images: [
      {
        url: "/ell-cake-icon.png",
        width: 1200,
        height: 630,
        alt: "Компания Elle Cakes занимается продажей всевозможных тортов для различных случаев.",
      },
    ],
    type: "website",
    locale: "ru",
  },
  verification: {
    yandex: "2dc84f2f66e18a1c",
    google: "gKKU7OXuOPpvAPea9iNcYrPvxhpybOSOeMWF5W3J8GI",
  },
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

const jsonLd: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  name: "Ell Cakes",
  email: "info@ellcakes.net",
  logo: "/ell-cake-icon.png",
  url: "https://ellcakes.ru",
  description:
    "Продаем торты всех видов для разных случаев: дни рождения, свадьбы, корпоративные вечеринки и любые другие радостные события.",
  foundingDate: "2013",
  founder: {
    "@type": "Person",
    name: "Elena Kim",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "8(965)-195-05-99",
      contactType: "Customer Service",
      email: "info@ellcakes.net",
      availableLanguage: ["Russian"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "г. Москва, Жуков проезд, дом 8",
    addressCountry: "Russia",
  },
};

export default function RootLayout({
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
        <Script
          src={`https://api-maps.yandex.ru/v3/?apikey=${process.env.NEXT_PUBLIC_Y_MAP_API_KEY}&lang=ru_RU`}
          strategy="beforeInteractive"
        />
        <Script
          id="yandex-metrica"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106138199', 'ym');
       ym(106138199, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/106138199"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
