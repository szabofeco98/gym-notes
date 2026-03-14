import { queryClient } from "@/src/config/queryClient";
import { authService } from "@/src/services/authService";
import { useAuthStore } from "@/src/stores/authStore";
import { ThemeProvider } from "@/src/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AppwriteException } from "react-native-appwrite";

function AuthGate() {
  const { user, isLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)/plans");
    }
  }, [user, isLoading, segments, router]);

  return null;
}

export default function RootLayout() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        console.log("[Appwrite] Current user:", user);
        setUser(user);
      })
      .catch((e) => {
        if (!(e instanceof AppwriteException && e.code === 401)) {
          console.error("[Appwrite] Session check failed:", e);
        }
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [setUser, setLoading]);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthGate />
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
