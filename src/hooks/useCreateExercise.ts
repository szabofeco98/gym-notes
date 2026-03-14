import { exerciseService } from "@/src/services/exerciseService";
import { queryKeys } from "@/src/services/queryKeys";
import type { MuscleGroup } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      muscleGroup: MuscleGroup;
      description?: string;
    }) => exerciseService.createExercise(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.exercises() });
    },
  });
};
