import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/transparentLogo.png')}/>
      <Text style={styles.title}>
        Welcome to
        <Text style={{ color: "#0165FF" }}>
          {" "}
          {"\n"}Automated {"\n"} Emergency Response {"\n"}System
        </Text>
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent:"space-evenly"
  },
  title: {
    color: "#474747",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 70,
    lineHeight: 35,
  },
  logo:{
    width:wp("70%"),
    height:hp("21%"),
  }
});
