import { Button, Loader, SafeAreaView } from "@/components";
import { DEFAULT_EXERCISES } from "@/src/constants/exercises";
import { useDeleteDayPlan } from "@/src/hooks/useDeleteDayPlan";
import { useGetDayPlanExercises } from "@/src/hooks/useGetDayPlanExercises";
import { useGetDayPlans } from "@/src/hooks/useGetDayPlans";
import { useGetExercises } from "@/src/hooks/useGetExercises";
import { useSessionStore } from "@/src/stores/sessionStore";
import { useTheme } from "@/src/theme";
import type { DayPlan, DayPlanExercise, Exercise } from "@/src/types";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
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

// Per-day row — fetches its own exercise list so count is live
function DayRow({
  dayPlan,
  plan,
  appwriteExercises,
  onDelete,
  onStart,
}: {
  dayPlan: DayPlan;
  plan: string;
  appwriteExercises: Exercise[];
  onDelete: (dp: DayPlan) => void;
  onStart: (dp: DayPlan, dpes: DayPlanExercise[]) => void;
}) {
  const { colors } = useTheme();
  const { data: dpes = [] } = useGetDayPlanExercises(dayPlan.$id);

  return (
    <View
      style={[
        styles.dayCard,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <TouchableOpacity
        style={styles.dayCardTop}
        onPress={() =>
          router.push({
            pathname: "/(modal)/day-detail",
            params: {
              dayPlan: dayPlan.$id,
              dayPlanName: dayPlan.name,
              plan,
            },
          })
        }
      >
        <View style={styles.dayInfo}>
          <Text style={[styles.dayName, { color: colors.textPrimary }]}>
            {dayPlan.name}
          </Text>
          <Text style={[styles.exCount, { color: colors.textSecondary }]}>
            {dpes.length === 0
              ? "No exercises"
              : `${dpes.length} exercise${dpes.length !== 1 ? "s" : ""}`}
          </Text>
        </View>
        <View style={styles.dayActions}>
          <TouchableOpacity
            onPress={() => onDelete(dayPlan)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="trash-outline" size={18} color={colors.danger} />
          </TouchableOpacity>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      {dpes.length > 0 && (
        <View style={[styles.startRow, { borderTopColor: colors.border }]}>
          <Button
            title={`Start ${dayPlan.name}`}
            onPress={() => onStart(dayPlan, dpes)}
            size="sm"
          />
        </View>
      )}
    </View>
  );
}

export default function PlanDetailScreen() {
  const { colors } = useTheme();
  const { id, name, description } = useLocalSearchParams<{
    id: string;
    name: string;
    description: string;
  }>();

  const startSession = useSessionStore((s) => s.startSession);
  const { data: dayPlans = [], isLoading } = useGetDayPlans(id);
  const { data: appwriteExercises = [] } = useGetExercises();
  const { mutate: deleteDayPlan } = useDeleteDayPlan();

  const handleDeleteDay = (dayPlan: DayPlan) => {
    Alert.alert(
      "Delete Day",
      `Delete "${dayPlan.name}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteDayPlan(dayPlan.$id),
        },
      ],
    );
  };

  const handleStartWithDay = (dayPlan: DayPlan, dpes: DayPlanExercise[]) => {
    const exercises: Exercise[] = dpes
      .map((dpe) => resolveExercise(dpe.exercise, appwriteExercises))
      .filter((e): e is Exercise => e !== null);
    startSession(dayPlan.name, exercises, dayPlan.$id, dpes);
    router.dismiss();
    router.push("/(tabs)/today");
  };

  const handleFreeWorkout = () => {
    startSession(name, []);
    router.dismiss();
    router.push("/(tabs)/today");
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          {name}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={dayPlans}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            {!!description && (
              <Text
                style={[styles.description, { color: colors.textSecondary }]}
              >
                {description}
              </Text>
            )}
            <View style={styles.sectionHeader}>
              <Text
                style={[styles.sectionTitle, { color: colors.textSecondary }]}
              >
                DAYS
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(modal)/create-day",
                    params: { plan: id, order: String(dayPlans.length) },
                  })
                }
                style={[styles.addDayBtn, { borderColor: colors.primary }]}
              >
                <Ionicons name="add" size={16} color={colors.primary} />
                <Text style={[styles.addDayText, { color: colors.primary }]}>
                  Add Day
                </Text>
              </TouchableOpacity>
            </View>
            {isLoading && <Loader />}
            {!isLoading && dayPlans.length === 0 && (
              <Text style={[styles.emptyDays, { color: colors.textSecondary }]}>
                {'No days yet. Tap "Add Day" to get started.'}
              </Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <DayRow
            dayPlan={item}
            plan={id}
            appwriteExercises={appwriteExercises}
            onDelete={handleDeleteDay}
            onStart={handleStartWithDay}
          />
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />
            <Text style={[styles.orLabel, { color: colors.textSecondary }]}>
              or
            </Text>
            <Button
              title="Free Workout"
              onPress={handleFreeWorkout}
              variant="secondary"
            />
          </View>
        }
      />
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
  headerTitle: { fontSize: 17, fontWeight: "600" },
  content: { padding: 16, gap: 10 },
  listHeader: { gap: 12, marginBottom: 4 },
  description: { fontSize: 14, lineHeight: 22 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: 12, fontWeight: "700", letterSpacing: 0.6 },
  addDayBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  addDayText: { fontSize: 13, fontWeight: "600" },
  emptyDays: { fontSize: 14, textAlign: "center", paddingVertical: 12 },
  dayCard: { borderRadius: 12, borderWidth: 1, overflow: "hidden" },
  dayCardTop: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dayInfo: { flex: 1 },
  dayName: { fontSize: 15, fontWeight: "600" },
  exCount: { fontSize: 12, marginTop: 2 },
  dayActions: { flexDirection: "row", alignItems: "center", gap: 14 },
  startRow: {
    paddingHorizontal: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  footer: { marginTop: 16, gap: 12, alignItems: "stretch" },
  divider: { height: 1 },
  orLabel: { fontSize: 13, textAlign: "center" },
});
