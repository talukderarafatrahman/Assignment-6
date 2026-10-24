import { ChevronDown } from "lucide-react";
import { SortKey } from "@/lib/types";

export default function SortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-base-content/70">
      Sort by
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="appearance-none rounded-lg border border-base-300 bg-base-200 py-2 pl-3 pr-9 font-semibold text-base-content"
        >
          <option value="duration">Duration</option>
          <option value="caloriesBurned">Calories</option>
          <option value="rating">Rating</option>
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
      </span>
    </label>
  );
}
