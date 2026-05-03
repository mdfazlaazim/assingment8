"use client";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
  {
    title: "Weekly Curated Picks",
    text: "Get handpicked story, tech, and science books every week.",
  },
  {
    title: "Borrow with One Click",
    text: "Quickly borrow books from your profile dashboard.",
  },
  {
    title: "Read Anywhere",
    text: "Explore and manage your favorite books on any device.",
  },
];

export function HomeSwiper() {
  return (
    <section className="rounded-2xl bg-base-100 p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Book Highlights</h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="flex min-h-40 flex-col justify-center rounded-xl bg-primary/10 p-8">
              <h3 className="text-xl font-bold">{slide.title}</h3>
              <p className="mt-2">{slide.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
