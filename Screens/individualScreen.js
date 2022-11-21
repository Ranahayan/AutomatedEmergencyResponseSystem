import React, { useState } from "react";
import colors from "../Colors/colors";
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Fontisto,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import KeyBoardAvoidingWrapper from "../keyboardAvoidingWrapper";
const IndividualContact = () => {
  const [contacts, setContacts] = useState([
    {
      key: 1,
      name: "Hayan",
      number: "03142567710",
      email: "abdulhayan1220@gmail.com",
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
  return (
    <KeyBoardAvoidingWrapper>
      <View style={styles.container}>
        <Image
          style={styles.userPic}
          source={require("../assets/edit-user.png")}
        />
        <View style={styles.profileForm}>
          <View style={styles.profileInputs}>
            <View style={styles.individualInput}>
              <View style={styles.icon}>
                <Feather name="user" size={35} color={colors.grey} />
              </View>
              <View style={styles.inputFields}>
                <TextInput placeholder="Name" style={styles.inputPlaceholder} />
              </View>
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
    alignItems: "center",
    width: wp("80%"),
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
  },
  individualInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputPlaceholder: {
    fontSize: 18,
    marginLeft: 5,
    color: "black",
    width: "100%",
  },
  icon: {
    alignSelf: "center",
    marginRight: 5,
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

export default IndividualContact;
