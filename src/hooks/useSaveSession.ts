import { queryKeys } from "@/src/services/queryKeys";
import { workoutService } from "@/src/services/workoutService";
import type { SessionSet } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSaveSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      userId: string;
      dayPlan?: string;
      date: string;
      startTime?: string;
      endTime?: string;
      notes?: string;
      completed?: boolean;
      sets: SessionSet[];
    }) => workoutService.saveSession(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workoutSessions() });
    },
    onError: (error) => {
      console.error("Failed to save session:", error);
    },
  });
};
