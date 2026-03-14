import { planService } from "@/src/services/planService";
import { queryKeys } from "@/src/services/queryKeys";
import { useAuthStore } from "@/src/stores/authStore";
import { useQuery } from "@tanstack/react-query";

export const useGetPlans = () => {
  const user = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: queryKeys.plans(),
    queryFn: () => planService.getPlans(user!.$id),
    enabled: !!user,
  });
};
