export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
  secondary: string;
  danger: string;
  warning: string;
  success: string;
  white: string;
  overlay: string;
}

export const lightColors: ThemeColors = {
  background: "#F9FAFB",
  surface: "#FFFFFF",
  surfaceMuted: "#F3F4F6",
  border: "#E5E7EB",
  borderStrong: "#D1D5DB",
  textPrimary: "#111827",
  textSecondary: "#4B5563",
  primary: "#3B82F6",
  secondary: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
  success: "#10B981",
  white: "#FFFFFF",
  overlay: "rgba(0,0,0,0.5)",
};

export const darkColors: ThemeColors = {
  background: "#0F172A",
  surface: "#111827",
  surfaceMuted: "#1F2937",
  border: "#374151",
  borderStrong: "#4B5563",
  textPrimary: "#F9FAFB",
  textSecondary: "#D1D5DB",
  primary: "#60A5FA",
  secondary: "#34D399",
  danger: "#F87171",
  warning: "#FBBF24",
  success: "#34D399",
  white: "#FFFFFF",
  overlay: "rgba(0,0,0,0.6)",
};
