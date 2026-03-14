import { Button, Container, SafeAreaView } from "@/components";
import { useGetWorkoutHistory } from "@/src/hooks/useGetWorkoutHistory";
import { authService } from "@/src/services/authService";
import { useAuthStore } from "@/src/stores/authStore";
import { useTheme } from "@/src/theme";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { user, setUser } = useAuthStore();
  const { data: sessions } = useGetWorkoutHistory();

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Profile
        </Text>
      </View>

      <Container padding="lg">
        {/* Avatar placeholder */}
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>
            {user?.name?.[0]?.toUpperCase() ??
              user?.email?.[0]?.toUpperCase() ??
              "?"}
          </Text>
        </View>

        <Text style={[styles.name, { color: colors.textPrimary }]}>
          {user?.name ?? "Athlete"}
        </Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>
          {user?.email}
        </Text>

        {/* Stats */}
        <View
          style={[
            styles.statsRow,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {sessions?.length ?? 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Workouts
            </Text>
          </View>
          <View
            style={[styles.statDivider, { backgroundColor: colors.border }]}
          />
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {sessions?.reduce((acc, s) => acc + s.totalSets, 0) ?? 0}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Total Sets
            </Text>
          </View>
        </View>

        <Button
          title="Log Out"
          onPress={handleLogout}
          variant="danger"
          style={{ marginTop: 24 }}
        />
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1 },
  title: { fontSize: 24, fontWeight: "700" },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  avatarText: { fontSize: 28, fontWeight: "700", color: "#fff" },
  name: { fontSize: 20, fontWeight: "700", textAlign: "center" },
  email: { fontSize: 14, textAlign: "center", marginTop: 4, marginBottom: 24 },
  statsRow: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  stat: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 28, fontWeight: "700" },
  statLabel: { fontSize: 13, marginTop: 2 },
  statDivider: { width: 1, marginVertical: 4 },
});
