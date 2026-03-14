import { dayPlanService } from "@/src/services/dayPlanService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDayPlanExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dayPlanExercise: string) =>
      dayPlanService.removeExerciseFromDayPlan(dayPlanExercise),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dayPlanExercises"] });
    },
  });
};
