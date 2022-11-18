import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Splash = () => {
  const handleTextClicked = () => {
    console.log("Let's get start button clicked");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to
        <Text style={{ color: "#0165FF" }}>
          {" "}
          {"\n"}Automated {"\n"} Emergency Response {"\n"}System
        </Text>
      </Text>
      <Text
        style={{
          textAlign: "center",
          paddingLeft: 50,
          paddingRight: 50,
          marginTop: 100,
        }}
      >
        In publishing and graphic design, Lorem ipsum is a placeholder text
        commonly used to demonstrate the visual form of a document or a typeface
        without relying on meaningful content.
      </Text>
      <TouchableOpacity onPress={handleTextClicked} style={styles.button}>
        <Text style={styles.buttonText}>Let's get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    color: "#474747",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 70,
    lineHeight: 35,
  },
  button: {
    backgroundColor: "#0165FF",
    padding: 10,
    borderRadius: 20,
    width: 300,
    marginTop: 120,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
