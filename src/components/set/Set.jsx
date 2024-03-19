import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Checkbox, Menu, Portal } from "react-native-paper";

const Set = ({
  set,
  index,
  updateSet,
  completedSets,
  toggleCompleted,
  deleteSet,
  showModal,
}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <View style={styles.setRow}>
      <TouchableOpacity onPress={() => showModal(index)}>
        <Text style={styles.setType}>{set.type}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={(text) => updateSet(index, "reps", text)}
        value={set.reps.toString()}
        placeholder="Reps"
        keyboardType="numeric"
      />
      <Text style={styles.multiplier}>x</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => updateSet(index, "weight", text)}
        value={set.weight.toString()}
        placeholder="Weight"
        keyboardType="numeric"
      />
      <Checkbox
        status={completedSets ? "checked" : "unchecked"}
        onPress={() => toggleCompleted(index)}
      />
      <Text
        onPress={() => {
          deleteSet(index);
        }}
      >
        🗑️
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  setType: {
    color: "blue",
    textDecorationLine: "underline",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    margin: 10,
    width: 80,
  },
  multiplier: {
    fontSize: 16,
    paddingHorizontal: 4,
  },
  menuTrigger: {
    backgroundColor: "red",
    padding: 8,
    fontSize: 24,
    color: "#000",
  },
  deleteButton: {
    zIndex: 1,
  },
});

export default Set;
