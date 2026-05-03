import Image from "next/image";
import { notFound } from "next/navigation";

import { BorrowButton } from "@/components/borrow-button";
import { getBookById } from "@/lib/books";
import { requireSession } from "@/lib/session";

type BookDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function BookDetailsPage({ params }: BookDetailsProps) {
  await requireSession();

  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <section className="grid gap-8 rounded-2xl bg-base-100 p-6 shadow-md md:grid-cols-2">
      <div className="relative h-80 w-full overflow-hidden rounded-xl">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="text-sm opacity-70">By {book.author}</p>
        <p>{book.description}</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge badge-outline badge-primary">{book.category}</span>
          <span className="badge badge-outline">
            Available: {book.available_quantity}
          </span>
        </div>
        <BorrowButton title={book.title} />
      </div>
    </section>
  );
}
