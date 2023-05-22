import { StatusBar } from "expo-status-bar";
import React, {
  createRef,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  FontAwesome5,
  AntDesign,
  Ionicons,
  Feather,
  Entypo,
} from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Splash from "./Screens/splash";
import Welcome from "./Screens/welcome";
import Home from "./Screens/home";
import Profile from "./Screens/profile";
import colors from "./Colors/colors";
import Contact from "./Screens/contacts";
import IndividualContact from "./Screens/individualContact";
import CreateContact from "./Screens/createContact";
import DataProvider from "./Context_api/Context";
import * as Location from "expo-location";

export default function App(props) {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [editContactFlag, setEditFlag] = useState(false);
  const [editProfileFlag, setEditprofileFlag] = useState(false);
  const [searchContactFlag, setSearchContactFlag] = useState(false);
  const contactTitle = searchContactFlag ? "" : "Conatct";
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({
    longitude: 74.35016962092465,
    latitude: 31.578248288521614,
  });
  const [contacts, setContacts] = useState([
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
  ]);
  const [user, setUser] = useState({
    name: "Hayan",
    address: "Lahore",
    gender: "Male",
    bloodGroup: "O+",
    email: "abdulhayan1220@gmail.com",
  });
  const [finalContactList, setFinalContactList] = useState([]);
  useEffect(() => {
    setFinalContactList(contacts);
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 2000);
  }, []);

  const getUserLocation = async () => {
    try {
      const backgroundPermission =
        await Location.requestForegroundPermissionsAsync();
      console.log("Background permission: ", backgroundPermission);
      console.log("Getting location");
      if (backgroundPermission.status === "granted") {
        const currentLocationIs = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeout: 20000,
        });
        console.log("current Location Is: ", currentLocationIs);
        setLocation({
          latitude: currentLocationIs.coords.latitude,
          longitude: currentLocationIs.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        console.log("location object is: ", location);
      } else {
        console.log("Foreground location permission not granted");
      }
    } catch (error) {
      console.log(error.message);
      console.log("Error while getting location");
    }
  };

  const handleSearchContact = (val) => {
    // const filterdContacts = contacts.filter((contact) =>
    //   contact.name.toLocaleLowerCase().includes(val.toLocaleLowerCase())
    // );
    // console.log(filterdContacts);
    setSearchQuery(val);
    // setFinalContactList(filterdContacts);
  };
  const handleAddContact = (contact) => {
    const contactList = [...contacts, contact];
    console.log(contactList);
    setContacts(contactList);
    setFinalContactList(contactList);
  };
  const handleEditContact = (key, contact) => {
    console.log(contact);
    let newContacts = [...contacts];
    const index = newContacts.findIndex((item) => item.key === key);
    newContacts[index] = { ...contact };
    setContacts(newContacts);
    setEditFlag(false);
    console.log(newContacts);
    const filterdContacts = newContacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    );
    console.log(filterdContacts);
    setFinalContactList(filterdContacts);
  };

  const Stack = createNativeStackNavigator();
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* -----------------------------------------------------------Splash----------------------------------------------------------- */}

          {showSplashScreen ? (
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
          ) : null}

          {/* -----------------------------------------------------------Login/Welcome----------------------------------------------------------- */}
          <Stack.Screen name="Welcome" options={{ headerShown: false }}>
            {(props) => (
              <Welcome {...props} getUserLocation={getUserLocation} />
            )}
          </Stack.Screen>

          {/* -----------------------------------------------------------Home----------------------------------------------------------- */}
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {(props) => (
              <Home
                {...props}
                currentLocation={location}
                getUserLocation={getUserLocation}
              />
            )}
          </Stack.Screen>

          {/* -----------------------------------------------------------Profile----------------------------------------------------------- */}

          <Stack.Screen
            name="Profile"
            options={({ navigation }) => ({
              title: "Profile",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: colors.background,
              },
              headerTintColor: colors.grey,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    setEditprofileFlag(false);
                    navigation.goBack();
                  }}
                >
                  <Ionicons
                    style={{ marginRight: 20 }}
                    name="arrow-back"
                    size={30}
                    color="#474747"
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity>
                  <Feather
                    name="edit-3"
                    size={30}
                    color="black"
                    onPress={() => setEditprofileFlag(true)}
                  />
                </TouchableOpacity>
              ),
            })}
          >
            {(props) => (
              <Profile
                {...props}
                user={user}
                editProfileFlag={editProfileFlag}
                setEditprofileFlag={setEditprofileFlag}
                setUser={setUser}
              />
            )}
          </Stack.Screen>

          {/* -----------------------------------------------------------Contacts----------------------------------------------------------- */}

          <Stack.Screen
            name="Contacts"
            options={({ navigation }) => ({
              title: contactTitle,
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: colors.background,
              },
              headerTintColor: colors.grey,
              headerLeft: () => (
                <Ionicons
                  style={{ marginRight: 20 }}
                  name="arrow-back"
                  size={30}
                  color="#474747"
                  onPress={() => {
                    setSearchQuery("");
                    setFinalContactList(contacts);
                    setSearchContactFlag(false);
                    navigation.goBack();
                  }}
                />
              ),

              headerRight: () => (
                <View style={styles.headerRightIcons}>
                  {searchContactFlag && (
                    <View style={styles.searchBox}>
                      <TextInput
                        style={styles.searchContact}
                        placeholder="Search Contact"
                        autoFocus={true}
                        onChangeText={handleSearchContact}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setSearchQuery("");
                          setSearchContactFlag(false);
                          setFinalContactList(contacts);
                        }}
                      >
                        <Entypo name="cross" size={30} color="black" />
                      </TouchableOpacity>
                    </View>
                  )}
                  {!searchContactFlag && (
                    <TouchableOpacity
                      onPress={() => {
                        // setFinalContactList([]);
                        setSearchContactFlag(true);
                      }}
                    >
                      <FontAwesome5
                        name="search"
                        style={{ marginRight: 20 }}
                        size={27}
                        color="#474747"
                      />
                    </TouchableOpacity>
                  )}
                  {!searchContactFlag && (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Create Contact")}
                    >
                      <AntDesign name="adduser" size={32} color="#474747" />
                    </TouchableOpacity>
                  )}
                </View>
              ),
            })}
          >
            {(props) => (
              <Contact
                {...props}
                // contacts={finalContactList}
                searchContactFlag={searchContactFlag}
                searchQuery={searchQuery}
              />
            )}
          </Stack.Screen>

          {/* -----------------------------------------------------------Individulal Contact----------------------------------------------------------- */}
          <Stack.Screen
            name="Individual Contact"
            options={({ navigation }) => ({
              title: "",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: colors.background,
              },
              headerTintColor: colors.grey,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    setEditFlag(false);
                    navigation.goBack();
                  }}
                >
                  <Ionicons
                    style={{ marginRight: 20 }}
                    name="arrow-back"
                    size={30}
                    color="#474747"
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => setEditFlag(true)}
                  disabled={editContactFlag}
                >
                  <Feather name="edit-3" size={30} color="black" />
                </TouchableOpacity>
              ),
            })}
          >
            {(props) => (
              <IndividualContact
                {...props}
                editFlag={editContactFlag}
                setEditFlag={setEditFlag}
                // contacts={finalContactList}
                handleEditContact={handleEditContact}
              />
            )}
          </Stack.Screen>

          {/* -----------------------------------------------------------Create Contact----------------------------------------------------------- */}
          <Stack.Screen
            name="Create Contact"
            options={({ navigation }) => ({
              title: "Create Contact",
              headerStyle: {
                backgroundColor: colors.background,
              },
              headerShadowVisible: false,
              headerTintColor: colors.grey,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    style={{ marginRight: 20 }}
                    name="arrow-back"
                    size={30}
                    color="#474747"
                  />
                </TouchableOpacity>
              ),
            })}
          >
            {(props) => (
              <CreateContact {...props} handleAddContact={handleAddContact} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRightIcons: {
    flexDirection: "row",
  },
  searchContact: {
    fontSize: 16,
    color: colors.grey,
    width: wp("50%"),
    color: "white",
    // backgroundColor: "#bebebe",

    marginLeft: 3,
  },
  searchBox: {
    borderRadius: 10,
    backgroundColor: "#bebebe",
    flexDirection: "row",
    marginRight: wp("17%"),
    borderBottomColor: "#474747",
    // borderBottomWidth: 1,
  },
});

// import { View, Text } from "react-native";
// import React, { useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const submitUser = async () => {
//     console.log("user");
//     const options = { method: "GET", url: "http://10.5.29.151:4000/s/test" };

//     axios
//       .request(options)
//       .then(function (response) {
//         console.log(response.data);
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//     // try {
//     //   let response = await axios.post("http://127.0.0.1:4000/s/test", user);
//     //   console.log(response);
//     // } catch (error) {
//     //   console.log("This eRROr", error.message);
//     // }
//     // console.log("user");
//     // console.log(user);
//     // setShowpopup(!showpopup);
//     // user.key =
//     //   Math.random().toString(36).substring(2) +
//     //   new Date().getTime().toString(36);
//     // handleAddUser(user);
//     // navigation.goBack("");
//   };
//   useEffect(() => {
//     submitUser();
//   }, []);
//   return (
//     <View>
//       <Text>App</Text>
//     </View>
//   );
// };

// export default App;
