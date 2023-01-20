import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import colors from "../Colors/colors";
import React from "react";

export default function DrawerContent({
  styles,
  changeDrawerState,
  navigation,
}) {
  return (
    <View style={thisStyles.container}>
      <View style={styles.drawerBack}>
        <TouchableOpacity onPress={() => changeDrawerState()}>
          <Ionicons name="arrow-back" size={30} color={colors.grey} />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.userPic}
        source={require("../assets/user-pic.png")}
      />
      <View style={styles.profileForm}>
        <View style={styles.profileInputs}>
          <View style={styles.parentIndividulFeild}>
            <TouchableOpacity
              style={styles.inputFields}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <View style={styles.icon}>
                <FontAwesome name="user" size={27} color={colors.grey} />
              </View>
              <TextInput
                placeholder="Name"
                style={styles.inputPlaceholder}
                value={"Profile"}
                editable={false}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.parentIndividulFeild}>
            <TouchableOpacity
              style={styles.inputFields}
              onPress={() => navigation.navigate("Contacts")}
            >
              <View style={styles.icon}>
                <FontAwesome name="users" size={22} color={colors.grey} />
              </View>
              <TextInput
                placeholder="Contacts"
                style={styles.inputPlaceholder}
                value={"Contact List"}
                editable={false}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.parentIndividulFeild}>
            <TouchableOpacity style={styles.inputFields}>
              <View style={styles.icon}>
                <FontAwesome5 name="ambulance" size={21} color={colors.grey} />
              </View>
              <TextInput
                placeholder="Request Emergency"
                style={styles.inputPlaceholder}
                value={"Request Emergency"}
                editable={false}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.parentIndividulFeild}>
            <TouchableOpacity style={styles.inputFields}>
              <View style={styles.icon}>
                <SimpleLineIcons name="logout" size={22} color={colors.grey} />
              </View>
              <TextInput
                placeholder="Logout"
                style={styles.inputPlaceholder}
                value={"Logout"}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const thisStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
});
