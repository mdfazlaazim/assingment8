import "animate.css";

import Link from "next/link";
import Marquee from "react-fast-marquee";

import { BookCard } from "@/components/book-card";
import { HomeSwiper } from "@/components/home-swiper";
import type { Book } from "@/types/book";

async function getFeaturedFromApi() {
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const response = await fetch(new URL("/api/books?featured=4", apiUrl), {
    cache: "no-store",
  });

  if (!response.ok) {
    return [] as Book[];
  }

  return (await response.json()) as Book[];
}

export default async function Home() {
  const featuredBooks = await getFeaturedFromApi();

  return (
    <div className="space-y-12">
      <section className="hero rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 px-4 py-16">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="animate__animated animate__fadeInDown text-4xl font-black md:text-5xl">
              Find Your Next Read
            </h1>
            <p className="py-6">
              Browse a diverse library and borrow books in seconds.
            </p>
            <Link href="/all-books" className="btn btn-primary">
              Browse Now
            </Link>
          </div>
        </div>
      </section>

      <Marquee className="rounded-xl bg-base-200 py-3 text-sm font-semibold">
        New Arrivals... Fresh picks every week... Borrow instantly... Story, Tech,
        Science and more...
      </Marquee>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Books</h2>
          <Link href="/all-books" className="btn btn-ghost btn-sm">
            View All
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} detailHref={`/books/${book.id}`} />
          ))}
        </div>
      </section>

      <HomeSwiper />

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl bg-base-100 p-6 shadow-sm">
          <h3 className="text-xl font-bold">Why Readers Choose Us</h3>
          <p className="mt-3 text-sm leading-7">
            We make reading accessible with a smooth borrowing flow, rich categories,
            and a clean responsive dashboard.
          </p>
        </article>
        <article className="rounded-2xl bg-base-100 p-6 shadow-sm">
          <h3 className="text-xl font-bold">Community Picks</h3>
          <p className="mt-3 text-sm leading-7">
            Explore trending books selected by our readers to quickly discover your
            next favorite title.
          </p>
        </article>
      </section>
    </div>
  );
}
