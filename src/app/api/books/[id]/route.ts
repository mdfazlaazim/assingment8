import { NextResponse } from "next/server";

import { getBookById } from "@/lib/books";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, props: RouteProps) {
  const { id } = await props.params;
  const book = getBookById(id);

  if (!book) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}
