import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(64, "Name is too long"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(256, "Password is too long"),
});

export const createPlanSchema = z.object({
  name: z
    .string()
    .min(1, "Plan name is required")
    .max(100, "Plan name must be 100 characters or fewer"),
  description: z
    .string()
    .max(500, "Description must be 500 characters or fewer")
    .optional(),
});

export const workoutSetSchema = z.object({
  weight: z
    .string()
    .min(1, "Weight is required")
    .refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0, {
      message: "Enter a valid weight",
    }),
  reps: z
    .string()
    .min(1, "Reps are required")
    .refine((v) => !isNaN(parseInt(v, 10)) && parseInt(v, 10) > 0, {
      message: "Enter a valid rep count",
    }),
  rpe: z
    .string()
    .optional()
    .refine(
      (v) =>
        !v ||
        (!isNaN(parseInt(v, 10)) &&
          parseInt(v, 10) >= 1 &&
          parseInt(v, 10) <= 10),
      { message: "RPE must be between 1 and 10" },
    ),
});

export type LoginFields = z.infer<typeof loginSchema>;
export type RegisterFields = z.infer<typeof registerSchema>;
export type CreatePlanFields = z.infer<typeof createPlanSchema>;
export type WorkoutSetFields = z.infer<typeof workoutSetSchema>;
