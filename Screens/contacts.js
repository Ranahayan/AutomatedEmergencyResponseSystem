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
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const Contact = ({ navigation }) => {
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
  const renderContact = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log("first");
        navigation.navigate("Individual Contact", { constactId: item.key });
      }}
    >
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
    </TouchableOpacity>
  );
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
            showsVerticalScrollIndicator={false}
            renderItem={renderContact}
          />
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
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10%",
  },
  profileInputs: {
    flex: 1,
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
