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
import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Accelerometer } from "expo-sensors";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Drawer from "react-native-drawer";
import DrawerContent from "./drawerContent";
import styles from "./HomeStyle";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { firestore } from "../firebase";
import { collection, addDoc, GeoPoint, Timestamp } from "firebase/firestore";
import { Data } from "../Context_api/Context";

const ACCELEROMETER_TASK_NAME = "accelerometerTask";
const MapboxAccessToken =
  "pk.eyJ1IjoiaGF5YW4yMzciLCJhIjoiY2xoMzdjcWpkMTBvdDNkb2g5c2w2eWFwdyJ9.rrOhnjh45HPyEQ2c-jTISQ";

TaskManager.defineTask("backgroundTask", async () => {
  // console.log("hello g, kyaa hal ha");
  // console.log(Accelerometer.isAvailableAsync());
  // if (Accelerometer.isAvailableAsync()) {
  //   const accelerometerData = await Accelerometer.getCurrentReading();

  //   // Process the accelerometer data
  //   console.log(accelerometerData);
  // }

  // Accelerometer.addListener((accelerometerData) => {
  //   let overallAcceleration = Math.sqrt(
  //     Math.pow(accelerometerData.x, 2) +
  //       Math.pow(accelerometerData.y, 2) +
  //       Math.pow(accelerometerData.z, 2)
  //   );
  //   overallAcceleration = overallAcceleration / 9.8;
  //   console.log("AccelerometerData", overallAcceleration);
  // });

  // return BackgroundFetch.Result.NewData;
  // const now = Date.now();

  // console.log(
  //   `Got background fetch call at date: ${new Date(now).toISOString()}`
  // );

  // // Be sure to return the successful result type!

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

const Home = ({ currentLocation, getUserLocation }) => {
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
  const [highAcceleration, sethighAcceleration] = useState(false);
  const accelerationDataRef = useRef([]);
  const { account } = useContext(Data);

  const checkIfLocationOnRoad = async () => {
    const url = `https://api.mapbox.com/matching/v5/mapbox/driving/${location.longitude},${location.latitude};${location.longitude},${location.latitude}?access_token=${MapboxAccessToken}`;
    console.log("map box URL is: ", url);
    let isOnRoad = false;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("data recieved is: ", data);
        console.log(data);
        if (data.code === "Ok") {
          isOnRoad = true;
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
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
            interval: 100,
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

  const windowSize = 5; // Time window in seconds
  let accelerationData = [];
  const sendMessageToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(firestore, "messages"), {
        bloodGroup: account.bloodGroup,
        gender: account.gender,
        name: account.name,
        location: new GeoPoint(location.latitude, location.longitude),
        createdAt: Timestamp.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    if (accidentDetected) return;
    console.log("location i got from welcome screen is", currentLocation);
    setLocation(currentLocation);
    console.log("location object is: ", location);
    setLoader(false);
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
    };
  }, []);

  useEffect(() => {
    const checkAccidentDetection = async () => {
      if (acceleration && acceleration > 0.12 && !highAcceleration) {
        sethighAcceleration(true);
        await getUserLocation();
        console.log("Got hit by something");
        const isOnRoad = await checkIfLocationOnRoad();
        if (isOnRoad === true) {
          setAccidentDetected(true);
          console.log("Accident detected");
          console.log("Commulative accelerometer data is: ", accelerationData);
          setTimer(10);
        }
      }
    };
    checkAccidentDetection();
  }, [acceleration]);

  useEffect(() => {
    console.log("second");

    let interval;
    if (timer > 0) {
      setWarningAlert(true);
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (showWarningAert) {
      clearInterval(interval);
      setConfirmation(true);
      console.log(showConfirmation);
      setWarningAlert(false);
      sendMessageToFirestore();
      Accelerometer.removeAllListeners();
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
            sendMessageToFirestore={sendMessageToFirestore}
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
                sethighAcceleration(!highAcceleration);
                setWarningAlert(false);
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
