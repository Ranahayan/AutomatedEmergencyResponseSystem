import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import colors from "./Colors/colors";
const KeyBoardAvoidingWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyBoardAvoidingWrapper;
