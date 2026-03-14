import { tablesDb } from "@/src/config/appwrite";
import { COLLECTIONS, DB_ID } from "@/src/config/collections";
import type { Plan } from "@/src/types";
import { ID, Query } from "react-native-appwrite";

export const planService = {
  getPlans: async (userId: string): Promise<Plan[]> => {
    const res = await tablesDb.listRows({
      databaseId: DB_ID,
      tableId: COLLECTIONS.PLANS,
      queries: [Query.equal("userId", userId), Query.orderDesc("$createdAt")],
    });
    return res.rows as unknown as Plan[];
  },

  createPlan: async (data: {
    userId: string;
    name: string;
    description?: string;
  }): Promise<Plan> => {
    const row = await tablesDb.createRow({
      databaseId: DB_ID,
      tableId: COLLECTIONS.PLANS,
      rowId: ID.unique(),
      data,
    });
    return row as unknown as Plan;
  },

  deletePlan: async (plan: string): Promise<void> => {
    await tablesDb.deleteRow({
      databaseId: DB_ID,
      tableId: COLLECTIONS.PLANS,
      rowId: plan,
    });
  },
};
