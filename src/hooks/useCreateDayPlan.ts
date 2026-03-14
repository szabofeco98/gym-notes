import { dayPlanService } from "@/src/services/dayPlanService";
import { queryKeys } from "@/src/services/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateDayPlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { plan: string; name: string; order: number }) =>
      dayPlanService.createDayPlan(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.dayPlans(variables.plan),
      });
    },
  });
};
