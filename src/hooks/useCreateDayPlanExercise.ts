import { dayPlanService } from "@/src/services/dayPlanService";
import { queryKeys } from "@/src/services/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateDayPlanExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      dayPlan: string;
      exercise: string;
      orderIndex: number;
      targetSets?: number;
      notes?: string;
    }) => dayPlanService.addExerciseToDayPlan(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.dayPlanExercises(variables.dayPlan),
      });
    },
  });
};
