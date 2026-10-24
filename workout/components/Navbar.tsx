"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const links = [
    { href: "/", label: "Workout", active: pathname === "/" || pathname.startsWith("/workout") },
    { href: "/my-plan", label: "My Plan", active: pathname.startsWith("/my-plan") },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6" aria-label="Main">
        <Link href="/" className="flex items-center gap-2" aria-label="FitLog home">
          <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-xl font-bold tracking-wider hidden sm:inline">FitLog</span>
        </Link>
        <ul className="flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={l.active ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors sm:px-4 ${
                  l.active ? "bg-base-300 text-primary" : "text-base-content/70 hover:text-base-content"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href="/my-plan" className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-content sm:text-sm" aria-label={`Plan: ${plan.length}`}>
            <span className="hidden sm:inline">Plan</span> <span>{plan.length}</span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-1.5 rounded-full border border-base-content/40 px-3 py-1.5 text-xs font-bold sm:text-sm" aria-label={`Saved: ${saved.length}`}>
            <span className="hidden sm:inline">Saved</span> <span>{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
