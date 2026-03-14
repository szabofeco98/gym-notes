import { tablesDb } from "@/src/config/appwrite";
import { COLLECTIONS, DB_ID } from "@/src/config/collections";
import type { Exercise, MuscleGroup } from "@/src/types";
import { ID, Query } from "react-native-appwrite";

type AppwriteRow = {
  $id: string;
  name: string;
  muscleGroup: string;
  description?: string;
};

function rowToExercise(row: AppwriteRow): Exercise {
  return {
    id: row.$id,
    $id: row.$id,
    name: row.name,
    muscleGroup: row.muscleGroup as MuscleGroup,
    description: row.description,
  };
}

export const exerciseService = {
  getExercises: async (): Promise<Exercise[]> => {
    const res = await tablesDb.listRows({
      databaseId: DB_ID,
      tableId: COLLECTIONS.EXERCISES,
    });
    return (res.rows as unknown as AppwriteRow[]).map(rowToExercise);
  },

  getExercisesByMuscleGroup: async (
    muscleGroup: MuscleGroup,
  ): Promise<Exercise[]> => {
    const res = await tablesDb.listRows({
      databaseId: DB_ID,
      tableId: COLLECTIONS.EXERCISES,
      queries: [Query.equal("muscleGroup", muscleGroup)],
    });
    return (res.rows as unknown as AppwriteRow[]).map(rowToExercise);
  },

  createExercise: async (data: {
    name: string;
    muscleGroup: MuscleGroup;
    description?: string;
  }): Promise<Exercise> => {
    const row = await tablesDb.createRow({
      databaseId: DB_ID,
      tableId: COLLECTIONS.EXERCISES,
      rowId: ID.unique(),
      data: {
        name: data.name,
        muscleGroup: data.muscleGroup,
        description: data.description ?? null,
      },
    });
    return rowToExercise(row as unknown as AppwriteRow);
  },
};
