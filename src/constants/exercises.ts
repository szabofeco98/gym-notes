import type { Exercise } from "@/src/types";

export const DEFAULT_EXERCISES: Exercise[] = [
  // Chest
  {
    id: "bench-press",
    name: "Bench Press",
    muscleGroup: "Chest",
    description: "Barbell flat bench press",
  },
  { id: "incline-db-press", name: "Incline DB Press", muscleGroup: "Chest" },
  { id: "cable-fly", name: "Cable Fly", muscleGroup: "Chest" },
  { id: "chest-dip", name: "Chest Dip", muscleGroup: "Chest" },
  // Back
  {
    id: "deadlift",
    name: "Deadlift",
    muscleGroup: "Back",
    description: "Conventional barbell deadlift",
  },
  { id: "pull-up", name: "Pull Up", muscleGroup: "Back" },
  { id: "barbell-row", name: "Barbell Row", muscleGroup: "Back" },
  { id: "lat-pulldown", name: "Lat Pulldown", muscleGroup: "Back" },
  { id: "seated-cable-row", name: "Seated Cable Row", muscleGroup: "Back" },
  // Shoulders
  { id: "overhead-press", name: "Overhead Press", muscleGroup: "Shoulders" },
  { id: "lateral-raise", name: "Lateral Raise", muscleGroup: "Shoulders" },
  { id: "face-pull", name: "Face Pull", muscleGroup: "Shoulders" },
  // Biceps
  { id: "barbell-curl", name: "Barbell Curl", muscleGroup: "Biceps" },
  { id: "hammer-curl", name: "Hammer Curl", muscleGroup: "Biceps" },
  { id: "incline-db-curl", name: "Incline DB Curl", muscleGroup: "Biceps" },
  // Triceps
  { id: "tricep-pushdown", name: "Tricep Pushdown", muscleGroup: "Triceps" },
  { id: "skull-crusher", name: "Skull Crusher", muscleGroup: "Triceps" },
  {
    id: "overhead-tricep",
    name: "Overhead Tricep Extension",
    muscleGroup: "Triceps",
  },
  // Legs
  {
    id: "squat",
    name: "Squat",
    muscleGroup: "Legs",
    description: "Barbell back squat",
  },
  { id: "rdl", name: "Romanian Deadlift", muscleGroup: "Legs" },
  { id: "leg-press", name: "Leg Press", muscleGroup: "Legs" },
  { id: "leg-curl", name: "Leg Curl", muscleGroup: "Legs" },
  { id: "leg-extension", name: "Leg Extension", muscleGroup: "Legs" },
  { id: "bulgarian-split", name: "Bulgarian Split Squat", muscleGroup: "Legs" },
  // Glutes
  { id: "hip-thrust", name: "Hip Thrust", muscleGroup: "Glutes" },
  { id: "glute-bridge", name: "Glute Bridge", muscleGroup: "Glutes" },
  // Core
  { id: "plank", name: "Plank", muscleGroup: "Core" },
  { id: "crunches", name: "Crunches", muscleGroup: "Core" },
  { id: "ab-wheel", name: "Ab Wheel Rollout", muscleGroup: "Core" },
  { id: "cable-crunch", name: "Cable Crunch", muscleGroup: "Core" },
  // Calves
  { id: "calf-raise", name: "Calf Raise", muscleGroup: "Calves" },
  { id: "seated-calf-raise", name: "Seated Calf Raise", muscleGroup: "Calves" },
];
