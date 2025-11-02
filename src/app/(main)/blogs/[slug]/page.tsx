
import { BlogDetailPageClient } from "@/components";

interface BlogDetailPageProps {
  params: { slug: string };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = params;

  return <BlogDetailPageClient slug={slug} />
}
