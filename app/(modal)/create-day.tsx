import { Button, Container, Input, SafeAreaView } from "@/components";
import { useCreateDayPlan } from "@/src/hooks/useCreateDayPlan";
import { useTheme } from "@/src/theme";
import { createDaySchema, type CreateDayFields } from "@/src/utils/schemas";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
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

export default function CreateDayScreen() {
  const { colors } = useTheme();
  const { plan, order } = useLocalSearchParams<{
    plan: string;
    order: string;
  }>();
  const { mutateAsync: createDayPlan, isPending } = useCreateDayPlan();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateDayFields>({ resolver: zodResolver(createDaySchema) });

  const onSubmit = async (data: CreateDayFields) => {
    try {
      await createDayPlan({
        plan,
        name: data.name,
        order: parseInt(order ?? "0", 10),
      });
      router.back();
    } catch (e) {
      setError("root", {
        message:
          e instanceof AppwriteException ? e.message : "Failed to create day.",
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
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            Add Day
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <Container padding="lg">
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                label="Day Name"
                placeholder="e.g. Upper 1, Push Day, Leg Day"
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
            title={loading ? "Saving…" : "Add Day"}
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
  error: { fontSize: 12, marginTop: 4 },
});
