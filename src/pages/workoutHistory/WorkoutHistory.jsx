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

export default function WorkoutHistory({ navigation }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    const workouts = items
      .map((item) => ({
        key: item[0],
        ...JSON.parse(item[1]),
      }))
      .sort((a, b) => new Date(b.dateSaved) - new Date(a.dateSaved)); // Sorting by date descending
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
            <TouchableOpacity style={styles.touchable}>
              <Text style={styles.title}>{`${item.name} (${new Date(
                item.dateSaved
              ).toLocaleDateString()} ${new Date(
                item.dateSaved
              ).toLocaleTimeString()})`}</Text>
            </TouchableOpacity>
            <Button
              title="Delete"
              onPress={() => deleteWorkout(item.key)}
              color="#ff6347"
            />
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
      <TouchableOpacity
        style={styles.goBackButton}
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
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  goBackButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#F9F7C9",
  },
});
