'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminError({ error, reset }) {
  useEffect(() => {
    console.error('Admin route error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center font-mono bg-[var(--bg)] text-[var(--text)]">
      <h2 className="text-2xl font-serif text-[var(--text)] mb-4">Something went wrong</h2>
      <p className="text-[var(--text-muted)] mb-8 max-w-md">
        {error?.message?.includes("Can't reach database") 
          ? "Failed to connect to the database. Please try again later."
          : "An unexpected error occurred in the admin panel."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-[var(--accent)] text-black px-6 py-2 font-semibold hover:bg-[#b08b3b] transition-colors"
        >
          Try again
        </button>
        <Link 
          href="/" 
          className="border border-[var(--line)] text-[var(--text)] px-6 py-2 hover:text-[var(--text-muted)] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
