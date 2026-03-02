export const queryKeys = {
  all: ['plans'] as const,
  plans: () => [...queryKeys.all, 'plans'] as const,
  plansDetail: () => [...queryKeys.plans(), 'detail'] as const,
  planDetail: (id: string) => [...queryKeys.plansDetail(), id] as const,

  workouts: () => ['workouts'] as const,
  workoutSessions: () => [...queryKeys.workouts(), 'sessions'] as const,
  workoutSessionDetail: (id: string) => [...queryKeys.workoutSessions(), id] as const,

  exercises: () => ['exercises'] as const,
  exercisesByMuscleGroup: (muscleGroup: string) => [
    ...queryKeys.exercises(),
    'byMuscleGroup',
    muscleGroup,
  ] as const,
};

