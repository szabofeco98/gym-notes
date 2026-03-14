import { Loader } from "@/components";
import { DEFAULT_EXERCISES } from "@/src/constants/exercises";
import { useCreateDayPlanExercise } from "@/src/hooks/useCreateDayPlanExercise";
import { useGetDayPlanExercises } from "@/src/hooks/useGetDayPlanExercises";
import { useGetExercises } from "@/src/hooks/useGetExercises";
import { useTheme } from "@/src/theme";
import type { Exercise } from "@/src/types";
import { MUSCLE_GROUPS } from "@/src/utils/schemas";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ExercisePickerScreen() {
  const { colors } = useTheme();
  const { dayPlan, dayPlanName } = useLocalSearchParams<{
    dayPlan: string;
    dayPlanName: string;
  }>();

  const [muscleFilter, setMuscleFilter] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);

  const { data: dayPlanExercises = [] } = useGetDayPlanExercises(dayPlan);
  const { data: appwriteExercises = [], isLoading } = useGetExercises();
  const { mutateAsync: addExercise } = useCreateDayPlanExercise();

  // Merge DEFAULT_EXERCISES + Appwrite exercises, deduplicate by name (case-insensitive)
  const allExercises = useMemo<Exercise[]>(() => {
    const seen = new Set<string>();
    const merged: Exercise[] = [];
    for (const ex of DEFAULT_EXERCISES) {
      seen.add(ex.name.toLowerCase());
      merged.push(ex);
    }
    for (const ex of appwriteExercises) {
      if (!seen.has(ex.name.toLowerCase())) {
        seen.add(ex.name.toLowerCase());
        merged.push(ex);
      }
    }
    return merged;
  }, [appwriteExercises]);

  // Build set of already-added exercise IDs
  const addedIds = useMemo(
    () => new Set(dayPlanExercises.map((dpe) => dpe.exercise)),
    [dayPlanExercises],
  );

  const filtered = muscleFilter
    ? allExercises.filter((e) => e.muscleGroup === muscleFilter)
    : allExercises;

  const handleAdd = async (exercise: Exercise) => {
    if (addingId) return;
    setAddingId(exercise.id);
    try {
      await addExercise({
        dayPlan,
        exercise: exercise.id,
        orderIndex: dayPlanExercises.length,
      });
    } finally {
      setAddingId(null);
    }
  };

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          {dayPlanName}
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(modal)/create-exercise")}
        >
          <Ionicons name="add" size={26} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Muscle group filter chips */}
      <View style={[styles.chipBar, { borderBottomColor: colors.border }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipScroll}
        >
          <TouchableOpacity
            onPress={() => setMuscleFilter(null)}
            style={[
              styles.chip,
              {
                backgroundColor: !muscleFilter
                  ? colors.primary
                  : colors.surface,
                borderColor: !muscleFilter ? colors.primary : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                { color: !muscleFilter ? "#fff" : colors.textSecondary },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {MUSCLE_GROUPS.map((mg) => {
            const active = muscleFilter === mg;
            return (
              <TouchableOpacity
                key={mg}
                onPress={() => setMuscleFilter(active ? null : mg)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: active ? colors.primary : colors.surface,
                    borderColor: active ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: active ? "#fff" : colors.textSecondary },
                  ]}
                >
                  {mg}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const added = addedIds.has(item.id);
            const adding = addingId === item.id;
            return (
              <TouchableOpacity
                onPress={() => !added && handleAdd(item)}
                disabled={added || !!addingId}
                style={[
                  styles.row,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    opacity: added ? 0.55 : 1,
                  },
                ]}
              >
                <View style={styles.rowInfo}>
                  <Text style={[styles.exName, { color: colors.textPrimary }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.exMuscle, { color: colors.secondary }]}>
                    {item.muscleGroup}
                  </Text>
                </View>
                {added ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color={colors.primary}
                  />
                ) : adding ? (
                  <Text
                    style={[styles.addingText, { color: colors.textSecondary }]}
                  >
                    Adding…
                  </Text>
                ) : (
                  <Ionicons
                    name="add-circle-outline"
                    size={22}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
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
  chipBar: { borderBottomWidth: 1 },
  chipScroll: { paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: { fontSize: 13 },
  list: { padding: 16, gap: 10 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  rowInfo: { flex: 1 },
  exName: { fontSize: 15, fontWeight: "500" },
  exMuscle: { fontSize: 12, marginTop: 2 },
  addingText: { fontSize: 12 },
});
