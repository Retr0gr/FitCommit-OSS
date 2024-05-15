import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MainDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.header, styles.buttonText]}>Welcome!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Workout Creator")}
        style={[styles.button, styles.primaryButton]}
      >
        <Text style={styles.buttonText}>Create New Workout Template</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Workouts List")}
        style={[styles.button, styles.primaryButton]}
      >
        <Text style={styles.buttonText}>Start New Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Workout History")}
        style={[styles.button, styles.primaryButton]}
      >
        <Text style={styles.buttonText}>See Workout History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.primaryButton]}>
        <Text style={styles.buttonText}>See Statistics</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={[styles.button, styles.logoutButton]}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#80BCBD",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#D5F0C1",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#AAD9BB",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#F9F7C9",
  },
  buttonText: {
    color: "#444",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MainDashboard;
