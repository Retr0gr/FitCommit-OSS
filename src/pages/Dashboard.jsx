import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WorkoutPlanItem = ({ title, description }) => {
  return (
    <View style={styles.workoutPlanItem}>
      <Text style={styles.workoutPlanTitle}>{title}</Text>
      <Text style={styles.workoutPlanDescription}>{description}</Text>
    </View>
  );
};

const MainDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Workout Plan</Text>
      <WorkoutPlanItem title="Monday" description="Chest and Triceps" />
      <WorkoutPlanItem title="Tuesday" description="Back and Biceps" />
      <WorkoutPlanItem title="Wednesday" description="Legs" />
      <WorkoutPlanItem title="Thursday" description="Shoulders" />
      <WorkoutPlanItem title="Friday" description="Rest day" />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  workoutPlanItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    width: '80%',
  },
  workoutPlanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  workoutPlanDescription: {
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainDashboard;
