import { Button, SafeAreaView } from "@/components";
import { useSessionStore } from "@/src/stores/sessionStore";
import { useTheme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PlanDetailScreen() {
  const { colors } = useTheme();
  const { id, name, description } = useLocalSearchParams<{
    id: string;
    name: string;
    description: string;
  }>();
  const startSession = useSessionStore((s) => s.startSession);

  const handleStartWorkout = () => {
    startSession(name, [], id);
    router.dismiss();
    router.push("/(tabs)/today");
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Plan Details
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={{ padding: 20, gap: 8 }}>
        <Text style={[styles.planName, { color: colors.textPrimary }]}>
          {name}
        </Text>
        {!!description && (
          <Text style={[styles.planDesc, { color: colors.textSecondary }]}>
            {description}
          </Text>
        )}
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
        <Button
          title="Start Workout with this Plan"
          onPress={handleStartWorkout}
          size="lg"
        />
      </View>

      <View style={[styles.hint, { borderTopColor: colors.border }]}>
        <Ionicons
          name="information-circle-outline"
          size={16}
          color={colors.textSecondary}
        />
        <Text style={[styles.hintText, { color: colors.textSecondary }]}>
          You can add exercises once the workout session starts.
        </Text>
      </View>
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
  planName: { fontSize: 22, fontWeight: "700" },
  planDesc: { fontSize: 15, lineHeight: 22 },
  hint: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 16,
    borderTopWidth: 1,
  },
  hintText: { fontSize: 13, flex: 1 },
});
