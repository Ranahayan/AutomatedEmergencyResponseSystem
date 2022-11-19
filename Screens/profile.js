import React from "react";
import colors from "../Colors/colors";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.userPic}
        source={require("../assets/user-pic.png")}
      />
      <View style={styles.profileForm}>
        <View style={styles.profileInputs}>
          <View style={styles.inputFields}>
            <TextInput
              placeholder="Name"
              style={styles.inputPlaceholder}
              value="Hayan"
              editable={false}
            />
          </View>
          <View style={styles.inputFields}>
            <TextInput
              placeholder="Address"
              style={styles.inputPlaceholder}
              value="Lahore"
              editable={false}
            />
          </View>
          <View style={styles.inputFields}>
            <TextInput
              placeholder="Gender"
              style={styles.inputPlaceholder}
              value="Male"
              editable={false}
            />
          </View>
          <View style={styles.inputFields}>
            <TextInput
              placeholder="Blood Group"
              style={styles.inputPlaceholder}
              value="Blood Group"
              editable={false}
            />
          </View>
          <View style={styles.inputFields}>
            <TextInput
              placeholder="Email Address"
              style={styles.inputPlaceholder}
              value="abdulhayan1220@gmail.com"
              editable={false}
            />
          </View>
          <View style={styles.inputFields}>
            <TextInput
              placeholder="Password"
              style={styles.inputPlaceholder}
              value="Hayan123@"
              editable={false}
            />
          </View>
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
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 40,
  },
  inputPlaceholder: {
    fontSize: 18,
    marginLeft: 5,
    color: 'black'
  },
});

export default Profile;
