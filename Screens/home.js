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
import React, { useRef, useState, useEffect } from "react";
import colors from "../Colors/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { Accelerometer, Gyroscope } from "expo-sensors";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const Home = () => {
  const drawer = useRef(null);
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const getUserLocation = async () => {
    try {
      // let { status } = await Location.requestPermissionsAsync();
      // if (status !== "granted") {
      //   Alert.alert(
      //     "Permission not granted",
      //     "Allow the app to use location service.",
      //     [{ text: "OK" }],
      //     { cancelable: false }
      //   );
      // }
      const currenLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 20000,
      });
      console.log(currenLocation);
      setLocation({
        latitude: currenLocation.coords.latitude,
        longitude: currenLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.log(error.message);
      console.log("error");
    }
  };

  useEffect(() => {
    getUserLocation();
    // const accelerometerSubscription=Accelerometer.addListener(accelerometerData=>{
    //   console.log(accelerometerData);
    // })
    // const gyroscopeSubscription=Gyroscope.addListener(gyroscopeData=>{
    //   console.log("gyroscopeData",gyroscopeData);
    // })
  }, []);

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
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}
    >
      <View style={styles.container}>
        <MapView style={styles.map} region={location}>
          <Marker
            coordinate={location}
            title="My Location"
            description="This is where I am currently located"
          />
        </MapView>
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

  map: {
    width: "100%",
    height: "100%",
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
