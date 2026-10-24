# 💪 FitLog — Workout Library

A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.

**Live:** _add link_ · **Repo:** _add link_

## Technologies
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · daisyUI 5 · lucide-react

## Features
1. **Workout library** — 12 lifts from the FitLog API in a responsive 4/3/2/1-column grid.
2. **Sort dropdown** — re-sort by Duration, Calories or Rating.
3. **Detail page** — image, key specs, 4-step instructions, add-to-plan and save-for-later actions.
4. **My Plan** — live Exercises / Minutes / Calories metrics, Today's Plan and Saved tabs, Mark as Done and remove, empty state.
5. **Navbar counters + toasts** — live Plan and Saved badges, toast on every action, five-lift cap.
6. **Persistence & resilience** — plan saved in `localStorage`, loading spinners, custom 404, automatic fallback to the alternative API.

## Run locally
```bash
npm install
npm run dev
```
Deploy to Vercel (zero config). Reloading any route works because Next.js handles routing server-side.
