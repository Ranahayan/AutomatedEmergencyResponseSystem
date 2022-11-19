import React from "react";
import colors from "../Colors/colors";
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  Text,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
const EditProfile = () => {
  return (
    <View>
      <Text>EditProfile</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default EditProfile;
