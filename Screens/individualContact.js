import React, { useEffect, useState, memo, useContext } from "react";
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
import axios from "axios";
import { IP_ADDRESS } from "@env";
import { Data } from "../Context_api/Context";
const Joi = require("joi-browser");

const IndividualContact = ({
  navigation,
  route,
  editFlag,
  setEditFlag,
  handleEditContact,
}) => {
  const [data, setData] = useState({
    name: "",
    number: "",
    address: "",
    email: "",
  });
  const { account } = useContext(Data);
  const [errors, setErrors] = useState({});
  const { constactId } = route.params;
  const [edit, setEdit] = useState(false);
  const [contacts, setContacts] = useState([]);
  const getContacts = async () => {
    try {
      let response = await axios.get(
        `http://192.168.8.158:8080/contact/${account._id}`
      );
      // console.log("Response of individual Contact: ", response.data);
      setContacts(response.data);
      console.log("contact_id", constactId);
      const newContacts = [...response.data];
      const index = newContacts.findIndex(
        (contact) => contact._id === constactId
      );
      let contact = { ...newContacts[index] };
      delete contact.key;
      setData(contact);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getContacts();
  }, []);
  useEffect(() => {
    editFlag && setEdit(true);
  }, [editFlag]);

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

  // ------------------------------------------------------Handling Validations------------------------------------------------------
  const schema = Joi.object(conditions);

  const submitContact = async () => {
    // const contact = {
    //   key: constactId,
    //   ...data,
    // };
    const { __v, _id, ...newObject } = data;
    console.log(newObject);
    console.log("indivdual contact: ", newObject);
    // handleEditContact(constactId, contact);

    try {
      let response = await axios.put(
        `http://192.168.8.158:8080/contact/${data._id}`,
        newObject
      );
      navigation.goBack("");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleContact = () => {
    const errors = handleErrors();
    console.log(errors);
    setErrors(errors || {});
    if (errors) return;
    submitContact();
  };

  const handleErrors = () => {
    const { __v, _id, userId, ...contact } = data;

    console.log("first: ", contact);
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
    else delete newErrors[name] && newErrors[name];
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
          source={require("../assets/edit-user.png")}
        />
        <View style={styles.profileForm}>
          {!edit && (
            <Text style={styles.mainName}>
              {String(data.name).charAt(0).toUpperCase() +
                String(data.name).slice(1)}
            </Text>
          )}
          <View style={styles.profileInputs}>
            {edit && (
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
                    editable={edit}
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
                  <Ionicons name="call-outline" size={30} color={colors.grey} />
                </View>
                <TextInput
                  name="number"
                  placeholder="Number"
                  style={styles.inputPlaceholder}
                  value={data.number}
                  onChangeText={handleOnChange("number")}
                  editable={edit}
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
                  editable={edit}
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
                  editable={edit}
                />
              </View>
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>
          </View>
          {edit && (
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.appButtonCancel}
                onPress={() => {
                  setEditFlag(false);
                  navigation.goBack();
                }}
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
    borderBottomColor: colors.grey,
    borderBottomWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginBottom: 8,
  },
  inputPlaceholder: {
    fontSize: 18,
    marginLeft: 5,
    color: "#000000",
    width: wp("72%"),
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
    width: wp("60%"),
    flexWrap: "wrap",
  },
});

export default IndividualContact;
