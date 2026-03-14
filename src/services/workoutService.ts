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
    planId?: string;
    name: string;
    startedAt: string;
    sets: SessionSet[];
  }): Promise<WorkoutSession> => {
    const completedAt = new Date().toISOString();

    const session = await tablesDb.createRow({
      databaseId: DB_ID,
      tableId: COLLECTIONS.SESSIONS,
      rowId: ID.unique(),
      data: {
        userId: data.userId,
        planId: data.planId ?? null,
        name: data.name,
        startedAt: data.startedAt,
        completedAt,
        totalSets: data.sets.length,
      },
    });

    await Promise.all(
      data.sets.map((set) =>
        tablesDb.createRow({
          databaseId: DB_ID,
          tableId: COLLECTIONS.SETS,
          rowId: ID.unique(),
          data: {
            sessionId: session.$id,
            exerciseId: set.exerciseId,
            exerciseName: set.exerciseName,
            setNumber: set.setNumber,
            weight: set.weight,
            reps: set.reps,
            rpe: set.rpe ?? null,
            completedAt,
          },
        }),
      ),
    );

    return session as unknown as WorkoutSession;
  },
};
