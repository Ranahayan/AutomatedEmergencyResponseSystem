import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/home";
import Profile from "./Screens/profile";
import colors from "./Colors/colors";
import { FontAwesome5, AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import Welcome from "./Screens/welcome";
import EditProfile from "./Screens/editProfile";
import Contact from "./Screens/contacts";
import IndividualContact from "./Screens/individualContact";
import CreateContact from "./Screens/createContact";
import { useState } from "react";

export default function App({ navigation }) {
  const [editFlag, setEditFlag] = useState(false);
  const [contacts, setContacts] = useState([
    {
      key: 1,
      name: "Hayan",
      number: "03142567710",
      email: "abdulhayan1220@gmail.com",
      address: "Lahore",
    },
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
    {
      key: 5,
      name: "ehtsham",
      number: "03106767710",
      email: "ehtsham876@gmail.com",
      address: "pasroor",
    },
  ]);

  const handleAddContact = (contact) => {
    const contactList = [...contacts, contact];
    setContacts(contactList);
  };
  const handleEditContact = (key, contact) => {
    let newContacts = [...contacts];
    const index = newContacts.findIndex((item) => item.key === key);
    newContacts[index] = { ...contact };
    setContacts(newContacts);
    setEditFlag(false);
  };

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* -----------------------------------------------------------Home----------------------------------------------------------- */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        {/* -----------------------------------------------------------Profile----------------------------------------------------------- */}

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={({ navigation }) => ({
            title: "Profile",
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
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: () => (
              <Feather
                name="edit-3"
                size={30}
                color="black"
                onPress={() => navigation.navigate("Edit Profile")}
              />
            ),
          })}
        />
        {/* -----------------------------------------------------------Ediet Profile ----------------------------------------------------------- */}

        <Stack.Screen
          name="Edit Profile"
          component={EditProfile}
          options={({ navigation }) => ({
            title: "Edit Profile",
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
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        {/* -----------------------------------------------------------Contacts----------------------------------------------------------- */}

        <Stack.Screen
          name="Contacts"
          options={({ navigation }) => ({
            title: "Contacts",
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
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: () => (
              <View style={styles.headerRightIcons}>
                <TouchableOpacity>
                  <FontAwesome5
                    name="search"
                    style={{ marginRight: 20 }}
                    size={27}
                    color="#474747"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Create Contact")}
                >
                  <AntDesign name="adduser" size={32} color="#474747" />
                </TouchableOpacity>
              </View>
            ),
          })}
        >
          {(props) => <Contact {...props} contacts={contacts} />}
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
              <Ionicons
                style={{ marginRight: 20 }}
                name="arrow-back"
                size={30}
                color="#474747"
                onPress={() => {
                  setEditFlag(false);
                  navigation.goBack();
                }}
              />
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => setEditFlag(true)}
                disabled={editFlag}
              >
                <Feather name="edit-3" size={30} color="black" />
              </TouchableOpacity>
            ),
          })}
        >
          {(props) => (
            <IndividualContact
              {...props}
              editFlag={editFlag}
              setEditFlag={setEditFlag}
              contacts={contacts}
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
              <Ionicons
                style={{ marginRight: 20 }}
                name="arrow-back"
                size={30}
                color="#474747"
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        >
          {(props) => (
            <CreateContact {...props} handleAddContact={handleAddContact} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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
});
