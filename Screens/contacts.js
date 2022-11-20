import React, { useState } from "react";
import colors from "../Colors/colors";
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  Text,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const Contact = () => {
  const [contacts, setContacts] = useState([
    {
      name: "Hayan",
      number: "03142567710",
      email: "abdulhayan1220@gmail.com",
      address: "Lahore",
    },
    {
      name: "faisal",
      number: "03142523510",
      email: "faisal123@gmail.com",
      address: "okara",
    },
    {
      name: "ehtsham",
      number: "03106767710",
      email: "ehtsham876@gmail.com",
      address: "pasroor",
    },
    {
      name: "Dansih",
      number: "03142501710",
      email: "Dansih975@gmail.com",
      address: "Hafizabad",
    },
  ]);
  const name = "hayan";
  return (
    <View style={styles.container}>
      <Image
        style={styles.userPic}
        source={require("../assets/add-user.png")}
      />
      <View style={styles.profileForm}>
        <View style={styles.profileInputs}>
          <FlatList
            data={contacts}
            renderItem={({ item }) => (
              <View style={styles.inputFields}>
                <View style={styles.nameInitial}>
                  <Text style={styles.nameInitialText}>
                    {item.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <TextInput
                  placeholder="Name"
                  style={styles.inputPlaceholder}
                  value={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  editable={false}
                />
              </View>
            )}
          />
          {/* <View style={styles.inputFields}>
            <View style={styles.nameInitial}>
              <Text style={styles.nameInitialText}>
                {name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <TextInput
              placeholder="Name"
              style={styles.inputPlaceholder}
              value={name.charAt(0).toUpperCase() + name.slice(1)}
              editable={false}
            />
          </View> */}
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    // justifyContent: "center",
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
    height: hp("8%"),
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  inputPlaceholder: {
    fontSize: 20,
    marginLeft: 5,
    color: colors.grey,
    marginLeft: 10,
    fontWeight: "500",
  },
  nameInitial: {
    width: 42,
    height: 42,
    borderRadius: 42 / 2,
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    marginLeft: 10,
  },
  nameInitialText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    color: colors.grey,
  },
});

export default Contact;
