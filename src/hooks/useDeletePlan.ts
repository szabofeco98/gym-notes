import { planService } from "@/src/services/planService";
import { queryKeys } from "@/src/services/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (planId: string) => planService.deletePlan(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plans() });
    },
  });
};
