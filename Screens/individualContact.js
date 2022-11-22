import React, { useEffect, useState } from "react";
import colors from "../Colors/colors";
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  Text,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import KeyBoardAvoidingWrapper from "../keyboardAvoidingWrapper";
const IndividualContact = ({ navigation, route }) => {
  const { constactId, editFlag } = route.params;
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
});

export default IndividualContact;
