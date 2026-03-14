import { exerciseService } from "@/src/services/exerciseService";
import { queryKeys } from "@/src/services/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetExercises = () =>
  useQuery({
    queryKey: queryKeys.exercises(),
    queryFn: () => exerciseService.getExercises(),
  });
