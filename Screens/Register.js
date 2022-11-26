import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
  EvilIcons,
  Fontisto,
} from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Register = ({
  accountActionButtonColor,
  accountActionButton,
  inputFields,
  passwordInput,
  inputPlaceholder,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [show, setShow] = useState(true);
  const eyeButtonClicked = () => {
    setShow(!show);
  };
  const RegisterSubmit = () => {
    console.log("name", name);
  };
  return (
    <View style={styles.signupForm}>
      <View style={styles.singupInputs}>
        <View style={inputFields}>
          <Feather name="user" size={24} color="grey" />
          <TextInput
            placeholder="Name"
            style={inputPlaceholder}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={inputFields}>
          <MaterialCommunityIcons name="email-outline" size={24} color="grey" />
          <TextInput
            placeholder="Email Address"
            style={inputPlaceholder}
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        <View style={inputFields}>
          <MaterialIcons name="vpn-key" size={24} color="grey" />
          <TextInput
            placeholder="Password"
            style={passwordInput}
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
        <View style={inputFields}>
          <EvilIcons
            name="location"
            size={28}
            color="grey"
            style={{ marginLeft: -5 }}
          />
          <TextInput
            placeholder="Address"
            style={inputPlaceholder}
            onChangeText={(value) => setAddress(value)}
          />
        </View>
        <View style={inputFields}>
          <MaterialCommunityIcons
            name="gender-male-female"
            size={24}
            color="grey"
            style={{ marginLeft: -5 }}
          />
          <TextInput
            placeholder="Gender"
            style={inputPlaceholder}
            onChangeText={(value) => setGender(value)}
          />
        </View>
        <View style={inputFields}>
          <Fontisto
            name="blood-drop"
            size={24}
            color="grey"
            style={{ marginLeft: 1 }}
          />
          <TextInput
            placeholder="Blood Group"
            style={inputPlaceholder}
            onChangeText={(value) => setBloodGroup(value)}
          />
        </View>
      </View>
      <TouchableOpacity style={accountActionButton} onPress={RegisterSubmit}>
        <Text style={accountActionButtonColor}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  signupForm: {
    flexDirection: "column",
    alignItems: "center",
  },
  singupInputs: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: hp("45%"),
  },
});
