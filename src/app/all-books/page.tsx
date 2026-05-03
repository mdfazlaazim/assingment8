import { BookCard } from "@/components/book-card";
import type { BookCategory } from "@/types/book";
import { getBooks } from "@/lib/books";

type SearchProps = {
  searchParams?: { q?: string; category?: string };
};

const categories: Array<BookCategory | "All"> = ["All", "Story", "Tech", "Science"];

export default async function AllBooksPage({ searchParams }: SearchProps) {
  const params = searchParams ?? {};
  const query = params.q ?? "";
  const categoryParam = params.category;
  const category =
    categoryParam === "Story" || categoryParam === "Tech" || categoryParam === "Science"
      ? categoryParam
      : undefined;

  const books = getBooks({ q: query, category });

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-xl bg-base-100 p-4 shadow-sm">
        <h2 className="text-lg font-bold">Categories</h2>
        <ul className="menu mt-2 rounded-box bg-base-100">
          {categories.map((item) => {
            const href =
              item === "All" ? "/all-books" : `/all-books?category=${encodeURIComponent(item)}`;
            const isActive = item === "All" ? !category : category === item;

            return (
              <li key={item}>
                <a
                  href={href}
                  className={isActive ? "active font-semibold text-primary" : ""}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </aside>

      <section>
        <form className="mb-6">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              className="grow"
              placeholder="Search by title..."
            />
            {category ? <input type="hidden" name="category" value={category} /> : null}
            <button type="submit" className="btn btn-primary btn-sm">
              Search
            </button>
          </label>
        </form>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} detailHref={`/books/${book.id}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
