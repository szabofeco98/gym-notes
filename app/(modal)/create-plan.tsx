import { Button, Container, Input, SafeAreaView } from "@/components";
import { useCreatePlan } from "@/src/hooks/useCreatePlan";
import { useTheme } from "@/src/theme";
import { createPlanSchema, type CreatePlanFields } from "@/src/utils/schemas";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppwriteException } from "react-native-appwrite";

export default function CreatePlanScreen() {
  const { colors } = useTheme();
  const { mutateAsync: createPlan, isPending } = useCreatePlan();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreatePlanFields>({ resolver: zodResolver(createPlanSchema) });

  const onSubmit = async (data: CreatePlanFields) => {
    try {
      await createPlan({ name: data.name, description: data.description });
      router.back();
    } catch (e) {
      setError("root", {
        message:
          e instanceof AppwriteException ? e.message : "Failed to create plan.",
      });
    }
  };

  const loading = isSubmitting || isPending;

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            New Plan
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <Container padding="lg">
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                label="Plan Name"
                placeholder="e.g. Push / Pull / Legs"
                value={value ?? ""}
                onChangeText={onChange}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                label="Description (optional)"
                placeholder="e.g. 6-day split, 3 days on 1 off"
                value={value ?? ""}
                onChangeText={onChange}
                error={error?.message}
              />
            )}
          />
          {errors.root ? (
            <Text style={[styles.error, { color: colors.danger }]}>
              {errors.root.message}
            </Text>
          ) : null}
          <View style={{ height: 20 }} />
          <Button
            title={loading ? "Saving…" : "Create Plan"}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            size="lg"
          />
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 17, fontWeight: "600" },
  error: { fontSize: 13, marginTop: 8 },
});
