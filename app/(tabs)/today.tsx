import { Button, SafeAreaView, WorkoutSetForm } from "@/components";
import { DEFAULT_EXERCISES } from "@/src/constants/exercises";
import { useGetPlans } from "@/src/hooks/useGetPlans";
import { useSaveSession } from "@/src/hooks/useSaveSession";
import { useAuthStore } from "@/src/stores/authStore";
import { useSessionStore } from "@/src/stores/sessionStore";
import { useTheme } from "@/src/theme";
import type { Exercise } from "@/src/types";
import { useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TodayScreen() {
  const { colors } = useTheme();
  const user = useAuthStore((s) => s.user);
  const { activeSession, startSession, addExercise, addSet, clearSession } =
    useSessionStore();
  const { mutateAsync: saveSession, isPending: isSaving } = useSaveSession();
  const { data: plans } = useGetPlans();

  const [planPickerVisible, setPlanPickerVisible] = useState(false);
  const [exercisePickerVisible, setExercisePickerVisible] = useState(false);
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);

  const alreadyAdded = new Set(activeSession?.exercises.map((e) => e.id));

  const handleStartWorkout = (name: string, planId?: string) => {
    startSession(name, [], planId);
    setPlanPickerVisible(false);
  };

  const handleAddExercise = (exercise: Exercise) => {
    addExercise(exercise);
    setExercisePickerVisible(false);
  };

  const handleLogSet = (
    exercise: Exercise,
    setData: { setNumber: number; weight: number; reps: number; rpe?: number },
  ) => {
    addSet({
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      setNumber: setData.setNumber,
      weight: setData.weight,
      reps: setData.reps,
      rpe: setData.rpe,
    });
    setActiveExerciseId(null);
  };

  const handleFinishWorkout = () => {
    if (!activeSession || !user) return;
    Alert.alert("Finish Workout", `Save ${activeSession.sets.length} sets?`, [
      { text: "Keep Going", style: "cancel" },
      {
        text: "Finish",
        onPress: async () => {
          try {
            await saveSession({
              userId: user.$id,
              planId: activeSession.planId,
              name: activeSession.planName,
              startedAt: activeSession.startedAt,
              sets: activeSession.sets,
            });
            clearSession();
          } catch {
            Alert.alert("Error", "Failed to save workout. Please try again.");
          }
        },
      },
    ]);
  };

  // ── No active session ──────────────────────────────────────────────────────
  if (!activeSession) {
    return (
      <SafeAreaView
        style={[styles.flex, { backgroundColor: colors.background }]}
      >
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyIcon}>🏋️</Text>
          <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
            Ready to train?
          </Text>
          <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
            Start a workout to begin logging your sets.
          </Text>
          <Button
            title="Start Workout"
            onPress={() => setPlanPickerVisible(true)}
            size="lg"
          />
        </View>

        {/* Plan picker */}
        <Modal
          visible={planPickerVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setPlanPickerVisible(false)}
        >
          <View style={styles.backdrop}>
            <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
              <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>
                Start Workout
              </Text>
              <Button
                title="Free Workout"
                onPress={() => handleStartWorkout("Free Workout")}
                variant="secondary"
              />
              {!!plans?.length && (
                <>
                  <Text
                    style={[styles.sheetSub, { color: colors.textSecondary }]}
                  >
                    Or choose a plan:
                  </Text>
                  {plans.map((plan) => (
                    <Button
                      key={plan.$id}
                      title={plan.name}
                      onPress={() => handleStartWorkout(plan.name, plan.$id)}
                      variant="secondary"
                    />
                  ))}
                </>
              )}
              <Button
                title="Cancel"
                onPress={() => setPlanPickerVisible(false)}
                variant="danger"
                style={{ marginTop: 8 }}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  // ── Active session ─────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Session header */}
        <View
          style={[
            styles.sessionHeader,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.sessionName, { color: colors.textPrimary }]}>
            {activeSession.planName}
          </Text>
          <Text style={[styles.setCount, { color: colors.textSecondary }]}>
            {activeSession.sets.length} sets logged
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.sessionBody}>
          {activeSession.exercises.length === 0 && (
            <Text style={[styles.noExercises, { color: colors.textSecondary }]}>
              Add exercises below to start logging sets.
            </Text>
          )}

          {activeSession.exercises.map((exercise) => {
            const exerciseSets = activeSession.sets.filter(
              (s) => s.exerciseId === exercise.id,
            );
            const isOpen = activeExerciseId === exercise.id;

            return (
              <View
                key={exercise.id}
                style={[
                  styles.exerciseBlock,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.exerciseRow}>
                  <View>
                    <Text
                      style={[
                        styles.exerciseName,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {exercise.name}
                    </Text>
                    <Text
                      style={[styles.muscleGroup, { color: colors.secondary }]}
                    >
                      {exercise.muscleGroup}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setActiveExerciseId(isOpen ? null : exercise.id)
                    }
                  >
                    <Text style={[styles.logSetBtn, { color: colors.primary }]}>
                      {isOpen ? "Cancel" : "+ Log Set"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {exerciseSets.length > 0 && (
                  <View
                    style={[styles.setList, { borderTopColor: colors.border }]}
                  >
                    {exerciseSets.map((s) => (
                      <Text
                        key={s.setNumber}
                        style={[styles.setRow, { color: colors.textSecondary }]}
                      >
                        Set {s.setNumber}: {s.weight} kg × {s.reps} reps
                        {s.rpe != null ? `  ·  RPE ${s.rpe}` : ""}
                      </Text>
                    ))}
                  </View>
                )}

                {isOpen && (
                  <WorkoutSetForm
                    exerciseName={exercise.name}
                    setNumber={exerciseSets.length + 1}
                    onSubmit={(data) => handleLogSet(exercise, data)}
                  />
                )}
              </View>
            );
          })}

          <Button
            title="+ Add Exercise"
            onPress={() => setExercisePickerVisible(true)}
            variant="secondary"
            style={{ marginTop: 8 }}
          />
          <Button
            title={isSaving ? "Saving…" : "Finish Workout"}
            onPress={handleFinishWorkout}
            variant="danger"
            disabled={isSaving || activeSession.sets.length === 0}
            style={{ marginTop: 12, marginBottom: 40 }}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Exercise picker */}
      <Modal
        visible={exercisePickerVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setExercisePickerVisible(false)}
      >
        <View style={styles.backdrop}>
          <View
            style={[
              styles.sheet,
              styles.sheetTall,
              { backgroundColor: colors.surface },
            ]}
          >
            <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>
              Add Exercise
            </Text>
            <FlatList
              data={DEFAULT_EXERCISES.filter((e) => !alreadyAdded.has(e.id))}
              keyExtractor={(item) => item.id}
              style={styles.pickerList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleAddExercise(item)}
                  style={[
                    styles.pickerItem,
                    { borderBottomColor: colors.border },
                  ]}
                >
                  <Text
                    style={[styles.pickerName, { color: colors.textPrimary }]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[styles.pickerMuscle, { color: colors.secondary }]}
                  >
                    {item.muscleGroup}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <Button
              title="Cancel"
              onPress={() => setExercisePickerVisible(false)}
              variant="secondary"
              style={{ marginTop: 8 }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  // Empty state
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 12,
  },
  emptyIcon: { fontSize: 56 },
  emptyTitle: { fontSize: 22, fontWeight: "700" },
  emptySub: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 8,
  },
  // Session header
  sessionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  sessionName: { fontSize: 18, fontWeight: "700" },
  setCount: { fontSize: 13, marginTop: 2 },
  sessionBody: { padding: 16, gap: 12 },
  noExercises: { textAlign: "center", marginVertical: 24, fontSize: 14 },
  // Exercise block
  exerciseBlock: { borderRadius: 12, borderWidth: 1, padding: 14 },
  exerciseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exerciseName: { fontSize: 15, fontWeight: "600" },
  muscleGroup: { fontSize: 12, marginTop: 2 },
  logSetBtn: { fontSize: 13, fontWeight: "600" },
  setList: { borderTopWidth: 1, marginTop: 10, paddingTop: 8, gap: 4 },
  setRow: { fontSize: 13 },
  // Sheet / modal
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 10,
  },
  sheetTall: { maxHeight: "72%" },
  sheetTitle: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  sheetSub: { fontSize: 13, marginTop: 4 },
  pickerList: { flexGrow: 0 },
  pickerItem: { paddingVertical: 12, borderBottomWidth: 1 },
  pickerName: { fontSize: 15, fontWeight: "500" },
  pickerMuscle: { fontSize: 12, marginTop: 2 },
});
