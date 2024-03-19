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
