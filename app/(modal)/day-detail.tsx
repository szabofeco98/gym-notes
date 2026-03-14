import { Button, Loader, SafeAreaView } from "@/components";
import { DEFAULT_EXERCISES } from "@/src/constants/exercises";
import { useDeleteDayPlanExercise } from "@/src/hooks/useDeleteDayPlanExercise";
import { useGetDayPlanExercises } from "@/src/hooks/useGetDayPlanExercises";
import { useGetExercises } from "@/src/hooks/useGetExercises";
import { useTheme } from "@/src/theme";
import type { Exercise } from "@/src/types";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function resolveExercise(
  exercise: string,
  appwriteExercises: Exercise[],
): Exercise | null {
  return (
    DEFAULT_EXERCISES.find((e) => e.id === exercise) ??
    appwriteExercises.find((e) => e.$id === exercise || e.id === exercise) ??
    null
  );
}

export default function DayDetailScreen() {
  const { colors } = useTheme();
  const { dayPlan, dayPlanName } = useLocalSearchParams<{
    dayPlan: string;
    dayPlanName: string;
  }>();

  const { data: dayPlanExercises = [], isLoading } =
    useGetDayPlanExercises(dayPlan);
  const { data: appwriteExercises = [] } = useGetExercises();
  const { mutate: removeExercise } = useDeleteDayPlanExercise();

  const resolvedExercises = useMemo(
    () =>
      dayPlanExercises.map((dpe) => ({
        dpe,
        exercise: resolveExercise(dpe.exercise, appwriteExercises),
      })),
    [dayPlanExercises, appwriteExercises],
  );

  const handleRemove = (dayPlanExercise: string, name: string) => {
    Alert.alert("Remove Exercise", `Remove "${name}" from this day?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => removeExercise(dayPlanExercise),
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          {dayPlanName}
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(modal)/exercise-picker",
              params: { dayPlan, dayPlanName },
            })
          }
        >
          <Ionicons name="add" size={26} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Loader />
      ) : resolvedExercises.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No exercises yet.{"\n"}Tap the + button to add exercises to this
            day.
          </Text>
          <Button
            title="Add Exercises"
            onPress={() =>
              router.push({
                pathname: "/(modal)/exercise-picker",
                params: { dayPlan, dayPlanName },
              })
            }
            variant="secondary"
          />
        </View>
      ) : (
        <FlatList
          data={resolvedExercises}
          keyExtractor={(item) => item.dpe.$id}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => {
            const name = item.exercise?.name ?? `Exercise ${index + 1}`;
            const muscle = item.exercise?.muscleGroup ?? "";
            return (
              <View
                style={[
                  styles.row,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.rowLeft}>
                  <Text
                    style={[styles.orderBadge, { color: colors.textSecondary }]}
                  >
                    {index + 1}
                  </Text>
                  <View>
                    <Text
                      style={[styles.exName, { color: colors.textPrimary }]}
                    >
                      {name}
                    </Text>
                    <View style={styles.metaRow}>
                      {!!muscle && (
                        <Text
                          style={[styles.exMuscle, { color: colors.secondary }]}
                        >
                          {muscle}
                        </Text>
                      )}
                      {!!item.dpe.targetSets && (
                        <Text
                          style={[
                            styles.targetSets,
                            { color: colors.textSecondary },
                          ]}
                        >
                          · {item.dpe.targetSets} sets
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => handleRemove(item.dpe.$id, name)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color={colors.danger}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 16,
  },
  emptyText: { textAlign: "center", fontSize: 14, lineHeight: 22 },
  list: { padding: 16, gap: 10 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  rowLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 12 },
  orderBadge: {
    fontSize: 13,
    fontWeight: "600",
    width: 18,
    textAlign: "center",
  },
  exName: { fontSize: 15, fontWeight: "500" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  exMuscle: { fontSize: 12 },
  targetSets: { fontSize: 12 },
});
