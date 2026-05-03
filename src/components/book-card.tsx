import Image from "next/image";
import Link from "next/link";

import type { Book } from "@/types/book";

type BookCardProps = {
  book: Book;
  detailHref: string;
};

export function BookCard({ book, detailHref }: BookCardProps) {
  return (
    <article className="card h-full bg-base-100 shadow-md">
      <figure className="relative h-52 w-full">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title line-clamp-1">{book.title}</h3>
        <p className="text-sm opacity-75">{book.author}</p>
        <p className="line-clamp-2 text-sm">{book.description}</p>
        <div className="card-actions mt-3 justify-between">
          <span className="badge badge-primary badge-outline">{book.category}</span>
          <Link href={detailHref} className="btn btn-sm btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
