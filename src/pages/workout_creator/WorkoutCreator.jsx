import React, { useState } from "react";
import {
  View,
  TextInput,
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
      <Button title="Add Exercise" onPress={addExercise} />
      {exercises.map((exercise, index) => (
        <View key={index} style={styles.card}>
          <Text>
            {exercise.name} - Sets: {exercise.sets}
          </Text>
        </View>
      ))}
      <Button title="Save Workout" onPress={saveWorkout} />
      <Button
        title="Go to Workouts List"
        onPress={() => navigation.navigate("Workouts List")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
  card: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
});
