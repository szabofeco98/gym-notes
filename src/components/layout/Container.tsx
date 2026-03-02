import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface ContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: "none" | "sm" | "md" | "lg";
}

/**
 * Container Component - Main content wrapper with consistent padding
 *
 * @component
 * @example
 * <Container padding="md">
 *   <Text>Padded content</Text>
 * </Container>
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  padding = "md",
}) => {
  const paddingStyle =
    padding === "none"
      ? null
      : padding === "sm"
        ? styles.paddingSm
        : padding === "lg"
          ? styles.paddingLg
          : styles.paddingMd;

  return <View style={[styles.base, paddingStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  paddingSm: {
    padding: 8,
  },
  paddingMd: {
    padding: 12,
  },
  paddingLg: {
    padding: 16,
  },
});
