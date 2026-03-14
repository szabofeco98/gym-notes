import { Loader } from "@/components";
import { useGetWorkoutHistory } from "@/src/hooks/useGetWorkoutHistory";
import { useTheme } from "@/src/theme";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

const getDuration = (start: string, end: string) => {
  const mins = Math.round(
    (new Date(end).getTime() - new Date(start).getTime()) / 60000,
  );
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
};

export default function HistoryScreen() {
  const { colors } = useTheme();
  const { data: sessions, isLoading } = useGetWorkoutHistory();

  if (isLoading) return <Loader />;

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          History
        </Text>
      </View>

      {!sessions?.length ? (
        <View style={styles.emptyWrap}>
          <Text style={[styles.emptyIcon]}>📋</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No workouts yet.{"\n"}Complete a session to see your history.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <View style={styles.cardTop}>
                <Text
                  style={[styles.sessionName, { color: colors.textPrimary }]}
                >
                  {item.date}
                </Text>
                <Text style={[styles.date, { color: colors.textSecondary }]}>
                  {item.startTime
                    ? formatDate(item.startTime)
                    : formatDate(item.$createdAt)}
                </Text>
              </View>
              <View style={styles.cardStats}>
                <Text style={[styles.stat, { color: colors.primary }]}>
                  {item.completed ? "Completed" : "In Progress"}
                </Text>
                {item.startTime && item.endTime && (
                  <>
                    <Text style={[styles.statDot, { color: colors.border }]}>
                      •
                    </Text>
                    <Text
                      style={[styles.stat, { color: colors.textSecondary }]}
                    >
                      {getDuration(item.startTime, item.endTime)}
                    </Text>
                  </>
                )}
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  title: { fontSize: 24, fontWeight: "700" },
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { textAlign: "center", fontSize: 15, lineHeight: 24 },
  list: { padding: 16, gap: 12 },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  sessionName: { fontSize: 16, fontWeight: "600" },
  date: { fontSize: 13 },
  cardStats: { flexDirection: "row", alignItems: "center", gap: 6 },
  stat: { fontSize: 13 },
  statDot: { fontSize: 13 },
});
