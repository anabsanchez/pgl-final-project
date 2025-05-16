import { StyleSheet } from "react-native";

const colors = {
  background: "#0D1117",
  text: "#C9D1D9",
  border: "#C9D1D9",
  button: "#2F81F7",
  link: "#40B456",
  placeholder: "rgba(201, 209, 217, 0.6)",
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 70,
    color: colors.text,
    marginBottom: 60,
    textAlign: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "10%",
    marginTop: 10,
    marginBottom: -10,
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: "80%",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    color: colors.text,
    backgroundColor: "#121212",
  },
  button: {
    backgroundColor: colors.button,
    borderRadius: 5,
    paddingVertical: 6,
    marginTop: 60,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "semibold",
  },
  link: {
    color: colors.link,
    marginVertical: 5,
    fontSize: 14,
  },
  welcomeMessage: {
    fontSize: 70,
    color: colors.text,
    textAlign: "center",
    marginVertical: 150,
  },
  logoutButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: colors.button,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export { globalStyles, colors };
