import { StyleSheet } from "react-native";

export const inviteOnlyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f7",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d9d9dc",
    padding: 16,
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1b1b1d",
  },
  subtitle: {
    fontSize: 15,
    color: "#4b4b55",
  },
  secondaryText: {
    fontSize: 13,
    color: "#4b4b55",
  },
  link: {
    color: "#1f1f24",
    textDecorationLine: "underline",
  },
  error: {
    color: "#8f1f1f",
  },
  inputRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#d9d9dc",
    borderRadius: 8,
    overflow: "hidden",
  },
  inputPrefix: {
    backgroundColor: "#f0f0f2",
    color: "#4b4b55",
    paddingHorizontal: 8,
    paddingVertical: 10,
    fontSize: 12,
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1b1b1d",
  },
  plainInput: {
    borderWidth: 1,
    borderColor: "#d9d9dc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1b1b1d",
  },
  button: {
    backgroundColor: "#1f1f24",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
