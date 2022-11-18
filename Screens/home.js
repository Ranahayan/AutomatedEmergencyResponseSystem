import { View, Text, Button, StatusBar } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
