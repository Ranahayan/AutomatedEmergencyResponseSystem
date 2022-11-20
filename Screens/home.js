import { View, Text, Button, StatusBar,StyleSheet } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      <Button
        style={{ marginTop: 10 }}
        title="Contact"
        onPress={() => navigation.navigate("Contacts")}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
