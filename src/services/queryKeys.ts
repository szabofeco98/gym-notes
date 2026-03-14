export const queryKeys = {
  // Plans
  plans: () => ["plans"] as const,
  planDetail: (id: string) => ["plans", id] as const,

  // Day plans (within a plan)
  dayPlans: (plan: string) => ["dayPlans", plan] as const,

  // Day plan exercises (within a day plan)
  dayPlanExercises: (dayPlan: string) => ["dayPlanExercises", dayPlan] as const,

  // Exercises (master list)
  exercises: () => ["exercises"] as const,
  exercisesByMuscleGroup: (muscleGroup: string) =>
    ["exercises", "byMuscleGroup", muscleGroup] as const,

  // Workout sessions
  workoutSessions: () => ["workoutSessions"] as const,
  workoutSessionDetail: (id: string) => ["workoutSessions", id] as const,
};
