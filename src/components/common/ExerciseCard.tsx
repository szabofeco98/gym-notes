import { useTheme } from "@/src/theme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "../ui/Card";

interface ExerciseCardProps {
  name: string;
  muscleGroup: string;
  onPress?: () => void;
  description?: string;
}

/**
 * ExerciseCard Component - Display exercise information in a card
 *
 * @component
 * @example
 * <ExerciseCard
 *   name="Bench Press"
 *   muscleGroup="Chest"
 *   description="Primary: Chest, Secondary: Triceps"
 *   onPress={() => console.log('pressed')}
 * />
 */
export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  name,
  muscleGroup,
  onPress,
  description,
}) => {
  const { colors } = useTheme();

  const content = (
    <>
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {name}
          </Text>
          <Text style={[styles.muscleGroup, { color: colors.secondary }]}>
            {muscleGroup}
          </Text>
        </View>
      </View>
      {description && (
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {description}
        </Text>
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.cardSpacing}>
        <Card variant="elevated">{content}</Card>
      </Pressable>
    );
  }

  return (
    <Card variant="elevated" style={styles.cardSpacing}>
      {content}
    </Card>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  muscleGroup: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  description: {
    fontSize: 14,
  },
  cardSpacing: {
    marginBottom: 12,
  },
});
