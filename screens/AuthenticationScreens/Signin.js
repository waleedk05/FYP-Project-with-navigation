import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from "react-native";
import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, Alert } from "react-native";
import images from "../../constants/images";
import { COLORS, FONTS, SIZES } from "../../constants/themes";
import PageContainer from "../../components/PageContainer";
import Input from "../../components/Input";
import RememberMeCheckbox from "../../components/RememberMeCheckbox";
import { useState } from 'react';
// Import the necessary functions for email authentication
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';



const Signin = (props) => {

  React.useEffect(() => {
    const getData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPassword = await AsyncStorage.getItem('password');

        if (storedEmail !== null && storedPassword !== null) {
          setEmail(storedEmail);
          setPassword(storedPassword);
        }
      } catch (e) {
        console.error('Error reading data from AsyncStorage:', e);
      }
    };

    getData();
  }, []);

  // State for the "Remember Me" checkbox
  const [rememberMe, setRememberMe] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true); // Add email validation state

  const [password, setPassword] = useState("");
  const handlePassword = (text) => {
    // Limiting the password to 8 characters
    if (password.length <= 8) {
      setPassword(text);
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(isValidEmail(text)); // Update email validation
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSignIn = () => {
    setIsLoading(true); // Show the activity indicator

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed in:', user);

        // Fetch the user's UID
        const uid = user.uid;

        // Save user to AsyncStorage only if rememberMe is true
        if (rememberMe) {
          AsyncStorage.setItem('user', JSON.stringify(user));
        }

        // Save email and password to AsyncStorage
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('password', password);




        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        getDocs(q)
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const fullName = userData.fullName;
                const isAdmin = userData.isAdmin;

                console.log('Full Name:', { fullName: fullName });

                // Check if the user has Admin set to true
                if (isAdmin) {
                  props.navigation.navigate('AdminDashboard');
                } else {
                  // Non-admin navigation
                  // Navigate to the home screen with the user's full name
                  props.navigation.navigate('tabnavigate', { fullName });
                }

              });
            } else {
              console.error('User data not found');

            }
          })

          .finally(() => {
            setIsLoading(false); // Hide the activity indicator when done
          });
        // After you've navigated to the desired screen, you can use `uid` as needed
        console.log('User UID:', uid);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
        setIsLoading(false); // Hide the activity indicator on error
        Alert.alert(
          "ERROR!",
          "Oops!  Please check your email or password and try again.",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
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
            paddingTop: 5,
          }}
        >
          <Image source={images.logo} style={{ marginTop: -40 }}></Image>
        </View>
        <View style={{ marginLeft: 25, marginRight: 25 }}>
          <Text
            style={{
              ...FONTS.largerTitles,
              color: COLORS.primaryRed,
              marginTop: 10,
            }}
          >
            Sign In
          </Text>
          <Text style={{ ...FONTS.h6, color: COLORS.black, marginTop: 10 }}>
            Sign in using your credentials.
          </Text>

          <Text style={styles.inputLabel}>Email:</Text>
          <Input placeholder="name@example.com"
            keyboardType="email-address"
            inputMode="email"
            value={email}
            onChangeText={handleEmailChange}
            Email // Add the Email prop to indicate it's an email input 
          />
          {!isEmailValid && (
            <Text style={{ color: "red", marginLeft: 25 }}>
              Enter a valid email address
            </Text>
          )}

          <Text style={styles.inputLabel}>Password:</Text>
          <Input placeholder="max. 8 characters" secureTextEntry maxLength={8} value={password} onChangeText={handlePassword} />

          <View style={{ marginTop: 10, marginLeft: 5 }}>
            <RememberMeCheckbox
              label="Keep me logged in"
              isChecked={rememberMe}
              onChange={setRememberMe}
            />

          </View>
        </View>


        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primaryRed} />
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                { opacity: password.length < 8 ? 0.5 : 1 },
              ]}
              disabled={password.length < 8}
              onPress={handleSignIn}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ResetPassword")}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "#CF0A0A",
                fontSize: 15,
              }}
            >
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text style={{ color: "#000000", fontWeight: "400", fontSize: 15 }}>
            Don't have an account?
          </Text>

          <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <Image source={images.bottomDesign} style={styles.bottom} />
        </View>




      </SafeAreaView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    color: '#CF0A0A',
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 1,
  },

  forgotPassword: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 0,
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 70
  },
  signupText: {
    marginLeft: 5,
    color: "#CF0A0A",
    fontWeight: "bold",
    fontSize: 17,
  },

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
    height: 130,
    width: 130,
    resizeMode: "contain",
    marginRight: -8,
    marginTop: 20,
    marginBottom: 0,
    marginLeft: 20
  },

  button: {
    backgroundColor: COLORS.primaryRed,
    borderRadius: 13,
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginTop: 30,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 10,
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
export default Signin;
