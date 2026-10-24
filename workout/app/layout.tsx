import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and log every set.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="fitlog" className={`${inter.variable} ${oswald.variable}`}>
      <body className="min-h-screen flex flex-col bg-base-100 text-base-content">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}
