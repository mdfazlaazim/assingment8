import { NextResponse } from "next/server";

import type { BookCategory } from "@/types/book";
import { getBooks, getFeaturedBooks } from "@/lib/books";

const CATEGORIES: BookCategory[] = ["Story", "Tech", "Science"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  const categoryParam = searchParams.get("category");
  const featured = searchParams.get("featured");

  if (featured) {
    const limit = Number.parseInt(featured, 10);
    const books = getFeaturedBooks(Number.isNaN(limit) ? 4 : limit);
    return NextResponse.json(books);
  }

  const category = CATEGORIES.includes(categoryParam as BookCategory)
    ? (categoryParam as BookCategory)
    : undefined;

  const books = getBooks({ q, category });
  return NextResponse.json(books);
}
