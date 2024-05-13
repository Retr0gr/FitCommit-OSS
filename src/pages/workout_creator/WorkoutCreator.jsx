import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WorkoutCreator({ navigation }) {
  const [exercises, setExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");

  const addExercise = () => {
    if (name && sets) {
      setExercises([...exercises, { name, sets }]);
      setName("");
      setSets("");
    }
  };

  const saveWorkout = async () => {
    if (workoutName === "") {
      alert("Please enter a workout name.");
      return;
    }

    try {
      const workout = {
        name: workoutName,
        exercises: exercises,
      };
      await AsyncStorage.setItem(
        `workout_${workoutName}`,
        JSON.stringify(workout)
      );
      alert("Workout saved!");
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Workout Name"
        value={workoutName}
        onChangeText={setWorkoutName}
        style={styles.input}
      />
      <TextInput
        placeholder="Exercise Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Sets"
        keyboardType="numeric"
        value={sets}
        onChangeText={setSets}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={addExercise}>
        <Text>Add Exercice</Text>
      </TouchableOpacity>
      {exercises.map((exercise, index) => (
        <View key={index} style={styles.card}>
          <Text>
            {exercise.name} - Sets: {exercise.sets}
          </Text>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={saveWorkout}>
        <Text>Save Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.navigate("Workouts List")}
      >
        <Text>Go to Workouts List</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#80BCBD",
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#D5F0C1",
  },
  card: {
    backgroundColor: "#D5F0C1",
    padding: 20,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#D5F0C1",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,

    alignItems: "center",
  },
  goBackButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#F9F7C9",
  },
  buttonText: {
    color: "#444",
    fontSize: 18,
    fontWeight: "bold",
  },
});
