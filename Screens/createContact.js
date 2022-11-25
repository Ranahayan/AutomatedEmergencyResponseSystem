import React, { useEffect, useState } from "react";
import colors from "../Colors/colors";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import KeyBoardAvoidingWrapper from "../keyboardAvoidingWrapper";
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Joi = require("joi");

const CreateContact = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const [contacts, setContacts] = useState([
    {
      key: 1,
      name: "Hayan",
      number: "03142567710",
      email: "bjbnhkh12hv20@gmail.com",
      address: "Lahore",
    },
    {
      key: 2,
      name: "faisal",
      number: "03142523510",
      email: "faisal123@gmail.com",
      address: "okara",
    },
    {
      key: 3,
      name: "ehtsham",
      number: "03106767710",
      email: "ehtsham876@gmail.com",
      address: "pasroor",
    },
    {
      key: 4,
      name: "Dansih",
      number: "03142501710",
      email: "Dansih975@gmail.com",
      address: "Hafizabad",
    },
    {
      key: 5,
      name: "ehtsham",
      number: "03106767710",
      email: "ehtsham876@gmail.com",
      address: "pasroor",
    },
  ]);

  const handleName = (val) => {
    console.log(val);
    setName(val);
  };

  const handleNumber = (value) => {
    setNumber(value);
  };

  const handleAddress = (value) => {
    setAddress(value);
  };

  const handleEmail = (value) => {
    setEmail(value);
  };

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    number: Joi.string().min(11).max(11).required(),
    address: Joi.string().min(3).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  const submitContact = () => {
    const contact = {
      name,
      number,
      address,
      email,
    };
    contact.key =
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36);

    const contactList = [...contacts, contact];
    setContacts(contactList);
  };

  const handleContact = () => {
    const errors = handleErrors();
    setErrors(errors);
    if (errors) return;
    submitContact();
  };

  const handleErrors = () => {
    const contact = {
      name,
      number,
      address,
      email,
    };
    const { error } = schema.validate(contact, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  return (
    <KeyBoardAvoidingWrapper>
      <View style={styles.container}>
        <Image
          style={styles.userPic}
          source={require("../assets/edit-user.png")}
        />
        <View style={styles.profileForm}>
          <View style={styles.profileInputs}>
            <View style={styles.inputFields}>
              <View style={styles.icon}>
                <Feather name="user" size={30} color={colors.grey} />
              </View>
              <TextInput
                placeholder="Name"
                style={styles.inputPlaceholder}
                autoFocus={true}
                value={name}
                onChangeText={handleName}
              />
            </View>
            <View style={styles.inputFields}>
              <View style={styles.icon}>
                <Ionicons name="call-outline" size={30} color={colors.grey} />
              </View>
              <TextInput
                placeholder="Number"
                style={styles.inputPlaceholder}
                value={number}
                onChangeText={handleNumber}
              />
            </View>
            <View style={styles.inputFields}>
              <View style={styles.icon}>
                <Ionicons
                  name="location-outline"
                  size={30}
                  color={colors.grey}
                />
              </View>
              <TextInput
                placeholder="Address"
                style={styles.inputPlaceholder}
                value={address}
                onChangeText={handleAddress}
              />
            </View>
            <View style={styles.inputFields}>
              <View style={styles.icon}>
                <AntDesign name="mail" size={28} color={colors.grey} />
              </View>
              <TextInput
                placeholder="Email"
                style={styles.inputPlaceholder}
                multiline={true}
                value={email}
                onChangeText={handleEmail}
              />
            </View>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.appButtonCancel}>
              <Text style={styles.appInButtonCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.appButtonSave}
              onPress={handleContact}
            >
              <Text style={styles.appInButtonSave}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </KeyBoardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  userPic: {
    marginTop: 50,
    height: hp("20%"),
    width: wp("38%"),
  },
  profileForm: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10%",
  },
  profileInputs: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  inputFields: {
    flexDirection: "row",
    width: wp("80%"),
    borderBottomColor: colors.grey,
    borderBottomWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginBottom: 30,
  },
  inputPlaceholder: {
    fontSize: 18,
    marginLeft: 5,
    color: colors.grey,
    width: wp("64%"),
  },
  icon: {
    alignSelf: "center",
    marginRight: 5,
    marginLeft: 5,
  },
  mainName: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 30,
  },
  buttons: {
    flexDirection: "row",
    width: wp("100%"),
    justifyContent: "flex-end",
    marginVertical: 30,
  },
  appButtonCancel: {
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: colors.grey,
    borderWidth: 2,
    marginRight: 15,
  },
  appButtonSave: {
    backgroundColor: "#0165FF",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
    borderRadius: 30,
  },
  appInButtonCancel: {
    fontSize: 18,
    color: colors.grey,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  appInButtonSave: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
});

export default CreateContact;
