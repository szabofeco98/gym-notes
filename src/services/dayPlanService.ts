import { tablesDb } from "@/src/config/appwrite";
import { COLLECTIONS, DB_ID } from "@/src/config/collections";
import type { DayPlan, DayPlanExercise } from "@/src/types";
import { ID, Query } from "react-native-appwrite";

export const dayPlanService = {
  getDayPlans: async (plan: string): Promise<DayPlan[]> => {
    const res = await tablesDb.listRows({
      databaseId: DB_ID,
      tableId: COLLECTIONS.DAY_PLANS,
      queries: [Query.equal("plan", plan), Query.orderAsc("order")],
    });
    return res.rows as unknown as DayPlan[];
  },

  createDayPlan: async (data: {
    plan: string;
    name: string;
    order: number;
  }): Promise<DayPlan> => {
    console.log(data, COLLECTIONS.DAY_PLANS);

    const row = await tablesDb.createRow({
      databaseId: DB_ID,
      tableId: COLLECTIONS.DAY_PLANS,
      rowId: ID.unique(),
      data,
    });
    return row as unknown as DayPlan;
  },

  deleteDayPlan: async (dayPlan: string): Promise<void> => {
    await tablesDb.deleteRow({
      databaseId: DB_ID,
      tableId: COLLECTIONS.DAY_PLANS,
      rowId: dayPlan,
    });
  },

  getDayPlanExercises: async (dayPlan: string): Promise<DayPlanExercise[]> => {
    const res = await tablesDb.listRows({
      databaseId: DB_ID,
      tableId: COLLECTIONS.DAY_PLAN_EXERCISES,
      queries: [Query.equal("dayPlan", dayPlan), Query.orderAsc("orderIndex")],
    });
    return res.rows as unknown as DayPlanExercise[];
  },

  addExerciseToDayPlan: async (data: {
    dayPlan: string;
    exercise: string;
    orderIndex: number;
    targetSets?: number;
    notes?: string;
  }): Promise<DayPlanExercise> => {
    const row = await tablesDb.createRow({
      databaseId: DB_ID,
      tableId: COLLECTIONS.DAY_PLAN_EXERCISES,
      rowId: ID.unique(),
      data: {
        dayPlan: data.dayPlan,
        exercise: data.exercise,
        orderIndex: data.orderIndex,
        targetSets: data.targetSets ?? null,
        notes: data.notes ?? null,
      },
    });
    return row as unknown as DayPlanExercise;
  },

  removeExerciseFromDayPlan: async (dayPlanExercise: string): Promise<void> => {
    await tablesDb.deleteRow({
      databaseId: DB_ID,
      tableId: COLLECTIONS.DAY_PLAN_EXERCISES,
      rowId: dayPlanExercise,
    });
  },
};
