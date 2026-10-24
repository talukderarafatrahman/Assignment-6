import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-bold text-primary">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-base-content/70">That page doesn&apos;t exist. Head back to the library and pick a lift.</p>
      <Link href="/" className="btn btn-primary mt-6 rounded-full font-bold uppercase">Go to workouts</Link>
    </div>
  );
}
