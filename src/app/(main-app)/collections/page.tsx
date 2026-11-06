import Collection from "@/components/collection/Collection";

async function page() {
  const CATEGORY_NAME = "torty";
  return (
    <Collection
      categorySlug={CATEGORY_NAME}
      where={{
        categories: { some: { parent: { slug: { equals: CATEGORY_NAME } } } },
      }}
    />
  );
}

export default page;
