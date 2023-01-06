import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import colors from "../Colors/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [flag, setFlag] = useState(false);
  const drawer = useRef(null);
  console.log("first");
  const navigation = useNavigation();
  const drawertemp = drawer;

  const navigationView = () => (
    <View style={styles.container}>
      <View style={styles.drawerBack}>
        <TouchableOpacity onPress={() => drawer.current.closeDrawer()}>
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
                drawer.current.closeDrawer();
                navigation.navigate("Profile");
                console.log(drawer);
                setFlag(true);
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

  return (
    <DrawerLayoutAndroid
      ref={!flag ? drawer : drawertemp}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}
    >
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Swipe from the side or press button below to see it!
        </Text>
        <Button
          title="Open drawer"
          onPress={() => {
            // drawer =
            drawer.current.openDrawer();
            console.log(drawer);
          }}
        />
      </View>
      <StatusBar style="auto" />
    </DrawerLayoutAndroid>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
  userPic: {
    marginTop: 20,
    height: hp("20%"),
    width: wp("38%"),
  },
  profileForm: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
    width: wp("60%"),
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  inputPlaceholder: {
    fontSize: 18,
    color: "black",
    width: wp("50%"),
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
  icon: {
    width: wp("7%"),
  },
  drawerBack: {
    flexDirection: "row",
    width: wp("65%"),
    paddingTop: 10,
  },
});
export default Home;
