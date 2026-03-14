import { Button, Container, Input } from "@/components";
import { authService } from "@/src/services/authService";
import { useAuthStore } from "@/src/stores/authStore";
import { useTheme } from "@/src/theme";
import { registerSchema, type RegisterFields } from "@/src/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AppwriteException } from "react-native-appwrite";

export default function RegisterScreen() {
  const { colors } = useTheme();
  const setUser = useAuthStore((s) => s.setUser);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFields) => {
    try {
      const user = await authService.register(
        data.email,
        data.password,
        data.name,
      );
      setUser(user);
      router.replace("/");
    } catch (e) {
      setError("root", {
        message:
          e instanceof AppwriteException ? e.message : "Registration failed.",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Container padding="lg" style={styles.flex}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Create account
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Start tracking your workouts today
          </Text>

          <View style={styles.form}>
            <Controller
              control={control}
              name="name"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  label="Name"
                  placeholder="Your name"
                  value={value}
                  onChangeText={onChange}
                  error={error?.message}
                />
              )}
            />
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
                  placeholder="Min. 8 characters"
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
              title={isSubmitting ? "Creating account…" : "Create Account"}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              size="lg"
            />
          </View>

          <View style={styles.footer}>
            <Text style={{ color: colors.textSecondary }}>
              Already have an account?{" "}
            </Text>
            <Text
              style={[styles.link, { color: colors.primary }]}
              onPress={() => router.push("/(auth)/login")}
            >
              Sign In
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
