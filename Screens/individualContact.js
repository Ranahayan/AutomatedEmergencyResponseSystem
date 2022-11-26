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

const IndividualContact = ({ navigation, route, contacts }) => {
  const { constactId, editFlag } = route.params;

  const [contact, setContact] = useState({});
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const contact = contacts.find((contact) => contact.key === constactId);
    setContact(contact);
  }, []);

  useEffect(() => {
    editFlag && setEdit(true);
  }, [editFlag]);

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
              {String(contact.name).charAt(0).toUpperCase() +
                String(contact.name).slice(1)}
            </Text>
          )}
          <View style={styles.profileInputs}>
            {edit && (
              <View style={styles.inputFields}>
                <View style={styles.icon}>
                  <Feather name="user" size={30} color={colors.grey} />
                </View>
                <TextInput
                  placeholder="Name"
                  style={styles.inputPlaceholder}
                  value={contact.name}
                  editable={edit ? true : false}
                  autoFocus={true}
                />
              </View>
            )}
            <View style={styles.inputFields}>
              <View style={styles.icon}>
                <Ionicons name="call-outline" size={30} color={colors.grey} />
              </View>
              <TextInput
                placeholder="Number"
                style={styles.inputPlaceholder}
                value={contact.number}
                editable={edit ? true : false}
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
                value={contact.address}
                editable={edit ? true : false}
              />
            </View>
            <View style={styles.inputFields}>
              <View style={styles.icon}>
                <AntDesign name="mail" size={28} color={colors.grey} />
              </View>
              <TextInput
                placeholder="Email"
                style={styles.inputPlaceholder}
                value={contact.email}
                multiline={true}
                editable={edit ? true : false}
              />
            </View>
          </View>
          {edit && (
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.appButtonCancel}>
                <Text style={styles.appInButtonCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.appButtonSave}>
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

export default memo(IndividualContact);
