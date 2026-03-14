// ─── Muscle group union ──────────────────────────────────────────────────────

export type MuscleGroup =
  | "Chest"
  | "Back"
  | "Legs"
  | "Shoulders"
  | "Biceps"
  | "Triceps"
  | "Forearms"
  | "Abs"
  | "Core"
  | "Glutes"
  | "Calves"
  | "Cardio";

// ─── Template layer ──────────────────────────────────────────────────────────

/** Reusable workout program / split */
export interface Plan {
  $id: string;
  userId: string;
  name: string;
  description?: string;
  $createdAt: string;
  $updatedAt: string;
}

/** A named day within a plan (e.g. "Push Day", "Pull Day") */
export interface DayPlan {
  $id: string;
  plan: string;
  name: string;
  order: number;
  $createdAt: string;
  $updatedAt: string;
}

/** Master exercise definition */
export interface Exercise {
  id: string; // slug id for local constants; maps from $id for Appwrite rows
  $id?: string; // set when fetched from Appwrite
  name: string;
  muscleGroup: MuscleGroup;
  description?: string;
}

/** Junction: exercise assigned to a specific day in a plan */
export interface DayPlanExercise {
  $id: string;
  dayPlan: string;
  exercise: string;
  orderIndex: number;
  targetSets?: number;
  notes?: string;
  $createdAt: string;
}

// ─── Execution layer ─────────────────────────────────────────────────────────

/** One completed workout — actual execution of a day plan on a date */
export interface WorkoutSession {
  $id: string;
  userId: string;
  /** Set when the session follows a specific day plan; null for free workouts */
  dayPlan?: string;
  date: string; // ISO date string: YYYY-MM-DD
  startTime?: string; // ISO datetime
  endTime?: string; // ISO datetime
  notes?: string;
  completed: boolean;
  $createdAt: string;
  $updatedAt: string;
}

/** Individual set performance recorded during a session */
export interface WorkoutSet {
  $id: string;
  workoutSessionId: string;
  /** Set when the session follows a day plan; null for free workouts */
  dayPlanExercise?: string;
  exercise: string; // kept for reference and display
  exerciseName: string; // denormalized for fast display
  setNumber: number;
  weight: number;
  reps: number;
  rpe?: number;
  comment?: string;
  $createdAt: string;
}

// ─── In-progress session tracking (Zustand) ──────────────────────────────────

export interface SessionSet {
  dayPlanExercise?: string;
  exercise: string;
  exerciseName: string;
  setNumber: number;
  weight: number;
  reps: number;
  rpe?: number;
}

export interface ActiveSession {
  /** ID of the DayPlan being worked; null for free workouts */
  dayPlan?: string;
  planName: string;
  exercises: Exercise[];
  /** Cached DayPlanExercise rows so we can resolve dayPlanExercise when logging sets */
  dayPlanExercises?: DayPlanExercise[];
  sets: SessionSet[];
  startedAt: string;
}
