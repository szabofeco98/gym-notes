import { planService } from "@/src/services/planService";
import { queryKeys } from "@/src/services/queryKeys";
import { useAuthStore } from "@/src/stores/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: ({
      name,
      description,
    }: {
      name: string;
      description?: string;
    }) => planService.createPlan({ userId: user!.$id, name, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plans() });
    },
  });
};
