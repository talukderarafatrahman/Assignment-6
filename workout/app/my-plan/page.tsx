"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { fetchWorkouts, sortWorkouts } from "@/lib/api";
import { SortKey, Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";
import SortSelect from "@/components/SortSelect";
import Spinner from "@/components/Spinner";
import Stats from "@/components/Stats";

type Tab = "plan" | "saved";

export default function MyPlan() {
  const { plan, saved, ready, removeFromPlan, removeSaved, markDone } = usePlan();
  const [all, setAll] = useState<Workout[] | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("plan");
  const [sort, setSort] = useState<SortKey>("duration");

  useEffect(() => { fetchWorkouts().then(setAll).catch((e) => setError(e.message)); }, []);

  const planItems = useMemo(
    () => plan.map((p) => ({ w: all?.find((w) => w.id === p.id), done: p.done }))
      .filter((x): x is { w: Workout; done: boolean } => !!x.w),
    [all, plan],
  );
  const savedItems = useMemo(
    () => saved.map((id) => all?.find((w) => w.id === id)).filter((w): w is Workout => !!w),
    [all, saved],
  );

  const totals = useMemo(() => ({
    ex: planItems.length,
    min: planItems.reduce((s, x) => s + x.w.duration, 0),
    kcal: planItems.reduce((s, x) => s + x.w.caloriesBurned, 0),
  }), [planItems]);

  const rows = useMemo(
    () => sortWorkouts(tab === "plan" ? planItems.map((x) => x.w) : savedItems, sort),
    [tab, sort, planItems, savedItems],
  );

  const loading = !ready || (!all && !error);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-5xl font-bold">My Plan</h1>
      <p className="mt-2 text-base-content/70">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {[["Exercises", totals.ex], ["Minutes", totals.min], ["Calories", totals.kcal]].map(([l, v]) => (
          <div key={l} className="rounded-xl border border-base-300 bg-base-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">{l}</p>
            <p className="font-display text-3xl font-bold text-primary sm:text-4xl">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div role="tablist" className="inline-flex rounded-full border border-base-300 bg-base-200 p-1">
          {([["plan", "Today's Plan", plan.length], ["saved", "Saved", saved.length]] as const).map(([k, label, n]) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${tab === k ? "bg-primary text-primary-content" : "text-base-content/70"}`}>
              {label} ({n})
            </button>
          ))}
        </div>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      <div className="mt-6">
        {error ? (
          <p className="py-16 text-center text-error">Couldn&apos;t load workouts. {error}</p>
        ) : loading ? (
          <Spinner />
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-base-300 py-16 text-center">
            <h2 className="text-3xl font-bold">Nothing here yet</h2>
            <p className="mt-2 text-base-content/70">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="btn btn-primary mt-6 rounded-full font-bold">Go to workouts</Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {rows.map((w) => {
              const done = plan.find((p) => p.id === w.id)?.done;
              return (
                <li key={w.id} className={`flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-200 p-3 sm:flex-row sm:items-center ${done ? "opacity-60" : ""}`}>
                  <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-24">
                    <Image src={w.image} alt={w.name} fill sizes="(max-width: 640px) 100vw, 96px" className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className={`text-xl font-semibold ${done ? "line-through" : ""}`}>{w.name}</h3>
                    <p className="text-sm text-base-content/60">{w.equipment}</p>
                    <Stats w={w} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/workout/${w.id}`} className="btn btn-outline btn-sm rounded-full">View Details</Link>
                    {tab === "plan" && (
                      <button className="btn btn-primary btn-sm gap-1 rounded-full" disabled={done} onClick={() => markDone(w.id, w.name)}>
                        <Check size={16} /> {done ? "Done" : "Mark as Done"}
                      </button>
                    )}
                    <button aria-label={`Remove ${w.name}`} className="btn btn-ghost btn-sm btn-circle"
                      onClick={() => (tab === "plan" ? removeFromPlan(w.id, w.name) : removeSaved(w.id, w.name))}>
                      <X size={18} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
