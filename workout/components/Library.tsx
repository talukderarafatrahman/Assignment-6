"use client";
import { useEffect, useMemo, useState } from "react";
import { fetchWorkouts, sortWorkouts } from "@/lib/api";
import { SortKey, Workout } from "@/lib/types";
import SortSelect from "./SortSelect";
import Spinner from "./Spinner";
import WorkoutCard from "./WorkoutCard";

export default function Library() {
  const [result, setResult] = useState<{ attempt: number; data: Workout[] | null; error: string } | null>(null);
  const [sort, setSort] = useState<SortKey>("duration");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    fetchWorkouts()
      .then((data) => {
        if (active) setResult({ attempt, data, error: "" });
      })
      .catch((e) => {
        if (active) setResult({ attempt, data: null, error: e.message });
      });
    return () => { active = false; };
  }, [attempt]);

  const current = result?.attempt === attempt ? result : null;
  const data = current?.data ?? null;
  const error = current?.error ?? "";
  const list = useMemo(() => (data ? sortWorkouts(data, sort) : []), [data, sort]);

  return (
    <section id="library" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-4xl font-bold">The Library</h2>
          <p className="mt-1 text-base-content/70">Twelve lifts covering every major muscle group.</p>
        </div>
        <SortSelect value={sort} onChange={setSort} />
      </div>
      {error ? (
        <div className="py-16 text-center">
          <p className="mb-4 text-error">Couldn&apos;t load workouts. {error}</p>
          <button className="btn btn-primary btn-sm" onClick={() => setAttempt((a) => a + 1)}>Try again</button>
        </div>
      ) : !data ? (
        <Spinner />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((w) => <WorkoutCard key={w.id} w={w} />)}
        </div>
      )}
    </section>
  );
}
