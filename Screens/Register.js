import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
const Register = ({ accountActionButtonColor, accountActionButton }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const RegisterSubmit = () => {
    console.log("name", name);
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        style={styles.inputField}
        onChangeText={(val) => setName(val)}
      />
      <TextInput
        placeholder="Email Address"
        style={styles.inputField}
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        placeholder="Password"
        style={styles.inputField}
        onChangeText={(val) => setPassword(val)}
      />
      <TextInput
        placeholder="Address"
        style={styles.inputField}
        onChangeText={(val) => setAddress(val)}
      />
      <TextInput
        placeholder="Gender"
        style={styles.inputField}
        onChangeText={(val) => setGender(val)}
      />
      <TextInput
        placeholder="Blood Group"
        style={styles.inputField}
        onChangeText={(val) => setBloodGroup(val)}
      />
      <TouchableOpacity style={accountActionButton} onPress={RegisterSubmit}>
        <Text style={accountActionButtonColor}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  inputField: {
    fontSize: 18,
    width: "80%",
    height: 40,
    border: "none",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
});
