import { useTheme } from "@/src/theme";
import { workoutSetSchema, type WorkoutSetFields } from "@/src/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";

interface WorkoutSet {
  setNumber: number;
  weight: number;
  reps: number;
  rpe?: number;
}

interface WorkoutSetFormProps {
  exerciseName: string;
  onSubmit: (data: WorkoutSet) => void;
  setNumber: number;
  previousSet?: WorkoutSet;
}

/**
 * WorkoutSetForm Component - Form to log exercise sets during workout
 *
 * @component
 * @example
 * <WorkoutSetForm
 *   exerciseName="Bench Press"
 *   setNumber={1}
 *   onSubmit={(data) => console.log(data)}
 * />
 */
export const WorkoutSetForm: React.FC<WorkoutSetFormProps> = ({
  exerciseName,
  onSubmit,
  setNumber,
  previousSet,
}) => {
  const { colors } = useTheme();

  const { control, handleSubmit, reset } = useForm<WorkoutSetFields>({
    resolver: zodResolver(workoutSetSchema),
    defaultValues: {
      weight: previousSet?.weight.toString() ?? "",
      reps: previousSet?.reps.toString() ?? "",
      rpe: previousSet?.rpe?.toString() ?? "",
    },
  });

  const handleFormSubmit = (data: WorkoutSetFields) => {
    onSubmit({
      setNumber,
      weight: parseFloat(data.weight),
      reps: parseInt(data.reps, 10),
      rpe: data.rpe ? parseInt(data.rpe, 10) : undefined,
    });
    reset({ weight: "", reps: "", rpe: "" });
  };

  return (
    <Card variant="outlined" style={styles.cardSpacing}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        {exerciseName} - Set {setNumber}
      </Text>

      <Controller
        control={control}
        name="weight"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            label="Weight (lbs)"
            placeholder="Enter weight"
            value={value}
            onChangeText={onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="reps"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            label="Reps"
            placeholder="Enter reps"
            value={value}
            onChangeText={onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="rpe"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            label="RPE (Optional)"
            placeholder="Rate of perceived exertion (1-10)"
            value={value ?? ""}
            onChangeText={onChange}
            error={error?.message}
          />
        )}
      />

      <View style={styles.actionsRow}>
        <Button
          title="Cancel"
          onPress={() => reset({ weight: "", reps: "", rpe: "" })}
          variant="secondary"
          size="sm"
        />
        <Button
          title="Save Set"
          onPress={handleSubmit(handleFormSubmit)}
          variant="primary"
          size="sm"
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardSpacing: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: "row",
    columnGap: 12,
    marginTop: 16,
  },
});
