import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Modal, Portal, Provider, Menu } from "react-native-paper";
import Set from "../set/Set";

const Exercise = ({ exerciseName, index, updateExercise }) => {
  const [sets, setSets] = useState([{ reps: "", weight: "", type: "N" }]);
  const [completedSets, setCompletedSets] = useState([false]);
  const [visible, setVisible] = useState(false);
  const [currentSetIndex, setCurrentSetIndex] = useState(null);
  const [menuVisible, setMenuVisible] = useState(
    Array(sets.length).fill(false)
  ); // Tracks visibility of each menu

  const setTypeLabels = {
    Normal: "N",
    "Warm up": "W",
    Drop: "D",
    Failure: "F",
  };

  const showModal = (index) => {
    setCurrentSetIndex(index);
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  const selectSetType = (type) => {
    const newSets = [...sets];
    newSets[currentSetIndex].type = setTypeLabels[type];
    setSets(newSets);
    hideModal();
  };

  const updateSet = (index, field, value) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const addSet = () => {
    setSets([...sets, { reps: "", weight: "", type: "N" }]);
    setCompletedSets([...completedSets, false]);
    setMenuVisible([...menuVisible, false]);
    console.log(exerciseName);
  };

  const deleteSet = (index) => {
    const newSets = sets.filter((_, setIndex) => setIndex !== index);
    setSets(newSets);
    const newCompletedSets = completedSets.filter(
      (_, setIndex) => setIndex !== index
    );
    setCompletedSets(newCompletedSets);
    const newMenuVisible = menuVisible.filter(
      (_, setIndex) => setIndex !== index
    );
    setMenuVisible(newMenuVisible);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.title}
            placeholder={exerciseName}
            onChangeText={(text) => updateExercise(index, "exerciseName", text)}
          />
        </View>
        {sets.map((set, index) => (
          <Set
            key={index}
            set={set}
            index={index}
            updateSet={updateSet}
            completedSets={completedSets[index]}
            toggleCompleted={(index) => {
              const newCompletedSets = [...completedSets];
              newCompletedSets[index] = !newCompletedSets[index];
              setCompletedSets(newCompletedSets);
            }}
            deleteSet={deleteSet}
            showModal={showModal}
          />
        ))}
        <Text style={styles.addSet} onPress={addSet}>
          Add Set
        </Text>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}
          >
            <Button title="Normal" onPress={() => selectSetType("Normal")} />
            <Button title="Warm up" onPress={() => selectSetType("Warm up")} />
            <Button title="Drop" onPress={() => selectSetType("Drop")} />
            <Button title="Failure" onPress={() => selectSetType("Failure")} />
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8, // Adds space between each Exercise component
    marginBottom: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // For Android shadow
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    margin: 10,
    width: 80,
  },
  addSet: {
    color: "blue",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  multiplier: {
    fontSize: 16,
    paddingHorizontal: 4,
  },
  menuTrigger: {
    padding: 8,
    fontSize: 24,
    color: "#000",
  },
});

export default Exercise;
