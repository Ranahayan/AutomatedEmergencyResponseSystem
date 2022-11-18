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
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
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
          options={{
            title: "Profile",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.grey,
            headerRight: () => (
              <Feather name="edit-3" size={30} color="black" />
            ),
            headerLeft: () => (
              <Ionicons
                style={{ marginRight: 20 }}
                name="arrow-back"
                size={30}
                color="#474747"
              />
            ),
          }}
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
});
