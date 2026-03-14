import { useTheme } from "@/src/theme";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface LoaderProps {
  size?: "small" | "large";
  color?: string;
}

/**
 * Loader Component - Loading indicator with customizable size and color
 *
 * @component
 * @example
 * <Loader size="large" color="#3B82F6" />
 */
export const Loader: React.FC<LoaderProps> = ({
  size = "large",
  color = "#3B82F6",
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
