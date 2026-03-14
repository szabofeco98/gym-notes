import { dayPlanService } from "@/src/services/dayPlanService";
import { queryKeys } from "@/src/services/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetDayPlans = (plan: string) =>
  useQuery({
    queryKey: queryKeys.dayPlans(plan),
    queryFn: () => dayPlanService.getDayPlans(plan),
    enabled: !!plan,
  });
