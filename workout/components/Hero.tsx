import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
      <div>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Workout Library</p>
        <h1 className="text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">Train with intent. Log every set.</h1>
        <p className="mt-5 max-w-lg text-base text-base-content/70 sm:text-lg">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a href="#library" className="btn btn-primary mt-8 gap-2 rounded-full font-bold uppercase">
          Browse workouts <ArrowDown size={18} />
        </a>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-base-300 bg-base-200">
        <Image src="/banner.png" alt="Muscle diagram on a gym machine" width={600} height={600} priority className="mx-auto h-auto max-h-[420px] w-auto object-contain" />
      </div>
    </section>
  );
}
