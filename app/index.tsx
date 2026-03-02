import {
  Badge,
  Button,
  Card,
  Container,
  ExerciseCard,
  Icon,
  Input,
  PlanCard,
  SafeAreaView,
} from "@/components";
import { useTheme } from "@/src/theme";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const { colors, mode, resolvedTheme, setMode } = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }}>
      <ScrollView
        style={[styles.scrollView, { backgroundColor: colors.background }]}
      >
        <Container padding="lg">
          {/* Title */}
          <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>
            Component Showcase
          </Text>

          <Card variant="outlined" style={styles.sectionCard}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Theme Mode
            </Text>
            <Text
              style={[
                styles.successDescription,
                { color: colors.textSecondary },
              ]}
            >
              Current: {mode} ({resolvedTheme})
            </Text>
            <View style={styles.modeRow}>
              <Button
                title="Light"
                onPress={() => setMode("light")}
                variant={mode === "light" ? "primary" : "secondary"}
                size="sm"
              />
              <Button
                title="Dark"
                onPress={() => setMode("dark")}
                variant={mode === "dark" ? "primary" : "secondary"}
                size="sm"
              />
              <Button
                title="System"
                onPress={() => setMode("system")}
                variant={mode === "system" ? "primary" : "secondary"}
                size="sm"
              />
            </View>
          </Card>

          {/* Buttons Section */}
          <Card variant="elevated" style={styles.sectionCard}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Buttons
            </Text>
            <Button title="Primary Button" onPress={() => {}} />
            <View style={styles.topSpacingMd}>
              <Button
                title="Secondary Button"
                onPress={() => {}}
                variant="secondary"
              />
            </View>
            <View style={styles.topSpacingMd}>
              <Button
                title="Danger Button"
                onPress={() => {}}
                variant="danger"
              />
            </View>
          </Card>

          {/* Input Section */}
          <Card variant="elevated" style={styles.sectionCard}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Input Fields
            </Text>
            <Input
              label="Email"
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.topSpacingMd}>
              <Input
                label="Password"
                placeholder="Enter password"
                secureTextEntry
              />
            </View>
          </Card>

          {/* Badges Section */}
          <Card variant="elevated" style={styles.sectionCard}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Badges
            </Text>
            <View style={styles.badgeRow}>
              <Badge label="Primary" variant="primary" />
              <Badge label="Success" variant="success" />
              <Badge label="Warning" variant="warning" />
              <Badge label="Error" variant="error" />
            </View>
          </Card>

          {/* Exercise Card Section */}
          <Card variant="elevated" style={styles.sectionCard}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Exercise Card
            </Text>
            <ExerciseCard
              name="Bench Press"
              muscleGroup="Chest"
              description="Primary: Chest, Secondary: Triceps, Shoulders"
              onPress={() => console.log("Exercise pressed")}
            />
          </Card>

          {/* Plan Card Section */}
          <Card variant="elevated" style={styles.sectionCard}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Plan Card
            </Text>
            <PlanCard
              name="Push/Pull/Legs"
              dayCount={6}
              description="Upper/Lower Split"
              onPress={() => console.log("Plan pressed")}
            />
          </Card>

          {/* Icons Section */}
          <Card variant="elevated" style={styles.sectionCard}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Icons
            </Text>
            <View style={styles.iconRow}>
              <Icon name="dumbbell" size={32} color="#3B82F6" />
              <Icon name="heart" size={32} color="#EF4444" />
              <Icon name="fire" size={32} color="#F59E0B" />
              <Icon name="target" size={32} color="#10B981" />
            </View>
          </Card>

          {/* Success Message */}
          <Card variant="outlined" style={styles.sectionCard}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              ✅ All Components Working!
            </Text>
            <Text
              style={[
                styles.successDescription,
                { color: colors.textSecondary },
              ]}
            >
              Your component library is ready to use. Import from @/components
              and start building screens!
            </Text>
            <Button title="Get Started" onPress={() => {}} variant="primary" />
          </Card>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  sectionCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  topSpacingMd: {
    marginTop: 12,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 12,
    rowGap: 12,
  },
  iconRow: {
    flexDirection: "row",
    columnGap: 16,
  },
  modeRow: {
    flexDirection: "row",
    columnGap: 8,
    rowGap: 8,
    flexWrap: "wrap",
  },
  successDescription: {
    marginBottom: 12,
    fontSize: 16,
    lineHeight: 24,
  },
});
