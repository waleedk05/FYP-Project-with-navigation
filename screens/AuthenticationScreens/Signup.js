import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import { StatusBar } from "react-native";
import images from "../../constants/images";
import { COLORS, FONTS } from "../../constants/themes";
import PageContainer from "../../components/PageContainer";
import Input from "../../components/Input";
import CustomCheckbox from "../../components/CustomCheckbox";
import DropDown from '../../components/DropDown';
import { validateEmail } from "../../components/validation"; // Import the email validation function
import { ActivityIndicator } from 'react-native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config';
import { getAuth } from 'firebase/auth';
import { set, ref } from 'firebase/firestore';



const bloodType = [
  { id: 1, name: 'A+' },
  { id: 2, name: 'A-' },
  { id: 3, name: 'B+' },
  { id: 4, name: 'B-' },
  { id: 5, name: 'AB+' },
  { id: 6, name: 'AB-' },
  { id: 7, name: 'O+' },
  { id: 8, name: 'O-' }
];

function Signup({ navigation }) {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+92');
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [dateOfBirth, setDateofBirth] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const [isLoading, setIsLoading] = useState(false);



  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  };

  const handleChangePhoneNumber = (text) => {
    if (text.length <= 10) {
      setPhoneNumber(text);
    }
  };

  const handleChangeCountryCode = (text) => {
    setCountryCode(text);
  };

  const handlePassword = (text) => {
    if (text.length <= 8) {
      setPassword(text);
    }
  };

  const onSelect = (item) => {
    setSelectedItem(item);
  };



  //Firebase data Input
  // function to add data to firebase
  const dataAddOn = async () => {
    setIsLoading(true);

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      // Save user data to Firestore
      const usersCollection = collection(db, 'users');
      await addDoc(usersCollection, {
        uid: user.uid,  // Add the UID to the user data
        fullName: fullName,
        email: email,
        phoneNumber: `${countryCode}${phoneNumber}`,
        address: address,
        gender: selectedGender,
        bloodGroup: selectedItem?.name,
        dateOfBirth: dateOfBirth,
      });

      console.log('Data added successfully.');
      setIsLoading(false);
      navigation.navigate('Signin');

    } catch (error) {
      console.error('Error creating user or adding data:', error);
      setIsLoading(false);
    }
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
        <ScrollView>

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
            <Image source={images.logo} style={{ marginTop: -90 }}></Image>
          </View>
          <View style={{ marginLeft: 25, marginRight: 25 }}>
            <Text
              style={{
                ...FONTS.largerTitles,
                color: COLORS.primaryRed,
                marginTop: 10,
              }}
            >
              Sign Up
            </Text>

            <Text style={styles.inputLabel}>Name</Text>

            <Input placeholder={"Full Name"}
              value={fullName}
              onChangeText={(text) => setFullName(text)} />

            <Text style={styles.inputLabel}>Email:</Text>

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
            <Text style={styles.inputLabel}>Enter your phone number:</Text>

            <View style={styles.phoneInputContainer}>
              <TextInput
                style={styles.countryCodeInput}
                onChangeText={handleChangeCountryCode}
                placeholder="Country Code"
                keyboardType="phone-pad"
                maxLength={3}
                value={countryCode}
              />
              <TextInput
                style={styles.phoneNumberInput}
                onChangeText={handleChangePhoneNumber}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
              />
            </View>

            <Text style={styles.inputLabel}>Password:</Text>
            <Input placeholder="max. 8 characters" secureTextEntry maxLength={8} value={password} onChangeText={handlePassword} />
            <Text style={styles.inputLabel}>Address</Text>

            <Input placeholder={"Your full address"} value={address}
              onChangeText={(text) => setAddress(text)} />

            <Text style={styles.inputLabel}>Select Your Gender:</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15 }}>

              <CustomCheckbox
                label="Male"
                isChecked={selectedGender === "Male"}
                onChange={() => setSelectedGender("Male")}
              />
              <CustomCheckbox
                label="Female"
                isChecked={selectedGender === "Female"}
                onChange={() => setSelectedGender("Female")}
              />
            </View>

            <Text style={styles.inputLabel}>Blood Group:</Text>
            <View style={{ marginBottom: 15 }}>
              <DropDown
                value={selectedItem}
                data={bloodType}
                onSelect={onSelect}
              />
            </View>
            <Text style={styles.inputLabel}>Date of Birth:</Text>



          </View>
          <View>
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primaryRed} />
            ) : (
              <TouchableOpacity
                style={[styles.button]}
                onPress={dataAddOn}

              >
                <Text style={styles.buttonText}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            )}
          </View>




          <View style={styles.bottomContainer}>
            <Image source={images.bottomDesign} style={styles.bottom} />
          </View>

        </ScrollView>
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
    marginTop: 20,
    marginBottom: 0,
    marginLeft: 20
  },


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
    marginBottom: 50
  },
  signupText: {
    marginLeft: 5,
    color: "#CF0A0A",
    fontWeight: "bold",
    fontSize: 17,
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
    paddingRight: 140,
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
export default Signup;
