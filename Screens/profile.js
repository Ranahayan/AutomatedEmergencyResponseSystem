import React, { useEffect, useRef, useState } from "react";
import colors from "../Colors/colors";
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Fontisto,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import KeyBoardAvoidingWrapper from "../keyboardAvoidingWrapper";

const Joi = require("joi-browser");

const Profile = ({
  navigation,
  user,
  editProfileFlag,
  setEditprofileFlag,
  setUser,
}) => {
  const inputElement = useRef(null);
  const [data, setData] = useState({
    name: "",
    address: "",
    gender: "",
    bloodGroup: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setData(user);
  }, []);

  // ------------------------------------------------------Handling Validations------------------------------------------------------
  const conditions = {
    name: Joi.string().min(3).required().label("Name"),
    address: Joi.string().min(5).required().label("Address"),
    gender: Joi.string().min(4).max(11).required().label("Gender"),
    bloodGroup: Joi.string().min(2).max(3).required().label("Blood Group"),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .label("Email"),
  };

  const schema = Joi.object(conditions);

  const submitUser = () => {
    const user = {
      ...data,
    };
    setUser(user);
    setEditprofileFlag(false);
    navigation.goBack("");
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
  return (
    <KeyBoardAvoidingWrapper>
      <View style={styles.container}>
        <Image
          style={styles.userPic}
          source={require("../assets/user-pic.png")}
        />
        <View style={styles.profileForm}>
          <View style={styles.profileInputs}>
            {!editProfileFlag && (
              <View style={styles.parentIndividulFeild}>
                <View style={styles.inputFields}>
                  <View style={styles.icon}>
                    <Feather name="user" size={25} color={colors.grey} />
                  </View>
                  <TextInput
                    placeholder="Name"
                    style={styles.inputPlaceholder}
                    value={data.name}
                    editable={editProfileFlag}
                    onChangeText={handleOnChange("name")}
                    focus={editProfileFlag}
                  />
                </View>
                {errors.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}
              </View>
            )}
            {editProfileFlag && (
              <View style={styles.parentIndividulFeild}>
                <View style={styles.inputFields}>
                  <View style={styles.icon}>
                    <Feather name="user" size={25} color={colors.grey} />
                  </View>
                  <TextInput
                    autoFocus={true}
                    placeholder="Name"
                    style={styles.inputPlaceholder}
                    value={data.name}
                    editable={editProfileFlag}
                    onChangeText={handleOnChange("name")}
                  />
                </View>
                {errors.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}
              </View>
            )}
            <View style={styles.parentIndividulFeild}>
              <View style={styles.inputFields}>
                <View style={styles.icon}>
                  <Entypo name="address" size={25} color={colors.grey} />
                </View>
                <TextInput
                  placeholder="Address"
                  style={styles.inputPlaceholder}
                  value={data.address}
                  editable={editProfileFlag}
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
                  <FontAwesome5
                    name="transgender"
                    size={25}
                    color={colors.grey}
                  />
                </View>
                <TextInput
                  placeholder="Gender"
                  style={styles.inputPlaceholder}
                  value={data.gender}
                  editable={editProfileFlag}
                  onChangeText={handleOnChange("gender")}
                />
              </View>
              {errors.gender ? (
                <Text style={styles.errorText}>{errors.gender}</Text>
              ) : null}
            </View>
            <View style={styles.parentIndividulFeild}>
              <View style={styles.inputFields}>
                <View style={styles.icon}>
                  <Fontisto name="blood-drop" size={25} color={colors.grey} />
                </View>
                <TextInput
                  placeholder="Blood Group"
                  style={styles.inputPlaceholder}
                  value={data.bloodGroup}
                  editable={editProfileFlag}
                  onChangeText={handleOnChange("bloodGroup")}
                />
              </View>
              {errors.bloodGroup ? (
                <Text style={styles.errorText}>{errors.bloodGroup}</Text>
              ) : null}
            </View>
            <View style={styles.parentIndividulFeild}>
              <View style={styles.inputFields}>
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={25}
                    color={colors.grey}
                  />
                </View>
                <TextInput
                  placeholder="Email Address"
                  style={styles.inputPlaceholder}
                  value={data.email}
                  editable={editProfileFlag}
                  onChangeText={handleOnChange("email")}
                />
              </View>
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>
          </View>
          {editProfileFlag && (
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.appButtonCancel}
                onPress={() => {
                  setEditprofileFlag(false);
                  navigation.goBack();
                }}
              >
                <Text style={styles.appInButtonCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.appButtonSave}
                onPress={handleUser}
              >
                <Text style={styles.appInButtonSave}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <StatusBar style="auto" />
      </View>
    </KeyBoardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  parentIndividulFeild: { marginBottom: 25 },

  profileInputs: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  inputFields: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("80%"),
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  inputPlaceholder: {
    fontSize: 18,
    marginLeft: 5,
    color: "black",
    width: wp("72%"),
  },
  errorText: {
    color: "red",
    marginLeft: 10,
    width: wp("60%"),
    flexWrap: "wrap",
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

export default Profile;
