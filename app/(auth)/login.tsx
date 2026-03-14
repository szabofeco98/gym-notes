import { Button, Container, Input } from "@/components";
import { authService } from "@/src/services/authService";
import { useAuthStore } from "@/src/stores/authStore";
import { useTheme } from "@/src/theme";
import { loginSchema, type LoginFields } from "@/src/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AppwriteException } from "react-native-appwrite";

export default function LoginScreen() {
  const { colors } = useTheme();
  const setUser = useAuthStore((s) => s.setUser);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFields) => {
    try {
      const user = await authService.login(data.email, data.password);
      setUser(user);
      router.replace("/");
    } catch (e) {
      setError("root", {
        message: e instanceof AppwriteException ? e.message : "Login failed.",
      });
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const user = await authService.loginWithGoogle();
      setUser(user);
      router.replace("/");
    } catch (e) {
      setError("root", {
        message:
          e instanceof AppwriteException ? e.message : "Google sign-in failed.",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const loading = isSubmitting || isGoogleLoading;

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Container padding="lg" style={styles.flex}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Welcome back
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Sign in to your GymNotes account
          </Text>

          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  label="Email"
                  placeholder="you@example.com"
                  value={value}
                  onChangeText={onChange}
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  label="Password"
                  placeholder="••••••••"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  error={error?.message}
                />
              )}
            />
            {errors.root ? (
              <Text style={[styles.error, { color: colors.danger }]}>
                {errors.root.message}
              </Text>
            ) : null}
            <Button
              title={isSubmitting ? "Signing in…" : "Sign In"}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              size="lg"
            />
            <Button
              title="Sign in with Google"
              onPress={handleGoogleLogin}
              disabled={loading}
              size="lg"
              variant="secondary"
              icon="google"
            />
          </View>

          <View style={styles.footer}>
            <Text style={{ color: colors.textSecondary }}>
              Don&apos;t have an account?{" "}
            </Text>
            <Text
              style={[styles.link, { color: colors.primary }]}
              onPress={() => router.push("/(auth)/register")}
            >
              Register
            </Text>
          </View>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { flex: 1, justifyContent: "center", gap: 8 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 4 },
  subtitle: { fontSize: 15, marginBottom: 24 },
  form: { gap: 12 },
  error: { fontSize: 13, marginTop: 2 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  link: { fontWeight: "600" },
});
