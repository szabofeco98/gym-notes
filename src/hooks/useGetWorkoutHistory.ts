import { queryKeys } from "@/src/services/queryKeys";
import { workoutService } from "@/src/services/workoutService";
import { useAuthStore } from "@/src/stores/authStore";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkoutHistory = () => {
  const user = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: queryKeys.workoutSessions(),
    queryFn: () => workoutService.getSessions(user!.$id),
    enabled: !!user,
  });
};
