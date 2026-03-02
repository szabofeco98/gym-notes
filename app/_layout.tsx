import { queryClient } from "@/src/config/queryClient";
import { ThemeProvider } from "@/src/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Stack />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
