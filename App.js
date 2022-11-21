import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/home";
import Profile from "./Screens/profile";
import colors from "./Colors/colors";
import {
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { FontAwesome5, AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import Welcome from "./Screens/welcome";
import EditProfile from "./Screens/editProfile";
import Contact from "./Screens/contacts";
import IndividualContact from "./Screens/individualScreen";

export default function App({ navigation }) {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
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
        <Stack.Screen
          name="Contacts"
          component={Contact}
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
                <FontAwesome5
                  name="search"
                  style={{ marginRight: 20 }}
                  size={27}
                  color="#474747"
                  onPress={() => navigation.goBack()}
                />
                <AntDesign
                  name="adduser"
                  size={32}
                  color="#474747"
                  onPress={() => navigation.navigate("Edit Profile")}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Individual Contact"
          component={IndividualContact}
          options={({ navigation }) => ({
            title: "Edit Profile",
            headerBackTitleVisible: false,
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
