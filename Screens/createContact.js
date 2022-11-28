import React, { useEffect, useState, memo } from "react";
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

const Joi = require('joi-browser');


const CreateContact = ({ navigation, handleAddContact }) => {
  const [data, setData] = useState({
    name: "",
    number: "",
    address: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  // ------------------------------------------------------Handling Validations------------------------------------------------------
  const conditions = {
    name: Joi.string().min(3).required().label("Name"),
    number: Joi.string().min(11).max(11).required().label("Number"),
    address: Joi.string().min(5).required().label("Address"),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .label("Email"),
  };

  const schema = Joi.object(conditions);

  const submitContact = () => {
    const contact = {
      ...data,
    };
    contact.key =
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36);
    handleAddContact(contact);
    navigation.goBack("");
  };

  const handleContact = () => {
    const errors = handleErrors();
    setErrors(errors || {});
    if (errors) return;
    submitContact();
  };

  const handleErrors = () => {
    const contact = {
      ...data,
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

  // ------------------------------------------------------Rendering Content------------------------------------------------------
  return (
    <KeyBoardAvoidingWrapper>
      <View style={styles.container}>
        <Image
          style={styles.userPic}
          source={require("../assets/edit-user.png")}
        />
        <View style={styles.profileForm}>
          <View style={styles.profileInputs}>
            <View style={styles.parentIndividulFeild}>
              <View style={styles.inputFields}>
                <View style={styles.icon}>
                  <Feather name="user" size={30} color={colors.grey} />
                </View>
                <TextInput
                  name="name"
                  placeholder="Name"
                  style={styles.inputPlaceholder}
                  autoFocus={true}
                  value={data.name}
                  onChangeText={handleOnChange("name")}
                />
              </View>
              {errors.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
              ) : null}
            </View>
            <View style={styles.parentIndividulFeild}>
              <View style={styles.inputFields}>
                <View style={styles.icon}>
                  <Ionicons name="call-outline" size={30} color={colors.grey} />
                </View>
                <TextInput
                  name="number"
                  placeholder="Number"
                  style={styles.inputPlaceholder}
                  value={data.number}
                  onChangeText={handleOnChange("number")}
                />
              </View>
              {errors.number ? (
                <Text style={styles.errorText}>{errors.number}</Text>
              ) : null}
            </View>
            <View style={styles.parentIndividulFeild}>
              <View style={styles.inputFields}>
                <View style={styles.icon}>
                  <Ionicons
                    name="location-outline"
                    size={30}
                    color={colors.grey}
                  />
                </View>
                <TextInput
                  name="address"
                  placeholder="Address"
                  style={styles.inputPlaceholder}
                  value={data.address}
                  onChangeText={handleOnChange("address")}
                />
              </View>
              {errors.address ? (
                <Text style={styles.errorText}>{errors.address}</Text>
              ) : null}
            </View>
            <View style={styles.parentIndividulFeild}>
              <View style={styles.inputFields}>
                <View style={styles.icon}>
                  <AntDesign name="mail" size={28} color={colors.grey} />
                </View>
                <TextInput
                  name="email"
                  placeholder="Email"
                  style={styles.inputPlaceholder}
                  multiline={true}
                  value={data.email}
                  onChangeText={handleOnChange("email")}
                />
              </View>
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.appButtonCancel}
              onPress={() => navigation.navigate("Contacts")}
            >
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
    marginTop: 20,
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
  parentIndividulFeild: { marginBottom: 25 },
  inputFields: {
    flexDirection: "row",
    width: wp("80%"),
    flexWrap: "wrap",
    borderBottomColor: colors.grey,
    borderBottomWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginBottom: 8,
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
  errorText: {
    color: "red",
    marginLeft: 10,
    // flex: 1,
    width: wp("60%"),
    flexWrap: "wrap",
  },
});

export default memo(CreateContact);
