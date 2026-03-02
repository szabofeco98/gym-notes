import { useTheme } from "@/src/theme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "../ui/Card";

interface PlanCardProps {
  name: string;
  dayCount?: number;
  onPress?: () => void;
  description?: string;
}

/**
 * PlanCard Component - Display workout plan information in a card
 *
 * @component
 * @example
 * <PlanCard
 *   name="Push/Pull/Legs"
 *   dayCount={6}
 *   description="3 day split"
 *   onPress={() => console.log('pressed')}
 * />
 */
export const PlanCard: React.FC<PlanCardProps> = ({
  name,
  dayCount,
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
          {dayCount && (
            <Text style={[styles.dayCount, { color: colors.primary }]}>
              {dayCount} days
            </Text>
          )}
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
  dayCount: {
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
