import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WorkoutsListScreen({ navigation }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    const workouts = items.map((item) => ({
      key: item[0],
      ...JSON.parse(item[1]),
    }));
    setWorkouts(workouts);
  };

  const deleteWorkout = async (key) => {
    await AsyncStorage.removeItem(key);
    fetchWorkouts(); // Refresh the list after deletion
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() =>
                navigation.navigate("Workout Details", { workout: item })
              }
            >
              <Text style={styles.title}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Workout", { workout: item })}
              style={styles.button}
            >
              <Text>START</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteWorkout(item.key)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>DELETE</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Main Dashboard")}
      >
        <Text>Main Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#80BCBD",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#D5F0C1",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  touchable: {
    flex: 1, // Allows the text to fill the space
  },
  title: {
    fontSize: 24,
  },
  button: {
    backgroundColor: "#F9F7C9",
    borderRadius: 10,
    padding: 10,
  },
  deleteButton: {
    backgroundColor: "#ff6347",
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "white",
  },
});
