import React from "react";
import colors from "../Colors/colors";
import { View, Text, StatusBar, StyleSheet, Image } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/user-pic.png")} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    // justifyContent: "center",
  },
  
});

export default Profile;
