/**
 * Appwrite Database & Collection IDs
 *
 * Create the following in your Appwrite Console, then add the IDs to .env.local:
 *
 * DATABASE: one database (any name, e.g. "gymnotes")
 *
 * COLLECTION: plans
 *   - userId      string  required
 *   - name        string  required
 *   - description string  optional
 *
 * COLLECTION: sessions
 *   - userId      string  required
 *   - planId      string  optional
 *   - name        string  required
 *   - startedAt   string  required
 *   - completedAt string  required
 *   - totalSets   integer required
 *
 * COLLECTION: sets
 *   - sessionId   string  required
 *   - exerciseId  string  required
 *   - exerciseName string required
 *   - setNumber   integer required
 *   - weight      double  required
 *   - reps        integer required
 *   - rpe         integer optional
 *   - completedAt string  required
 *
 * Set document-level permissions to: role:user (read + write) for all collections.
 */

export const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;

export const COLLECTIONS = {
  PLANS: process.env.EXPO_PUBLIC_APPWRITE_COL_PLANS!,
  SESSIONS: process.env.EXPO_PUBLIC_APPWRITE_COL_SESSIONS!,
  SETS: process.env.EXPO_PUBLIC_APPWRITE_COL_SETS!,
} as const;
