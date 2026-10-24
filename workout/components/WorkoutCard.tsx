import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/lib/types";
import Stats from "./Stats";

export default function WorkoutCard({ w }: { w: Workout }) {
  return (
    <Link href={`/workout/${w.id}`} className="group flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition-colors hover:border-primary">
      <div className="relative aspect-4/3 overflow-hidden bg-base-300">
        <Image src={w.image} alt={w.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {w.muscleGroups.map((m) => (
            <span key={m} className="rounded-md bg-base-300 px-2 py-0.5 text-xs font-semibold uppercase">{m}</span>
          ))}
        </div>
        <h3 className="text-xl font-semibold leading-tight">{w.name}</h3>
        <p className="text-sm text-base-content/60">{w.equipment}</p>
        <div className="mt-auto pt-2"><Stats w={w} /></div>
      </div>
    </Link>
  );
}
