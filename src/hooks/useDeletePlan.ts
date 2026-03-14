import { planService } from "@/src/services/planService";
import { queryKeys } from "@/src/services/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (plan: string) => planService.deletePlan(plan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plans() });
    },
  });
};
