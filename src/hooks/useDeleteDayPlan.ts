import { dayPlanService } from "@/src/services/dayPlanService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDayPlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dayPlan: string) => dayPlanService.deleteDayPlan(dayPlan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dayPlans"] });
    },
  });
};
