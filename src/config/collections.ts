/**
 * Appwrite Database & Table IDs
 *
 * Create the following tables in your Appwrite Console, then add the IDs to .env.local:
 *
 * DATABASE: one database (any name, e.g. "gymnotes")
 *
 * ── TEMPLATE LAYER ──
 *
 * TABLE: plans
 *   - userId      string   required
 *   - name        string   required
 *   - description string   optional
 *
 * TABLE: day_plans
 *   - plan        string   required  (FK → plans)
 *   - name        string   required
 *   - order       integer  required
 *
 * TABLE: exercises
 *   - name         string  required
 *   - muscleGroup  string  required
 *   - description  string  optional
 *
 * TABLE: day_plan_exercises
 *   - dayPlan     string   required  (FK → day_plans)
 *   - exercise    string   required  (FK → exercises)
 *   - orderIndex   integer  required
 *   - targetSets   integer  optional
 *   - notes        string   optional
 *
 * ── EXECUTION LAYER ──
 *
 * TABLE: workout_sessions
 *   - userId       string   required
 *   - dayPlan    string   optional  (FK → day_plans; null for free workouts)
 *   - date         string   required  (ISO date: YYYY-MM-DD)
 *   - startTime    string   optional  (ISO datetime)
 *   - endTime      string   optional  (ISO datetime)
 *   - notes        string   optional
 *   - completed    boolean  required
 *
 * TABLE: workout_sets
 *   - workoutSessionId   string   required  (FK → workout_sessions)
 *   - dayPlanExercise     string   optional  (FK → day_plan_exercises; null for free workouts)
 *   - exercise            string   required
 *   - exerciseName       string   required  (denormalized for display)
 *   - setNumber          integer  required
 *   - weight             double   required
 *   - reps               integer  required
 *   - rpe                integer  optional
 *   - comment            string   optional
 *
 * Set row-level permissions to: role:user (read + write) for all tables.
 */

export const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;

export const COLLECTIONS = {
  // Template layer
  PLANS: process.env.EXPO_PUBLIC_APPWRITE_COL_PLANS!,
  DAY_PLANS: process.env.EXPO_PUBLIC_APPWRITE_COL_DAY_PLANS!,
  EXERCISES: process.env.EXPO_PUBLIC_APPWRITE_COL_EXERCISES!,
  DAY_PLAN_EXERCISES: process.env.EXPO_PUBLIC_APPWRITE_COL_DAY_PLAN_EXERCISES!,
  // Execution layer
  SESSIONS: process.env.EXPO_PUBLIC_APPWRITE_COL_SESSIONS!,
  SETS: process.env.EXPO_PUBLIC_APPWRITE_COL_SETS!,
} as const;
