import { useTheme } from "@/src/theme";
import React, { useState } from "react";
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

  const [weight, setWeight] = useState(previousSet?.weight.toString() || "");
  const [reps, setReps] = useState(previousSet?.reps.toString() || "");
  const [rpe, setRpe] = useState(previousSet?.rpe?.toString() || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!weight) newErrors.weight = "Weight is required";
    if (!reps) newErrors.reps = "Reps are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      setNumber,
      weight: parseFloat(weight),
      reps: parseInt(reps, 10),
      rpe: rpe ? parseInt(rpe, 10) : undefined,
    });

    setWeight("");
    setReps("");
    setRpe("");
    setErrors({});
  };

  return (
    <Card variant="outlined" style={styles.cardSpacing}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        {exerciseName} - Set {setNumber}
      </Text>

      <Input
        label="Weight (lbs)"
        placeholder="Enter weight"
        value={weight}
        onChangeText={(text) => {
          setWeight(text);
          if (errors.weight) {
            const newErrors = { ...errors };
            delete newErrors.weight;
            setErrors(newErrors);
          }
        }}
        error={errors.weight}
      />

      <Input
        label="Reps"
        placeholder="Enter reps"
        value={reps}
        onChangeText={(text) => {
          setReps(text);
          if (errors.reps) {
            const newErrors = { ...errors };
            delete newErrors.reps;
            setErrors(newErrors);
          }
        }}
        error={errors.reps}
      />

      <Input
        label="RPE (Optional)"
        placeholder="Rate of perceived exertion (1-10)"
        value={rpe}
        onChangeText={setRpe}
      />

      <View style={styles.actionsRow}>
        <Button
          title="Cancel"
          onPress={() => {
            setWeight("");
            setReps("");
            setRpe("");
            setErrors({});
          }}
          variant="secondary"
          size="sm"
        />
        <Button
          title="Save Set"
          onPress={handleSubmit}
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
