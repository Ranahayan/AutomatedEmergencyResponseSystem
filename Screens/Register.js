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
const Joi = require("joi-browser");

const Register = ({
  accountActionButtonColor,
  inputFields,
  passwordInput,
  inputPlaceholder,
  backToLogin,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [show, setShow] = useState(true);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    gender: "",
    bloodGroup: "",
  });

  const [errors, setErrors] = useState({});

  // ------------------------------------------------------Handling Validations------------------------------------------------------
  const conditions = {
    name: Joi.string().min(3).required().label("Name"),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .label("Email"),
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).*$/)
      .required()
      .label("Password")
      .error(() => {
        return {
          message:
            "Pssword should be minimum length of 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character",
        };
      }),
    address: Joi.string().min(5).required().label("Address"),
    gender: Joi.string().required().label("Gender"),
    bloodGroup: Joi.string().required().label("Blood Group"),
  };

  const schema = Joi.object(conditions);

  const submitUser = () => {
    const user = {
      ...data,
    };
    console.log("user");

    console.log(user);
    // user.key =
    //   Math.random().toString(36).substring(2) +
    //   new Date().getTime().toString(36);
    // handleAddUser(user);
    // navigation.goBack("");
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
  };

  const handleOnSaveErrors = (value, name) => {
    const toBeValidate = { [name]: value };
    const OnSaveSchema = Joi.object({ [name]: conditions[name] });
    const { error } = OnSaveSchema.validate(toBeValidate);
    return error ? error.details[0].message : null;
  };

  const eyeButtonClicked = () => {
    setShow(!show);
  };

  return (
    <View style={styles.signupForm}>
      <View style={styles.singupInputs}>
        <View style={styles.feildContainer}>
          <View style={inputFields}>
            <Feather name="user" size={24} color="grey" />
            <TextInput
              placeholder="Name"
              style={inputPlaceholder}
              value={data.name}
              onChangeText={handleOnChange("name")}
            />
          </View>
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}
        </View>

        <View style={styles.feildContainer}>
          <View style={inputFields}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="grey"
            />
            <TextInput
              placeholder="Email Address"
              style={inputPlaceholder}
              value={data.email}
              onChangeText={handleOnChange("email")}
            />
          </View>
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
        </View>

        <View style={styles.feildContainer}>
          <View style={inputFields}>
            <MaterialIcons name="vpn-key" size={24} color="grey" />
            <TextInput
              placeholder="Password"
              style={passwordInput}
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

        <View style={styles.feildContainer}>
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
              value={data.address}
              onChangeText={handleOnChange("address")}
            />
          </View>
          {errors.address ? (
            <Text style={styles.errorText}>{errors.address}</Text>
          ) : null}
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
              onValueChange={handleOnChange("gender")}
              selectedValue={data.gender}
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
              onValueChange={handleOnChange("bloodGroup")}
              selectedValue={data.bloodGroup}
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
      <TouchableOpacity style={styles.accountActionButton} onPress={handleUser}>
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
  errorText: {
    color: "red",
    marginLeft: 10,
    // flex: 1,
    width: wp("60%"),
    flexWrap: "wrap",
  },
});
