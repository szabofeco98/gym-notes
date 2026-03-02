import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

/**
 * Icon Component - Wrapper for Expo Vector Icons
 *
 * @component
 * @example
 * <Icon name="heart" size={24} color="#EF4444" />
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "#6B7280",
}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={name as any} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
