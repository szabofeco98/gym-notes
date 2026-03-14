import { useTheme } from "@/src/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: string;
  iconSize?: number;
}

/**
 * Button Component - Reusable button with multiple variants
 *
 * @component
 * @example
 * <Button
 *   title="Press me"
 *   onPress={() => console.log('pressed')}
 *   variant="primary"
 * />
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  size = "md",
  style,
  textStyle,
  icon,
  iconSize = 20,
}) => {
  const { colors } = useTheme();

  const variantStyle =
    variant === "primary"
      ? { backgroundColor: colors.primary }
      : variant === "secondary"
        ? { backgroundColor: colors.secondary }
        : { backgroundColor: colors.danger };

  const sizeStyle =
    size === "sm" ? styles.sm : size === "lg" ? styles.lg : styles.md;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        sizeStyle,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon ? (
        <View style={styles.row}>
          <MaterialCommunityIcons
            name={icon as any}
            size={iconSize}
            color="#FFFFFF"
            style={styles.iconLeft}
          />
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  lg: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconLeft: {
    marginRight: 8,
  },
});
