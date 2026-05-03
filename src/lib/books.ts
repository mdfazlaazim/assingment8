import booksData from "@/data/books.json";
import type { Book, BookCategory } from "@/types/book";

const books = booksData as Book[];

type BookFilter = {
  q?: string;
  category?: BookCategory;
};

export function getBooks(filter?: BookFilter): Book[] {
  const query = filter?.q?.trim().toLowerCase();

  return books.filter((book) => {
    const matchesQuery = query ? book.title.toLowerCase().includes(query) : true;
    const matchesCategory = filter?.category
      ? book.category === filter.category
      : true;

    return matchesQuery && matchesCategory;
  });
}

export function getFeaturedBooks(limit = 4): Book[] {
  return books.slice(0, limit);
}

export function getBookById(id: string): Book | undefined {
  return books.find((book) => book.id === id);
}
