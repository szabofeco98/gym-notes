import { dayPlanService } from "@/src/services/dayPlanService";
import { queryKeys } from "@/src/services/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetDayPlanExercises = (dayPlan: string) =>
  useQuery({
    queryKey: queryKeys.dayPlanExercises(dayPlan),
    queryFn: () => dayPlanService.getDayPlanExercises(dayPlan),
    enabled: !!dayPlan,
  });
