import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Register from "./Register";
import WorkoutCreator from "./src/pages/workout_creator/WorkoutCreator";
import WorkoutsListScreen from "./src/pages/workoutListScreen/WorkoutListScreen";
import WorkoutDetailScreen from "./src/pages/workoutDetailScreen/WorkoutDetailScreen";
import MainDashboard from "./src/pages/Dashboard";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Workout Creator" component={WorkoutCreator} />
        <Stack.Screen name="Workouts List" component={WorkoutsListScreen} />
        <Stack.Screen name="Workout Details" component={WorkoutDetailScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="MainDashboard" component={MainDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
});
