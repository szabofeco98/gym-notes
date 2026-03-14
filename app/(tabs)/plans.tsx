import { Container, Loader, PlanCard, SafeAreaView } from "@/components";
import { useDeletePlan } from "@/src/hooks/useDeletePlan";
import { useGetPlans } from "@/src/hooks/useGetPlans";
import { useTheme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PlansScreen() {
  const { colors } = useTheme();
  const { data: plans, isLoading } = useGetPlans();
  const { mutate: deletePlan } = useDeletePlan();

  const handleDelete = (id: string, name: string) => {
    Alert.alert("Delete Plan", `Delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deletePlan(id) },
    ]);
  };

  if (isLoading) return <Loader />;

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          My Plans
        </Text>
        <TouchableOpacity onPress={() => router.push("/(modal)/create-plan")}>
          <Ionicons name="add-circle" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {!plans?.length ? (
        <Container padding="lg">
          <Text style={[styles.empty, { color: colors.textSecondary }]}>
            No plans yet.{"\n"}Tap + to create your first workout plan.
          </Text>
        </Container>
      ) : (
        <FlatList
          data={plans}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() =>
                router.push({
                  pathname: "/(modal)/plan-detail",
                  params: {
                    id: item.$id,
                    name: item.name,
                    description: item.description ?? "",
                  },
                })
              }
              onLongPress={() => handleDelete(item.$id, item.name)}
            >
              <PlanCard name={item.name} description={item.description} />
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  title: { fontSize: 24, fontWeight: "700" },
  empty: { textAlign: "center", marginTop: 60, fontSize: 15, lineHeight: 24 },
  list: { padding: 16, gap: 12 },
});
