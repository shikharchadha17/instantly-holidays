import { notFound } from "next/navigation";
import { destinations } from "@/data/destinations";
import BookingPageClient from "./BookingPageClient";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) notFound();
  return <BookingPageClient dest={dest} />;
}
