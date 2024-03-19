import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import Exercise from "../../components/exercise/Exercise"; // Adjust the path as needed

const TemplateCreator = () => {
  const [exercises, setExercises] = useState([{ exerciseName: "Name" }]);

  const addExercise = () => {
    setExercises([...exercises, { exerciseName: "Name" }]);
    console.log(exercises);
  };

  const updateExercise = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };
  return (
    <ScrollView style={styles.scrollView}>
      {exercises.map((exercise, index) => (
        <Exercise
          exerciseName={"Exercise Name"}
          key={index}
          index={index}
          updateExercise={updateExercise}
        />
      ))}
      <Text onPress={addExercise}>Add Exercise</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  scrollView: {
    marginBottom: 20,
    padding: 20,
    flex: 1,
    flexDirection: "column",
  },
});

export default TemplateCreator;
