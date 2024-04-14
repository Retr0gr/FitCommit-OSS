import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Register from './Register';
// import Home from './Home'; 
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import TemplateCreator from './src/pages/template-creator/TemplateCreator';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TemplateCreator />
      </ScrollView>
    </SafeAreaView>
  );
};

const Stack = createStackNavigator();

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
