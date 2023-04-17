import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import colors from "../Colors/colors";
import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Accelerometer, Gyroscope, DeviceMotion } from "expo-sensors";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Drawer from "react-native-drawer";
import DrawerContent from "./drawerContent";
import styles from "./HomeStyle";
const MapboxAccessToken =
  "pk.eyJ1IjoiaGF5YW4yMzciLCJhIjoiY2xnbDlhd2Y4MGticTNzcXFnazllNnRwaCJ9.JOGi0VKwVN1pc7gjas-DTQ";
const Home = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);
  const [location, setLocation] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showWarningAert, setWarningAlert] = useState(false);
  const [showConfirmation, setConfirmation] = useState(false);
  const [acceleration, setAcceleration] = useState(null);
  const [accidentDetected, setAccidentDetected] = useState(false);
  const [timer, setTimer] = useState(0);
  const [cancelTimer, setCancelTimer] = useState(false);

  const getUserLocation = async () => {
    try {
      const backgroundPermission =
        await Location.requestForegroundPermissionsAsync();
      if (backgroundPermission.status === "granted") {
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeout: 20000,
        });
        console.log(currentLocation);
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setLoader(false);
      } else {
        console.log("Foreground location permission not granted");
      }
    } catch (error) {
      console.log(error.message);
      console.log("Error while getting location");
    }
  };

  const checkIfLocationOnRoad = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/matching/v5/mapbox/driving/${location.longitude},${location.latitude};${location.longitude},${location.latitude}?access_token=${MapboxAccessToken}`
      );
      console.log(response)
      const data = await response.json();
      const isOnRoad = data.matchings[0].confidence > 0.5;
      console.log("is on road");
      return isOnRoad;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    console.log("first useEffect");

    DeviceMotion.isAvailableAsync().then((isAvailable) => {
      console.log("rhis is true");
    });
    if (accidentDetected) return;
    getUserLocation();

    Accelerometer.setUpdateInterval(16);
    const accelerometerSubscription = Accelerometer.addListener(
      (accelerometerData) => {
        let overallAcceleration = Math.sqrt(
          Math.pow(accelerometerData.x, 2) +
            Math.pow(accelerometerData.y, 2) +
            Math.pow(accelerometerData.z, 2)
        );
        overallAcceleration = overallAcceleration / 9.8;
        console.log("AccelerometerData", overallAcceleration);
        setAcceleration(overallAcceleration);
      }
    );
    Gyroscope.addListener((gyroscopeData) => {
      console.log("gyroscopeData", gyroscopeData);
    });
    return () => {
      // accelerometerSubscription.remove();
      Gyroscope.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (acceleration > 0.18) {
      console.log("firstfirst");
      setTimer(5);
      getUserLocation();
      const isOnRoad = checkIfLocationOnRoad();
      if (isOnRoad) {
        setAccidentDetected(true);
        console.log("Accident detected");
      }
    }
  }, [acceleration]);

  useEffect(() => {
    console.log("second");

    setWarningAlert(true);
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setConfirmation(false);
      console.log(showConfirmation);
      setWarningAlert(false);
      if (!cancelTimer && acceleration) {
        console.log("csnace;");
        setConfirmation(true);
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const changeDrawerState = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
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
        closedDrawerOffset={-2}
        styles={styles.drawer}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 },
        })}
      >
        <View style={styles.container}>
          {loader ? (
            <ActivityIndicator
              size={100}
              color="#0165FF"
              style={styles.loaderStyle}
            />
          ) : (
            <View>
              <View>
                <TouchableOpacity
                  style={styles.drawerIcon}
                  onPress={() => setDrawerOpen(!drawerOpen)}
                >
                  <Ionicons name="menu" size={40} color={colors.grey} />
                </TouchableOpacity>
              </View>
              <MapView style={styles.map} region={location}>
                <Marker
                  coordinate={location}
                  title="My Location"
                  description="This is where I am currently located"
                />
              </MapView>
            </View>
          )}
        </View>
        <StatusBar style="auto" />
      </Drawer>
      {/*--------------------------------------------------------------------- Warning alert --------------------------------------------------*/}
      <Modal transparent={true} visible={showWarningAert}>
        <View style={styles.modalBackground}>
          <View style={styles.warningModalBody}>
            <View style={styles.warningModalDimension}>
              <View style={styles.warningModalTop}>
                <Ionicons name="warning-outline" size={24} color="black" />
                <Text style={styles.warnigHeading}>WARNING !</Text>
                <Ionicons name="warning-outline" size={24} color="black" />
              </View>
              <Text style={styles.warningMessageStyle}>Accident Detect</Text>
              <View style={styles.warningModalTimer}>
                <Text style={styles.warningMessageStyle}>{timer} </Text>
                <Entypo name="stopwatch" size={26} color="black" />
              </View>
              <Text>
                <Text>Press </Text>
                <Text style={{ fontWeight: "bold" }}>'CANCEL' </Text>
                <Text>to Abord Sending</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={styles.cancelWarningButton}
              onPress={() => {
                setCancelTimer(true);
                setTimer(0);
              }}
            >
              <Text style={styles.popButtons}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* -------------------------------------------------------------------End Warning Alert------------------------------------------------ */}

      {/*--------------------------------------------------------------------- Confirmation alert --------------------------------------------------*/}
      <Modal transparent={true} visible={showConfirmation}>
        <View style={styles.modalBackground}>
          <View style={styles.confirmModalBody}>
            <View style={styles.confirmModalDimension}>
              <Text style={{ textAlign: "center" }}>
                Ambulance is on its way {"\n"}Please wait and don't panic {"\n"}
                The help will arrive soon
              </Text>
            </View>
            <TouchableOpacity
              style={styles.confirmButtonBackgroud}
              onPress={() => setConfirmation(false)}
            >
              <Text style={styles.popButtons}>OKAY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/*--------------------------------------------------------------------- End Confirmation alert --------------------------------------------------*/}
    </>
  );
};

export default Home;
