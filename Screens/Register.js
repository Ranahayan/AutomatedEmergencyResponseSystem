import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
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
import colors from "../Colors/colors";
const Register = ({
  accountActionButtonColor,
  inputFields,
  passwordInput,
  inputPlaceholder,
  backToLogin
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [show, setShow] = useState(true);
  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
  ];
  const eyeButtonClicked = () => {
    setShow(!show);
  };
  const RegisterSubmit = () => {
    console.log("gender", gender);
    console.log("Blood Group", bloodGroup);
    backToLogin();
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
        <View style={styles.pickerInput}>
          <MaterialCommunityIcons
            name="gender-male-female"
            size={24}
            color="grey"
            style={{ marginLeft: -5 }}
          />
          <View style={{ width: wp("75%") }}>
            <Picker
              onValueChange={(Value, Index) => setGender(Value)}
              selectedValue={gender}
            >
              <Picker.Item label="Male" value="Male" color="grey"></Picker.Item>
              <Picker.Item
                label="Female"
                value="Female"
                color="grey"
              ></Picker.Item>
            </Picker>
          </View>
        </View>
        <View style={styles.valuePicker}></View>
        <View style={styles.pickerInput}>
          <Fontisto
            name="blood-drop"
            size={24}
            color="grey"
            style={{ marginLeft: 1 }}
          />
          <View style={{ marginLeft: 3, width: wp("75%") }}>
            <Picker
              onValueChange={(Value, Index) => setBloodGroup(Value)}
              selectedValue={bloodGroup}
            >
              <Picker.Item label="A+" value="A+" color="grey"></Picker.Item>
              <Picker.Item label="O+" value="O+" color="grey"></Picker.Item>
              <Picker.Item label="B+" value="B+" color="grey"></Picker.Item>
              <Picker.Item label="AB+" value="AB+" color="grey"></Picker.Item>
              <Picker.Item label="A-" value="A-" color="grey"></Picker.Item>
              <Picker.Item label="O-" value="O-" color="grey"></Picker.Item>
              <Picker.Item label="B-" value="B-" color="grey"></Picker.Item>
              <Picker.Item label="AB-" value="AB-" color="grey"></Picker.Item>
            </Picker>
          </View>
        </View>
        <View style={styles.valuePicker}></View>
      </View>
      <TouchableOpacity
        style={styles.accountActionButton}
        onPress={RegisterSubmit}
      >
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
    marginTop: 10,
  },
  singupInputs: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: hp("45%"),
  },
  pickerInput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -10,
  },
  valuePicker: {
    marginTop: -32,
    width: wp("80%"),
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  accountActionButton: {
    backgroundColor: "#0165FF",
    width: wp("80%"),
    height: hp("6%"),
    borderRadius: 20,
    marginTop: 40,
  },
});
