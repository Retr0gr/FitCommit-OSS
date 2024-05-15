import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Workout({ route, navigation }) {
  const { workout } = route.params;
  const [exercises, setExercises] = useState(
    workout.exercises.map((exercise) => ({
      ...exercise,
      sets: Array.from({ length: parseInt(exercise.sets, 10) }, () => ({
        reps: "",
        weight: "",
      })),
    }))
  );

  const handleChange = (text, index, setIndex, type) => {
    const newExercises = [...exercises];
    newExercises[index].sets[setIndex][type] = text;
    setExercises(newExercises);
  };

  const saveWorkout = async () => {
    try {
      const dateSaved = new Date().toISOString();
      const updatedWorkout = { ...workout, exercises };
      await AsyncStorage.setItem(workout.key, JSON.stringify(updatedWorkout));
      alert("Workout updated on " + new Date(dateSaved).toLocaleString());
      navigation.goBack();
    } catch (e) {
      alert("Failed to save the updated workout");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {exercises.map((exercise, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{exercise.name}</Text>
          {exercise.sets.map((set, setIndex) => (
            <View key={setIndex} style={styles.setRow}>
              <TextInput
                style={styles.input}
                placeholder="Reps"
                keyboardType="numeric"
                onChangeText={(text) =>
                  handleChange(text, index, setIndex, "reps")
                }
                value={set.reps}
              />
              <Text style={styles.multiplier}>x</Text>
              <TextInput
                style={styles.input}
                placeholder="Weight"
                keyboardType="numeric"
                onChangeText={(text) =>
                  handleChange(text, index, setIndex, "weight")
                }
                value={set.weight}
              />
            </View>
          ))}
        </View>
      ))}
      <TouchableOpacity onPress={saveWorkout} style={styles.button}>
        <Text>SAVE WORKOUT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: "#80BCBD",
  },
  card: {
    backgroundColor: "#D5F0C1",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginHorizontal: 5,
    flex: 1,
    textAlign: "center",
  },
  multiplier: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#F9F7C9",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
});
