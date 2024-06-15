import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "white",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },

  containerSibling: {
    width: "100%",
    maxWidth: 600,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  h1: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },

  itemList: {
    marginTop: 20,
  },

  itemm: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  buttons: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "green",
    alignItems: "center",
  },

  buttonu: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "yellow",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  buttonTextUpdate: {
    color: "black",
    fontWeight: "bold",
  },
});

export { styles };
