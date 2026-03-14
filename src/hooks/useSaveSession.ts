import { queryKeys } from "@/src/services/queryKeys";
import { workoutService } from "@/src/services/workoutService";
import type { SessionSet } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      userId: string;
      planId?: string;
      name: string;
      startedAt: string;
      sets: SessionSet[];
    }) => workoutService.saveSession(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workoutSessions() });
    },
  });
};
