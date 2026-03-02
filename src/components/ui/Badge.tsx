import { useTheme } from "@/src/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md";
}

/**
 * Badge Component - Tag or label component with color variants
 *
 * @component
 * @example
 * <Badge label="New" variant="success" />
 */
export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "primary",
  size = "sm",
}) => {
  const { colors } = useTheme();

  const variantStyle =
    variant === "primary"
      ? { backgroundColor: colors.primary }
      : variant === "secondary"
        ? { backgroundColor: colors.secondary }
        : variant === "success"
          ? { backgroundColor: colors.success }
          : variant === "warning"
            ? { backgroundColor: colors.warning }
            : { backgroundColor: colors.danger };

  const sizeStyle = size === "sm" ? styles.sm : styles.md;
  const textSizeStyle = size === "sm" ? styles.smText : styles.mdText;

  return (
    <View style={[styles.base, variantStyle, sizeStyle]}>
      <Text style={[styles.text, textSizeStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start",
    borderRadius: 999,
  },
  sm: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  md: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "600",
    textAlign: "center",
  },
  smText: {
    fontSize: 12,
  },
  mdText: {
    fontSize: 14,
  },
});
