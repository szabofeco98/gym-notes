import { Button, Container, Input, SafeAreaView } from "@/components";
import { useCreateExercise } from "@/src/hooks/useCreateExercise";
import { useTheme } from "@/src/theme";
import {
  createExerciseSchema,
  MUSCLE_GROUPS,
  type CreateExerciseFields,
} from "@/src/utils/schemas";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppwriteException } from "react-native-appwrite";

export default function CreateExerciseScreen() {
  const { colors } = useTheme();
  const { mutateAsync: createExercise, isPending } = useCreateExercise();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateExerciseFields>({
    resolver: zodResolver(createExerciseSchema),
  });

  const onSubmit = async (data: CreateExerciseFields) => {
    try {
      await createExercise({
        name: data.name,
        muscleGroup: data.muscleGroup,
        description: data.description,
      });
      router.back();
    } catch (e) {
      setError("root", {
        message:
          e instanceof AppwriteException
            ? e.message
            : "Failed to create exercise.",
      });
    }
  };

  const loading = isSubmitting || isPending;

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            New Exercise
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView keyboardShouldPersistTaps="handled">
          <Container padding="lg">
            {/* Name */}
            <Controller
              control={control}
              name="name"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  label="Exercise Name"
                  placeholder="e.g. Barbell Bench Press"
                  value={value ?? ""}
                  onChangeText={onChange}
                  error={error?.message}
                />
              )}
            />

            {/* Muscle group picker */}
            <Controller
              control={control}
              name="muscleGroup"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <View style={styles.fieldGroup}>
                  <Text style={[styles.label, { color: colors.textPrimary }]}>
                    Muscle Group
                  </Text>
                  <View style={styles.chips}>
                    {MUSCLE_GROUPS.map((mg) => {
                      const selected = value === mg;
                      return (
                        <TouchableOpacity
                          key={mg}
                          onPress={() => onChange(mg)}
                          style={[
                            styles.chip,
                            {
                              backgroundColor: selected
                                ? colors.primary
                                : colors.surface,
                              borderColor: selected
                                ? colors.primary
                                : colors.border,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.chipText,
                              {
                                color: selected ? "#fff" : colors.textSecondary,
                                fontWeight: selected ? "600" : "400",
                              },
                            ]}
                          >
                            {mg}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  {!!error && (
                    <Text style={[styles.error, { color: colors.danger }]}>
                      {error.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Description */}
            <Controller
              control={control}
              name="description"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  label="Description (optional)"
                  placeholder="e.g. Compound push movement"
                  value={value ?? ""}
                  onChangeText={onChange}
                  error={error?.message}
                />
              )}
            />

            {errors.root ? (
              <Text style={[styles.error, { color: colors.danger }]}>
                {errors.root.message}
              </Text>
            ) : null}

            <View style={{ height: 20 }} />
            <Button
              title={loading ? "Saving…" : "Create Exercise"}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              size="lg"
            />
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
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
  fieldGroup: { gap: 6, marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "500" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: { fontSize: 13 },
  error: { fontSize: 12, marginTop: 2 },
});
