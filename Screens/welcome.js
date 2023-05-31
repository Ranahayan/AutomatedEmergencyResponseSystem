import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Switch,
  TouchableWithoutFeedback,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import KeyBoardAvoidingWrapper from "../keyboardAvoidingWrapper";
const Joi = require("joi-browser");
// import colors from "../Colors/colors";
import Register from "./Register";
import axios from "axios";
import { Data } from "../Context_api/Context";
import { IP_ADDRESS } from "@env";
// import * as Location from "expo-location";
const colors = {
  greyColor: "#474747",
  background: "#FBFBFB",
  blueColor: "#0165FF",
};

const Welcome = ({ navigation, getUserLocation }) => {
  const [login, setlogin] = useState(true);
  const [signup, setsignup] = useState(false);
  const [show, setShow] = useState(true);
  const [showpopup, setShowpopup] = useState(false);
  const [switchvalue, setSwitchvalue] = useState(false);
  const [credentialsError, setCredentialsError] = useState(false);
  const { setAccount } = useContext(Data);

  useEffect(() => {
    getUserLocation();
    console.log("Ip", IP_ADDRESS);
  }, []);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const conditions = {
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .label("Email"),
    password: Joi.string().required().label("Password"),
  };

  const schema = Joi.object(conditions);

  const submitUser = async () => {
    const user = {
      ...data,
    };
    console.log("IP", IP_ADDRESS);
    let api = `http://${IP_ADDRESS}:4000/auth/login`;
    console.log("Api URL", api);
    let finalAPI = String(api);
    try {
      let response = await axios.post(
        "http://192.168.150.158:8080/auth/login",
        user
      );
      setAccount(response.data.existinguser);
      {
        response.data.existinguser
          ? setShowpopup(!showpopup)
          : setCredentialsError(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUser = () => {
    const errors = handleErrors();
    setErrors(errors || {});
    if (errors) return;
    submitUser();
  };

  const handleErrors = () => {
    const user = {
      ...data,
    };
    const { error } = schema.validate(user, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const handleOnChange = (name) => (value) => {
    let newErrors = { ...errors };
    let newMessage = handleOnSaveErrors(value, name);
    if (newMessage) newErrors[name] = newMessage;
    else delete newErrors[name];
    let newData = { ...data };
    newData[name] = value;
    setData(newData);
    setErrors(newErrors);
    setCredentialsError(false);
  };

  const handleOnSaveErrors = (value, name) => {
    const toBeValidate = { [name]: value };
    const OnSaveSchema = Joi.object({ [name]: conditions[name] });
    const { error } = OnSaveSchema.validate(toBeValidate);
    return error ? error.details[0].message : null;
  };
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
    getPermission();
    navigation.navigate("Home");
  };
  const getPermission = async () => {
    console.log("getPermission function is executing....");
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
    } catch (error) {
      console.log(error.message);
      console.log("error");
    }
  };

  const backToLogin = () => {
    setlogin(!login);
    setsignup(false);
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
              <View>
                <View style={styles.inputFields}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={24}
                    color="grey"
                  />
                  <TextInput
                    placeholder="Email Address"
                    style={styles.inputPlaceholder}
                    value={data.email}
                    onChangeText={handleOnChange("email")}
                  />
                </View>
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>
              <View>
                <View style={styles.inputFields}>
                  <MaterialIcons name="vpn-key" size={24} color="grey" />
                  <TextInput
                    placeholder="Password"
                    style={styles.passwordInput}
                    secureTextEntry={show}
                    value={data.password}
                    onChangeText={handleOnChange("password")}
                  />
                  <TouchableOpacity onPress={eyeButtonClicked}>
                    <MaterialCommunityIcons
                      name={show === false ? "eye" : "eye-off-outline"}
                      size={28}
                      color="grey"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
              </View>
            </View>
            {credentialsError ? (
              <Text style={{ color: "red", marginTop: -5, marginBottom: -15 }}>
                Invalid Credentials
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.accountActionButton}
              onPress={handleUser}
              disabled={handleErrors() ? true : false}
            >
              <Text style={styles.accountActionButtonColor}>Login</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={showpopup}
              onRequestClose={() => {}}
            >
              <TouchableWithoutFeedback onPress={() => setShowpopup(false)}>
                <View style={styles.popupContainer}>
                  <View style={styles.popupContent}>
                    <Text>Enable Accident Detection</Text>
                    <Switch onValueChange={toggleSwitch} value={switchvalue} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        ) : (
          <Register
            accountActionButtonColor={styles.accountActionButtonColor}
            accountActionButton={styles.accountActionButton}
            inputFields={styles.inputFields}
            passwordInput={styles.passwordInput}
            inputPlaceholder={styles.inputPlaceholder}
            backToLogin={backToLogin}
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
    color: colors.greyColor,
    fontWeight: "900",
    fontSize: 30,
  },
  secondHeading: {
    textAlign: "center",
    color: colors.blueColor,
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
    width: wp("11%"),
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  showSignupFormButton: {
    width: wp("16%"),
    borderBottomColor: "black",
    borderBottomWidth: 2,
    fontWeight: "bold",
  },
  accountsButtonColor: {
    color: "#0165FF",
    fontWeight: "900",
  },
  disableAccountButtons: {
    color: colors.greyColor,
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
    backgroundColor: colors.blueColor,
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
  errorText: {
    color: "red",
    marginLeft: 10,
    width: wp("60%"),
    flexWrap: "wrap",
  },
});
export default Welcome;
