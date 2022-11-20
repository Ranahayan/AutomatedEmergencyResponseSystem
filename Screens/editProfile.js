import React from "react";
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
const EditProfile = () => {
  return (
    <KeyBoardAvoidingWrapper>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                  <TextInput
                    placeholder="Name"
                    style={styles.inputPlaceholder}
                  />
                </View>
              </View>
              <View style={styles.individualInput}>
                <View style={styles.icon}>
                  <Entypo name="address" size={35} color={colors.grey} />
                </View>

                <View style={styles.inputFields}>
                  <TextInput
                    placeholder="Address"
                    style={styles.inputPlaceholder}
                  />
                </View>
              </View>
              <View style={styles.individualInput}>
                <View style={styles.icon}>
                  <FontAwesome
                    name="genderless"
                    size={35}
                    color={colors.grey}
                  />
                </View>
                <View style={styles.inputFields}>
                  <TextInput
                    placeholder="Gender"
                    style={styles.inputPlaceholder}
                  />
                </View>
              </View>

              <View style={styles.individualInput}>
                <View style={styles.icon}>
                  <Fontisto name="blood-drop" size={35} color={colors.grey} />
                </View>
                <View style={styles.inputFields}>
                  <TextInput
                    placeholder="Blood Group"
                    style={styles.inputPlaceholder}
                  />
                </View>
              </View>

              <View style={styles.individualInput}>
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={35}
                    color={colors.grey}
                  />
                </View>
                <View style={styles.inputFields}>
                  <TextInput
                    placeholder="Email Address"
                    style={styles.inputPlaceholder}
                  />
                </View>
              </View>

              <View style={styles.individualInput}>
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name="key-outline"
                    size={35}
                    color={colors.grey}
                  />
                </View>
                <View style={styles.inputFields}>
                  <TextInput
                    placeholder="Password"
                    style={styles.inputPlaceholder}
                  />
                </View>
              </View>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.appButtonCancel}>
                <Text style={styles.appInButtonCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.appButtonSave}>
                <Text style={styles.appInButtonSave}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
          <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>
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
    marginVertical: 30
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

export default EditProfile;
