import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function WorkoutDetailScreen({ route }) {
  const { workout } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{workout.name}</Text>
      {workout.exercises.map((exercise, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text>Sets: {exercise.sets}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#80BCBD",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#F9F7C9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
