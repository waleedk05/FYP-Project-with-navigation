import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/themes";

const Input = ({
  placeholder,
  secureTextEntry,
  icon,
  onIconPress,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        {...rest}
      />
      {icon && (
        <TouchableOpacity style={styles.iconContainer} onPress={onIconPress}>
          <Image source={icon} style={styles.icon} />
        </TouchableOpacity>
      )}
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={togglePasswordVisibility}
        >
          <Image
            source={
              isPasswordVisible
                ? require("../assets/icons/hide_password_icon.png")
                : require("../assets/icons/show_password_icon.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1.5,
    paddingHorizontal: 18,
    borderRadius: 12,
    fontSize: 16,
    fontStyle: "normal",
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 10,
    backgroundColor: "#f5f5f5",
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 15,
    color: COLORS.black,
  },
  iconContainer: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Input;
