"use client";

import toast from "react-hot-toast";

type BorrowButtonProps = {
  title: string;
};

export function BorrowButton({ title }: BorrowButtonProps) {
  return (
    <button
      type="button"
      onClick={() => toast.success(`Borrow request sent for "${title}"`)}
      className="btn btn-primary"
    >
      Borrow Book
    </button>
  );
}
