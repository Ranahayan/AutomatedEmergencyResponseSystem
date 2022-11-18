import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../colors";
const Welcome = () => {
  const [login, setlogin] = useState(true);
  const [signup, setsignup] = useState(false);
  const showLogin = () => {
    setlogin(true);
    setsignup(false);
  };
  const showSignup = () => {
    setlogin(false);
    setsignup(true);
  };
  return (
    <View>
      <View style={styles.welcomeText}>
        <Text style={styles.firstHeading}>Welcome Back</Text>
        <Text style={styles.secondHeading}>Servers to save lives!</Text>
      </View>
      <View style={styles.accountButtons}>
        <View
          style={
            login ? styles.showloginFormButton : styles.disableAccountButtons
          }
        >
          <Text
            style={
              !login ? styles.disableAccountButtons : styles.accountsButtonColor
            }
            onPress={showLogin}
          >
            Login
          </Text>
        </View>
        <View
          style={
            signup ? styles.showSignupFormButton : styles.disableAccountButtons
          }
        >
          <Text
            style={
              !signup
                ? styles.disableAccountButtons
                : styles.accountsButtonColor
            }
            onPress={showSignup}
          >
            Register
          </Text>
        </View>
      </View>
      {login ? <Text>Login Form</Text> : <Text>Signup Form</Text>}
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  welcomeText: {
    marginTop: 70,
  },
  firstHeading: {
    textAlign: "center",
    color: colors.grey,
    fontWeight: "900",
    fontSize: 30,
  },
  secondHeading: {
    textAlign: "center",
    color: colors.blue,
    fontWeight: "800",
    fontSize: 20,
    fontStyle: "italic",
  },
  accountButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 120,
  },
  showloginFormButton: {
    width: 40,
    borderBottomColor: colors.blue,
    borderBottomWidth: 2,
  },
  showSignupFormButton: {
    width: 54,
    borderBottomColor: colors.blue,
    borderBottomWidth: 2,
    fontWeight: "bold",
  },
  accountsButtonColor: {
    color: colors.blue,
    fontWeight: "900",
  },
  disableAccountButtons: {
    color: colors.grey,
    marginBottom: 8,
  },
});
