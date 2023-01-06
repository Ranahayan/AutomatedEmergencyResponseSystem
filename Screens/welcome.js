import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Switch,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import KeyBoardAvoidingWrapper from "../keyboardAvoidingWrapper";
// import colors from "../Colors/colors.js";
import Register from "./Register";
const colors = {
  grey: "#474747",
  background: "#FBFBFB",
  blue: "#0165FF ",
};



const Welcome = () => {
  const [login, setlogin] = useState(true);
  const [signup, setsignup] = useState(false);
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpopup, setShowpopup] = useState(false);
  const [switchvalue, setSwitchvalue] = useState(false);
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
  const toggleSwitch = (value) => {
    console.log("value of toggle button", value);
    setSwitchvalue(value);
    setShowpopup(false);
  };

  const loginSubmit = () => {
    console.log(email);
    console.log(password);
    setShowpopup(!showpopup);
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
                <MaterialIcons name="vpn-key" size={24} color="grey" />
                <TextInput
                  placeholder="Password"
                  style={styles.passwordInput}
                  secureTextEntry={show}
                  onChangeText={(value) => setPassword(value)}
                />
                <TouchableOpacity onPress={eyeButtonClicked}>
                  <MaterialCommunityIcons
                    name={show === false ? "eye" : "eye-off-outline"}
                    size={28}
                    color="grey"
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
            <Modal
              animationType="slide"
              transparent={true}
              visible={showpopup}
              onRequestClose={() => {}}
            >
              <View style={styles.popupContainer}>
                <View style={styles.popupContent}>
                  <Text>Enable Accident Detection</Text>
                  <Switch onValueChange={toggleSwitch} value={switchvalue} />
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <Register
            accountActionButtonColor={styles.accountActionButtonColor}
            accountActionButton={styles.accountActionButton}
            inputFields={styles.inputFields}
            passwordInput={styles.passwordInput}
            inputPlaceholder={styles.inputPlaceholder}
          />
        )}
      </View>
    </KeyBoardAvoidingWrapper>
  );
};


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
    marginTop: "20%",
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
    marginBottom: 1,
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
    width: "90%",
  },
  passwordInput: {
    fontSize: 18,
    marginLeft: 5,
    width: "80%",
  },

  accountActionButton: {
    backgroundColor: '#0165FF',
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
  popupContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  popupContent: {
    width: wp("80%"),
    height: hp("10%"),
    marginBottom: hp("25%"),
    borderRadius: 30,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 5,
  },
});
export default Welcome;
