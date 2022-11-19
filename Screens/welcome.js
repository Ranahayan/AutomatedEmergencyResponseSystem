import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import KeyBoardAvoidingWrapper from "../keyboardAvoidingWrapper";
import colors from "../colors";
const Welcome = () => {
  const [login, setlogin] = useState(true);
  const [signup, setsignup] = useState(false);
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const showLogin = () => {
    setlogin(true);
    setsignup(false);
  };
  const showSignup = () => {
    setlogin(false);
    setsignup(true);
  };
  const eyeButtonClicked = () => {
    setShow(!show);
  };

  const loginSubmit = () => {
    console.log(email);
    console.log(password);
  };

  return (
    <KeyBoardAvoidingWrapper>
      <View>
        <View style={styles.welcomeText}>
          <Text style={styles.firstHeading}>Welcome Back</Text>
          <Text style={styles.secondHeading}>Serves to save lives!</Text>
        </View>
        <View style={styles.accountButtons}>
          <View
            style={
              login ? styles.showloginFormButton : styles.disableAccountButtons
            }
          >
            <Text
              style={
                !login
                  ? styles.disableAccountButtons
                  : styles.accountsButtonColor
              }
              onPress={showLogin}
            >
              Login
            </Text>
          </View>
          <View
            style={
              signup
                ? styles.showSignupFormButton
                : styles.disableAccountButtons
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
        {login ? (
          <View style={styles.loginForm}>
            <View style={styles.loginInputs}>
              <View style={styles.inputFields}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={24}
                  color="grey"
                />
                <TextInput
                  placeholder="Email Address"
                  style={styles.inputPlaceholder}
                  onChangeText={(value) => setEmail(value)}
                />
              </View>
              <View style={styles.inputFields}>
                <Feather name="lock" size={24} color="grey" />
                <TextInput
                  placeholder="Password"
                  style={styles.inputPlaceholder}
                  secureTextEntry={show}
                  onChangeText={(value) => setPassword(value)}
                />
                <TouchableOpacity onPress={eyeButtonClicked}>
                  <MaterialCommunityIcons
                    name={show === false ? "eye" : "eye-off-outline"}
                    size={28}
                    color="grey"
                    style={styles.eyeButton}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.accountActionButton}
              onPress={loginSubmit}
            >
              <Text style={styles.accountActionButtonColor}>Login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>Signup Form</Text>
        )}
      </View>
    </KeyBoardAvoidingWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  welcomeText: {
    marginTop: 120,
    height: hp("10%"),
    width: wp("100%"),
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
    marginTop: "40%",
    // marginTop: 120,
  },
  showloginFormButton: {
    width: wp("10%"),
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  showSignupFormButton: {
    width: wp("15%"),
    borderBottomColor: "black",
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
  loginForm: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10%",
  },
  loginInputs: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: hp("20%"),
  },
  inputFields: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("80%"),
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  inputPlaceholder: {
    fontSize: 18,
    marginLeft: 5,
  },
  eyeButton: {
    marginLeft: "65%",
  },
  accountActionButton: {
    backgroundColor: colors.blue,
    width: wp("80%"),
    height: hp("6%"),
    borderRadius: 20,
    marginTop: 50,
  },
  accountActionButtonColor: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: hp("6%"),
  },
});
