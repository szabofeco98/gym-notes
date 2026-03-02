import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

interface SafeAreaViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * SafeAreaView Component - Wrapper for safe area
 *
 * @component
 * @example
 * <SafeAreaView>
 *   <Text>Content safe from notches</Text>
 * </SafeAreaView>
 */
export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  style,
}) => {
  return (
    <RNSafeAreaView style={[{ flex: 1 }, style]}>{children}</RNSafeAreaView>
  );
};
