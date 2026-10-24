"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Bookmark, Plus } from "lucide-react";
import { fetchWorkout } from "@/lib/api";
import { Workout } from "@/lib/types";
import { MAX_PLAN, usePlan } from "@/context/PlanContext";
import Spinner from "@/components/Spinner";

export default function WorkoutDetail() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<{
    id: string;
    status: "ok" | "missing" | "error";
    workout: Workout | null;
  } | null>(null);
  const { plan, saved, addToPlan, save } = usePlan();

  useEffect(() => {
    let active = true;
    fetchWorkout(id)
      .then((d) => {
        if (!active) return;
        setResult({
          id,
          status: !d || !d.id ? "missing" : "ok",
          workout: d && d.id ? d : null,
        });
      })
      .catch((e) => {
        if (active) setResult({ id, status: e.message === "NOT_FOUND" ? "missing" : "error", workout: null });
      });
    return () => { active = false; };
  }, [id]);

  const current = result?.id === id ? result : null;
  const status = current?.status ?? "loading";
  const w = current?.workout ?? null;

  if (status === "missing") notFound();
  if (status === "loading") return <Spinner label="Loading workout…" />;
  if (status === "error" || !w) return <p className="py-20 text-center text-error">Couldn&apos;t load this workout. Refresh to try again.</p>;

  const inPlan = plan.some((p) => p.id === w.id);
  const full = plan.length >= MAX_PLAN && !inPlan;
  const specs: [string, string][] = [
    ["Equipment", w.equipment], ["Difficulty", w.difficulty], ["Sets", String(w.sets)], ["Reps", w.reps],
    ["Duration", `${w.duration} min`], ["Calories", `${w.caloriesBurned} kcal`], ["Rating", String(w.rating)],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-primary">
        <ArrowLeft size={16} /> Back to library
      </Link>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-200">
          <img src={w.image} alt={w.name} className="h-full max-h-[600px] w-full object-cover" />
        </div>
        <div>
          <h1 className="text-4xl font-bold sm:text-5xl">{w.name}</h1>
          <p className="mt-3 text-base-content/70">{w.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {w.muscleGroups.map((m) => <span key={m} className="rounded-md bg-base-300 px-2.5 py-1 text-xs font-semibold">{m}</span>)}
          </div>

          <h2 className="mt-8 mb-3 text-xl font-semibold">Key specs</h2>
          <dl className="divide-y divide-base-300 rounded-xl border border-base-300 bg-base-200">
            {specs.map(([k, v]) => (
              <div key={k} className="flex justify-between px-4 py-2.5 text-sm">
                <dt className="font-semibold uppercase tracking-wide text-base-content/60">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-8 mb-3 text-xl font-semibold">Instructions</h2>
          <ol className="space-y-3">
            {w.instructions.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">{i + 1}</span>
                <span className="pt-0.5 text-base-content/80">{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="btn btn-primary flex-1 gap-2 rounded-full" disabled={inPlan || full} onClick={() => addToPlan(w.id, w.name)}>
              <Plus size={18} /> {inPlan ? "In today's plan" : full ? "Plan is full" : "Add to today's plan"}
            </button>
            <button className="btn btn-outline flex-1 gap-2 rounded-full" disabled={saved.includes(w.id)} onClick={() => save(w.id, w.name)}>
              <Bookmark size={18} /> {saved.includes(w.id) ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
