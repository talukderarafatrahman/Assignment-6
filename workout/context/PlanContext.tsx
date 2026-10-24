"use client";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

export const MAX_PLAN = 5;
export interface PlanItem { id: number; done: boolean }
type Kind = "success" | "info" | "error";
interface ToastMsg { key: number; text: string; kind: Kind }

interface PlanCtx {
  plan: PlanItem[];
  saved: number[];
  ready: boolean;
  addToPlan: (id: number, name: string) => void;
  save: (id: number, name: string) => void;
  removeFromPlan: (id: number, name: string) => void;
  removeSaved: (id: number, name: string) => void;
  markDone: (id: number, name: string) => void;
  notify: (text: string, kind?: Kind) => void;
}

const Ctx = createContext<PlanCtx | null>(null);
const KEY = "fitlog:v1";

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  useEffect(() => {
    let active = true;
    let restoredPlan: PlanItem[] | null = null;
    let restoredSaved: number[] | null = null;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (Array.isArray(d.plan)) restoredPlan = d.plan;
        if (Array.isArray(d.saved)) restoredSaved = d.saved;
      }
    } catch {}
    queueMicrotask(() => {
      if (!active) return;
      if (restoredPlan) setPlan(restoredPlan);
      if (restoredSaved) setSaved(restoredSaved);
      setReady(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify({ plan, saved })); } catch {}
  }, [plan, saved, ready]);

  const notify = useCallback((text: string, kind: Kind = "success") => {
    const key = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { key, text, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.key !== key)), 2600);
  }, []);

  const addToPlan = (id: number, name: string) => {
    if (plan.some((p) => p.id === id)) return notify(`${name} is already in today's plan`, "info");
    if (plan.length >= MAX_PLAN) return notify("Today's plan is full. Finish a lift or remove one first.", "error");
    setPlan([...plan, { id, done: false }]);
    notify(`Added ${name} to today's plan`);
  };
  const save = (id: number, name: string) => {
    if (saved.includes(id)) return notify(`${name} is already saved`, "info");
    setSaved([...saved, id]);
    notify(`Saved ${name} for later`);
  };
  const removeFromPlan = (id: number, name: string) => {
    setPlan(plan.filter((p) => p.id !== id));
    notify(`Removed ${name} from today's plan`, "info");
  };
  const removeSaved = (id: number, name: string) => {
    setSaved(saved.filter((s) => s !== id));
    notify(`Removed ${name} from saved`, "info");
  };
  const markDone = (id: number, name: string) => {
    setPlan(plan.map((p) => (p.id === id ? { ...p, done: true } : p)));
    notify(`${name} marked as done`);
  };

  return (
    <Ctx.Provider value={{ plan, saved, ready, addToPlan, save, removeFromPlan, removeSaved, markDone, notify }}>
      {children}
      <div className="toast toast-end toast-bottom z-50" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.key} className={`alert ${t.kind === "error" ? "alert-error" : t.kind === "info" ? "alert-info" : "alert-success"} py-2 text-sm font-semibold`}>
            <span>{t.text}</span>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function usePlan() {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePlan must be used inside PlanProvider");
  return c;
}
