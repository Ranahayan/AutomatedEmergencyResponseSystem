import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Modal,
  AppState,
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
  "pk.eyJ1IjoiaGF5YW4yMzciLCJhIjoiY2xoMzdjcWpkMTBvdDNkb2g5c2w2eWFwdyJ9.rrOhnjh45HPyEQ2c-jTISQ";

import * as TaskManager from "expo-task-manager";
const ACCELEROMETER_TASK_NAME = "accelerometerTask";

TaskManager.defineTask(ACCELEROMETER_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log("Accelerometer task encountered an error:", error);
    return;
  }
  if (data) {
    const { x, y, z } = data.accelerometerData;
    let overallAcceleration =
      Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)) / 9.8;
    console.log("AccelerometerData", overallAcceleration);
  }
});

const Home = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);
  const [location, setLocation] = useState({
    longitude: 74.35016962092465,
    latitude: 31.578248288521614,
  });
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
    const url = `https://api.mapbox.com/matching/v5/mapbox/driving/${location.longitude},${location.latitude};${location.longitude},${location.latitude}?access_token=${MapboxAccessToken}`;
    let isOnRoad = false;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Check if user is on the road
        console.log("data recieved is: ", data);
        console.log(data);
        if (data.code === "Ok") {
          isOnRoad = true;
        }
      })
      .catch((error) => {});
    return isOnRoad;
  };

  const startAccelerometerTask = async () => {
    const taskRegistered = await TaskManager.isTaskRegisteredAsync(
      ACCELEROMETER_TASK_NAME
    );
    if (taskRegistered) {
      console.log(`Task ${ACCELEROMETER_TASK_NAME} is already registered.`);
      return;
    }
    try {
      await TaskManager.getRegisteredTasksAsync([
        {
          taskName: ACCELEROMETER_TASK_NAME,
          options: {
            accelerometerData: {},
            interval: 1000,
          },
        },
      ]);
      console.log(`Task ${ACCELEROMETER_TASK_NAME} registered.`);
    } catch (err) {
      console.log(`Failed to register task ${ACCELEROMETER_TASK_NAME}.`, err);
    }
  };

  const stopAccelerometerTask = async () => {
    try {
      await TaskManager.unregisterTaskAsync(ACCELEROMETER_TASK_NAME);
      console.log(`Task ${ACCELEROMETER_TASK_NAME} unregistered.`);
    } catch (err) {
      console.log(`Failed to unregister task ${ACCELEROMETER_TASK_NAME}.`, err);
    }
  };

  useEffect(() => {
    console.log("First useEffect");
    if (accidentDetected) return;
    getUserLocation();
    startAccelerometerTask();
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

    return () => {
      console.log("Component unmounted.");
      accelerometerSubscription.remove();
      // stopAccelerometerTask();
    };
  }, []);

  // useEffect(() => {
  //   console.log("Background effect");

  //   return () => {
  //     TaskManager.unregisterTaskAsync(ACCELEROMETER_TASK_NAME);
  //   };
  // }, []);

  useEffect(() => {
    const checkAccidentDetection = async () => {
      if (acceleration && acceleration > 0.12) {
        await getUserLocation();
        console.log("Got hit by something");
        const isOnRoad = checkIfLocationOnRoad();
        console.log("Location on road: ", isOnRoad);
        if (isOnRoad === true) {
          setAccidentDetected(true);
          Accelerometer.removeAllListeners();
          console.log("Accident detected");
          setTimer(5);
        }
      }
    };
    checkAccidentDetection();
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
            <TouchableOpaciuty
              style={styles.cancelWarningButton}
              onPress={() => {
                setCancelTimer(true);
                setTimer(0);
              }}
            >
              <Text style={styles.popButtons}>CANCEL</Text>
            </TouchableOpaciuty>
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
