import { useTheme } from "@/src/theme";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
  style?: StyleProp<ViewStyle>;
}

/**
 * Card Component - Container component for grouping content
 *
 * @component
 * @example
 * <Card variant="elevated">
 *   <Text>Card content</Text>
 * </Card>
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  style,
}) => {
  const { colors, resolvedTheme } = useTheme();

  const variantStyle =
    variant === "elevated"
      ? [styles.elevated, { backgroundColor: colors.surface }]
      : variant === "outlined"
        ? [
            styles.outlined,
            {
              backgroundColor: "transparent",
              borderColor: colors.borderStrong,
            },
          ]
        : [
            styles.default,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ];

  const elevatedShadowStyle =
    resolvedTheme === "dark"
      ? { shadowColor: "#000000", shadowOpacity: 0.25 }
      : { shadowColor: "#000000", shadowOpacity: 0.12 };

  return (
    <View
      style={[
        styles.base,
        variantStyle,
        variant === "elevated" && elevatedShadowStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    padding: 16,
  },
  default: {
    borderWidth: 1,
  },
  elevated: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  outlined: {
    borderWidth: 2,
  },
});
