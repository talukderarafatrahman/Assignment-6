import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";

export default function Stats({ w }: { w: Workout }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-base-content/80">
      <span className="flex items-center gap-1.5"><Clock size={15} className="text-primary" />{w.duration} min</span>
      <span className="flex items-center gap-1.5"><Flame size={15} className="text-primary" />{w.caloriesBurned} kcal</span>
      <span className="flex items-center gap-1.5"><Star size={15} className="text-primary" />{w.rating}</span>
    </div>
  );
}
