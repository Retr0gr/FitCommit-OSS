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
            <Button
              title="Delete"
              onPress={() => deleteWorkout(item.key)}
              color="#ff6347" // Optional: style the button with a color
            />
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9c2ff",
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
});
