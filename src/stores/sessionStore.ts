import type { ActiveSession, Exercise, SessionSet } from "@/src/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface SessionState {
  activeSession: ActiveSession | null;
  startSession: (
    planName: string,
    exercises?: Exercise[],
    planId?: string,
  ) => void;
  addExercise: (exercise: Exercise) => void;
  addSet: (set: SessionSet) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  immer((set) => ({
    activeSession: null,

    startSession: (planName, exercises = [], planId) =>
      set((state) => {
        state.activeSession = {
          planId,
          planName,
          exercises,
          sets: [],
          startedAt: new Date().toISOString(),
        };
      }),

    addExercise: (exercise) =>
      set((state) => {
        state.activeSession?.exercises.push(exercise);
      }),

    addSet: (sessionSet) =>
      set((state) => {
        state.activeSession?.sets.push(sessionSet);
      }),

    clearSession: () =>
      set((state) => {
        state.activeSession = null;
      }),
  })),
);
