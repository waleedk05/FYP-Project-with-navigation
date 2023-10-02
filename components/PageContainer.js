import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";

const PageContainer = (props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      >
        {props.children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default PageContainer;
