import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

const DATA = [
  {
    id: '1',
    title: 'Walking',
    workouts: '121 workouts',
  },
  {
    id: '2',
    title: 'Running',
    workouts: '62 workouts',
  },
  {
    id: '3',
    title: 'Climing',
    workouts: '2 workouts',
  },
];

const Item = ({ title, workouts }) => (
  <TouchableOpacity style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{workouts}</Text>
  </TouchableOpacity>
);

const SimpleGraph = () => (
    <Svg height="200" width="400" viewBox="0 0 100 100">
      <Polyline
        points="0,60 20,20 40,80 60,20 80,80 100,20"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
    </Svg>
  );

const Statistics = () => {

  // Render Item for the list
  const renderItem = ({ item }) => (
    <Item title={item.title} workouts={item.workouts} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View>
            <Text style={styles.header}>All Workouts</Text>
            <SimpleGraph />
            <View style={styles.summary}>
              <Text>Total Time: 53m</Text>
              <Text>Total Distance: 0</Text>
              <Text>Avg Heart Rate: 152</Text>
              <Text>Min-Max Heart Rate: 87-185</Text>
              <Text>Avg Pace: 0</Text>
              <Text>Active Calories: 472</Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 14,
  },
  graphPlaceholder: {
    height: 200, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd', 
  },
  summary: {
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    },
  summaryPlaceholder: {
    height: 100, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd', 
  },
});

export default Statistics;