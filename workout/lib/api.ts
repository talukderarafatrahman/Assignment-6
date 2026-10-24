import { Workout, SortKey } from "./types";
import { workouts } from "./workouts";

export const fetchWorkouts = async (): Promise<Workout[]> => workouts;
export const fetchWorkout = async (id: string): Promise<Workout> => {
  const workout = workouts.find((item) => item.id === Number(id));
  if (!workout) throw new Error("NOT_FOUND");
  return workout;
};

export const sortWorkouts = (list: Workout[], key: SortKey) =>
  [...list].sort((a, b) => b[key] - a[key]);
