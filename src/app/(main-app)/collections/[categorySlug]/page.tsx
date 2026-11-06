import Collection from "@/components/collection/Collection";

async function page({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  return (
    <Collection
      categorySlug={categorySlug}
      where={{ categories: { some: { slug: { equals: categorySlug } } } }}
    />
  );
}

export default page;
