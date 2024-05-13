import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Register from "./Register";
import WorkoutCreator from "./src/pages/workout_creator/WorkoutCreator";
import WorkoutsListScreen from "./src/pages/workoutListScreen/WorkoutListScreen";
import WorkoutDetailScreen from "./src/pages/workoutDetailScreen/WorkoutDetailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Workout Creator" component={WorkoutCreator} />
        <Stack.Screen name="Workouts List" component={WorkoutsListScreen} />
        <Stack.Screen name="Workout Details" component={WorkoutDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
