import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Button,
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import colors from "../Colors/colors";
import React, { useRef, useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { Accelerometer, Gyroscope } from "expo-sensors";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Drawer from "react-native-drawer";
import DrawerContent from "./drawerContent";

const Home = ({ navigation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const getUserLocation = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission not granted",
          "Allow the app to use location service.",
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
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
  const changeDrawerState = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Drawer
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      onOpen={() => setDrawerOpen(true)}
      type="overlay"
      content={
        <DrawerContent
          styles={styles}
          changeDrawerState={changeDrawerState}
          navigation={navigation}
        />
      }
      tapToClose={true}
      openDrawerOffset={0.2}
      panCloseMask={0.2}
      // closedDrawerOffset={-1}
      styles={drawerStyles}
      tweenHandler={(ratio) => ({
        main: { opacity: (2 - ratio) / 2 },
      })}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setDrawerOpen(!drawerOpen)}>
          <Ionicons name="arrow-back" size={30} color={colors.grey} />
        </TouchableOpacity>
        <MapView style={styles.map} region={location}>
          <Marker
            coordinate={location}
            title="My Location"
            description="This is where I am currently located"
          />
        </MapView>
      </View>
      <StatusBar style="auto" />
    </Drawer>
  );
};

const drawerStyles = {
  drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 },
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
