import React, { useState } from "react";
import { View, Text } from "react-native";
const Welcome = () => {
  const [registeration, setRegisteration] = useState(false);
  const textClicked = () => {
    setRegisteration(true);
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 140,
        }}
      >
        <View
          style={{
            width: 40,
            borderBottomColor: "black",
            borderBottomWidth: 2,
          }}
        >
          <Text style={{ marginBottom: 8 }} onPress={textClicked}>
            Login
          </Text>
        </View>
        <View
          style={{
            width: 53,
            borderBottomColor: "black",
            borderBottomWidth: 2,
          }}
        >
          <Text style={{ marginBottom: 8 }} onPress={textClicked}>
            Register
          </Text>
        </View>
      </View>
      {registeration ? (
        <Text>Resgieration is true</Text>
      ) : (
        <Text>Resgieration is false</Text>
      )}
    </View>
  );
};

export default Welcome;
