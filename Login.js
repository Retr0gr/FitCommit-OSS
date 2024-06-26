import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as FileSystem from "expo-file-system";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + "users.csv",
      "email,password\nemail.com,nopass"
    );
    try {
      const path = `${FileSystem.documentDirectory}users.csv`;
      const fileInfo = await FileSystem.getInfoAsync(path);
      if (!fileInfo.exists) {
        console.log("File does not exist");
        return;
      }

      const csvData = await FileSystem.readAsStringAsync(path);
      const users = csvData.split("\n").map((row) => row.split(","));

      const user = users.find(
        (user) => user[0] === email && user[1] === password
      );
      if (user) {
        console.log("Login successful");
        navigation.navigate("Main Dashboard");
      } else {
        console.log("Invalid email or password");
      }
    } catch (error) {
      console.error("Error reading CSV file:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FitCommit</Text>
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
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>
          Don't have an account? Register here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(249, 247, 201)",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "rgb(128, 188, 189)",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "rgb(213, 240, 193)",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "rgb(170, 217, 187)",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  registerText: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Login;
