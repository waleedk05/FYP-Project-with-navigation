import { View, Text, SafeAreaView, StyleSheet, Image, Alert, } from "react-native";
import React from "react";
import PageContainer from "../../components/PageContainer";
import { StatusBar } from "react-native";
import { useState } from 'react';
import images from "../../constants/images";
import { COLORS, FONTS, SIZES } from "../../constants/themes";
import Input from "../../components/Input";
import { validateEmail } from "../../components/validation"; // Import the email validation function
import Button from "../../components/Button";
import { sendPasswordResetEmail } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { ActivityIndicator } from 'react-native';



function ResetPassword({ navigation }) {


  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  };
  const handleResetPassword = () => {
    const auth = getAuth();
    setIsLoading(true); // Set loading state to true
    sendPasswordResetEmail(auth, email)

      .then(() => {
        setIsLoading(false); // Set loading state to false
        Alert.alert('Password Reset Email Sent', 'Please check your email for instructions.');
        navigation.navigate('Signin');
      })
      .catch((error) => {
        setIsLoading(false); // Set loading state to false in case of an error
        Alert.alert('Error', 'Please enter your valid email.');
        console.error('Error sending password reset email:', error);
      });
  };



  return (
    <PageContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={Platform.select({
            ios: "dark-content",
            android: "light-content",
          })}
          backgroundColor={Platform.select({
            ios: "black",
            android: "black",
          })}
        />
        <View style={styles.topContainer}>
          <Image source={images.topDesign} style={styles.top} />
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 0,
          }}
        >
          <Image source={images.logo} style={{ marginTop: -70 }}></Image>
        </View>

        <View
          style={{
            marginLeft: 25,
            marginRight: 25,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              ...FONTS.largerTitles,
              color: COLORS.primaryRed,
              marginTop: 40,
            }}
          >
            Reset Password
          </Text>

          <Text style={{ ...FONTS.h6, color: COLORS.black, marginTop: 10 }}>
            In order to reset your password, you need to enter your valid email.
          </Text>

          <Text style={{ ...FONTS.h6, color: COLORS.black, marginTop: 10 }}>
            You will receive a link to reset your password on the email you entered.
          </Text>




          <Text style={styles.inputLabel}>Enter your email:</Text>

          <Input placeholder="name@example.com"
            keyboardType="email-address"
            inputMode="email"
            value={email}
            onChangeText={handleEmailChange}
            Email // Add the Email prop to indicate it's an email input 
          />
          {!isEmailValid && (
            <Text style={{ color: "red", marginLeft: 0 }}>
              Enter a valid email address
            </Text>
          )}


        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primaryRed} />
        ) : (
          <Button title="Receive Link" onPress={handleResetPassword} />
        )}


        <View style={styles.bottomContainer}>
          <Image source={images.bottomDesign} style={styles.bottom} />
        </View>
      </SafeAreaView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  bottomContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  top: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    marginLeft: -8,
  },
  bottom: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    marginRight: -8,
    marginTop: 30,
  },


  inputLabel: {
    color: '#CF0A0A',
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
  },
  phoneNumberContainer: {
    marginBottom: 10,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryCodeInput: {
    borderWidth: 1.5,
    paddingHorizontal: 19,
    paddingVertical: 14,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
    width: 75,
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 80,

  },
  phoneNumberInput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 6,
    marginLeft: 10,
    borderWidth: 1.5,
    paddingLeft: 25,
    paddingRight: 130,
    paddingVertical: 14,
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
  button: {
    backgroundColor: COLORS.primaryRed,
    borderRadius: 13,
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginTop: 40,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 90,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
    elevation: 8,
  },
  buttonText: {
    fontSize: 17,
    alignSelf: "center",
    color: COLORS.secondaryWhite,
    fontWeight: "bold",
    fontFamily: "HeeboRegular",
  },
});

export default ResetPassword;
