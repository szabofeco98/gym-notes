export const MUSCLE_GROUPS = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Legs",
  "Glutes",
  "Core",
  "Calves",
  "Full Body",
] as const;

export type MuscleGroup = (typeof MUSCLE_GROUPS)[number];
