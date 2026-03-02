import { useTheme } from "@/src/theme";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: {
    label: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
  }[];
}

/**
 * Modal Component - Dialog/modal component with customizable actions
 *
 * @component
 * @example
 * <ModalComponent
 *   visible={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm"
 *   actions={[
 *     { label: 'Cancel', onPress: () => setIsOpen(false) },
 *     { label: 'Confirm', onPress: handleConfirm, variant: 'primary' }
 *   ]}
 * >
 *   <Text>Modal content</Text>
 * </ModalComponent>
 */
export const ModalComponent: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  actions,
}) => {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.backdrop, { backgroundColor: colors.overlay }]}>
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
          {title && (
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              {title}
            </Text>
          )}
          <View style={styles.content}>{children}</View>
          {actions && (
            <View style={styles.actionsRow}>
              {actions.map((action, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.actionButton,
                    action.variant === "primary"
                      ? { backgroundColor: colors.primary }
                      : action.variant === "danger"
                        ? { backgroundColor: colors.danger }
                        : { backgroundColor: colors.surfaceMuted },
                  ]}
                  onPress={action.onPress}
                >
                  <Text
                    style={[
                      styles.actionText,
                      action.variant === "secondary"
                        ? { color: colors.textPrimary }
                        : { color: colors.white },
                    ]}
                  >
                    {action.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  container: {
    borderRadius: 10,
    width: "100%",
    maxWidth: 420,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  content: {
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: "row",
    columnGap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  actionText: {
    textAlign: "center",
    fontWeight: "600",
  },
});
