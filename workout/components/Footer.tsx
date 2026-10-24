import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-200">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-base-content/70 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-base-content">
          <Image src="/logo.png" alt="" width={24} height={24} />
          <span className="font-display text-lg font-bold">FitLog</span>
        </div>
        <p className="text-center sm:text-right">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
