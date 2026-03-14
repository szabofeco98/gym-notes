import { tablesDb } from "@/src/config/appwrite";
import { COLLECTIONS, DB_ID } from "@/src/config/collections";
import type { SessionSet, WorkoutSession } from "@/src/types";
import { ID, Query } from "react-native-appwrite";

export const workoutService = {
  getSessions: async (userId: string): Promise<WorkoutSession[]> => {
    const res = await tablesDb.listRows({
      databaseId: DB_ID,
      tableId: COLLECTIONS.SESSIONS,
      queries: [Query.equal("userId", userId), Query.orderDesc("$createdAt")],
    });
    return res.rows as unknown as WorkoutSession[];
  },

  saveSession: async (data: {
    userId: string;
    dayPlan?: string;
    date: string;
    startTime?: string;
    endTime?: string;
    notes?: string;
    completed?: boolean;
    sets: SessionSet[];
  }): Promise<WorkoutSession> => {
    console.log("Saving session with data:", data);
    const session = await tablesDb.createRow({
      databaseId: DB_ID,
      tableId: COLLECTIONS.SESSIONS,
      rowId: ID.unique(),
      data: {
        userId: data.userId,
        dayPlan: data.dayPlan ?? null,
        date: data.date,
        // startTime: data.startTime ?? null,
        // endTime: data.endTime ?? null,
        // notes: data.notes ?? null,
        completed: data.completed ?? true,
      },
    });
    console.log(data.sets);

    await Promise.all(
      data.sets.map((set) =>
        tablesDb.createRow({
          databaseId: DB_ID,
          tableId: COLLECTIONS.SETS,
          rowId: ID.unique(),
          data: {
            workoutSession: session.$id,
            dayPlanExcercise: set.dayPlanExercise ?? null,
            // exercise: set.exercise,
            // exerciseName: set.exerciseName,
            setNumber: set.setNumber,
            weight: set.weight,
            reps: set.reps,
            comment: set.rpe ?? null,
          },
        }),
      ),
    );

    return session as unknown as WorkoutSession;
  },
};
