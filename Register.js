import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const path = `${FileSystem.documentDirectory}users.csv`;
      const userExists = await isUserRegistered(email, path);
      if (userExists) {
        console.log('User already exists');
        setErrorMessage('Email is already registered');
        return;
      }
      await saveUser(email, password, path);
      console.log('Registration successful');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  const isUserRegistered = async (email, path) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(path);
      if (!fileInfo.exists) {
        console.log('File does not exist');
        return false;
      }
      const csvData = await FileSystem.readAsStringAsync(path);
      const users = csvData.split('\n').map(row => row.split(','));
      return users.some(user => user[0] === email);
    } catch (error) {
      console.error('Error checking user registration:', error);
      return false;
    }
  };
  
  const saveUser = async (email, password, path) => {
    try {
      const userData = `${email},${password}\n`;
      await FileSystem.appendAsStringAsync(path, userData, { encoding: FileSystem.EncodingType.UTF8 });
      console.log('User saved successfully');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(249, 247, 201)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'rgb(128, 188, 189)',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: 'rgb(213, 240, 193)',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  registerBtn: {
    width: '80%',
    backgroundColor: 'rgb(170, 217, 187)',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  registerText: {
    color: 'white',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Register;