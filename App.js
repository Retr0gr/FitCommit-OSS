import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Exercise from "./src/components/exercise/Exercise"; // Adjust the path as needed

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Render your Exercise components here */}
        <Exercise exerciseName="Bench Press" />
        <Exercise exerciseName="Squats" />
        <Exercise exerciseName="Lat Pulldown" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue"
  },
  scrollView: {
    marginBottom: 20,
    padding: 20,
    flex: 1,
    flexDirection: "column"
  },
});

export default App;
