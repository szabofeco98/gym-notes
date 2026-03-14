// ─── Appwrite document types ────────────────────────────────────────────────

export interface Plan {
  $id: string;
  userId: string;
  name: string;
  description?: string;
  $createdAt: string;
}

export interface WorkoutSession {
  $id: string;
  userId: string;
  planId?: string;
  name: string;
  startedAt: string;
  completedAt: string;
  totalSets: number;
}

export interface WorkoutSet {
  $id: string;
  sessionId: string;
  exerciseId: string;
  exerciseName: string;
  setNumber: number;
  weight: number;
  reps: number;
  rpe?: number;
  completedAt: string;
}

// ─── Local types (exercise library, not stored in Appwrite) ─────────────────

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  description?: string;
}

// ─── In-progress session types (Zustand) ────────────────────────────────────

export interface SessionSet {
  exerciseId: string;
  exerciseName: string;
  setNumber: number;
  weight: number;
  reps: number;
  rpe?: number;
}

export interface ActiveSession {
  planId?: string;
  planName: string;
  exercises: Exercise[];
  sets: SessionSet[];
  startedAt: string;
}
