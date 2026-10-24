export default function Spinner({ label = "Loading workouts…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20" role="status">
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-sm text-base-content/70">{label}</p>
    </div>
  );
}
