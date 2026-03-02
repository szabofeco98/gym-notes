import { useTheme } from "@/src/theme";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  editable?: boolean;
  label?: string;
  error?: string;
  disabled?: boolean;
}

/**
 * Input Component - Text input with optional label and error display
 *
 * @component
 * @example
 * <Input
 *   label="Email"
 *   placeholder="Enter email"
 *   value={email}
 *   onChangeText={setEmail}
 * />
 */
export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  editable = true,
  label,
  error,
  disabled = false,
}) => {
  const { colors } = useTheme();
  const borderStyle = error ? styles.inputError : styles.inputDefault;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.textPrimary }]}>
          {label}
        </Text>
      )}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={editable && !disabled}
        placeholderTextColor={colors.textSecondary}
        style={[
          styles.input,
          borderStyle,
          { color: colors.textPrimary },
          error
            ? { borderColor: colors.danger }
            : { borderColor: colors.borderStrong },
          disabled ? styles.disabledInput : styles.enabledInput,
          disabled
            ? { backgroundColor: colors.surfaceMuted }
            : { backgroundColor: colors.surface },
        ]}
      />
      {error && (
        <Text style={[styles.errorText, { color: colors.danger }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: "#111827",
  },
  inputDefault: {},
  inputError: {},
  enabledInput: {
    backgroundColor: "#FFFFFF",
  },
  disabledInput: {
    opacity: 0.5,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
});
