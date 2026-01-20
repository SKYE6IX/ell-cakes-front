import { Product, WithContext } from "schema-dts";
import type { Metadata, ResolvingMetadata } from "next";
import ProductDetails from "@/components/product-details/ProductDetails";
import { getProductMeta } from "@/lib/getProductMeta";

type Props = {
  params: Promise<{ productSlug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).productSlug;
  const { product } = await getProductMeta(slug);

  return {
    title: product?.name,
    description: product?.baseDescription,
    openGraph: {
      title: product?.name || "",
      description: product?.baseDescription || "",
      url: `https://ellcakes.ru/product/${slug}`,
      siteName: "Ell Cakes",
      images: [
        {
          url: product?.images![0].image?.url || "",
          width: 1200,
          height: 630,
          alt: product?.name || "",
        },
      ],
      type: "website",
      locale: "ru",
    },
  };
}

async function page({ params }: Props) {
  const { productSlug } = await params;

  const { product } = await getProductMeta(productSlug);

  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.name || "",
    image: product?.images![0].image?.url || "",
    description: product?.baseDescription || "",
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductDetails productSlug={productSlug} />;
    </section>
  );
}
export default page;
