import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { COLORS, FONTS, SIZES } from "../../constants/themes";
import { icons } from '../../constants';
import Input from "../../components/Input";
import Button from "../../components/Button";
import CustomDatePicker from "../../components/CustomDatePicker";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, storageRef, storage } from '../../config';
import { getAuth } from 'firebase/auth';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { getStorage, ref } from 'firebase/storage';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { firebase } from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Settings = ({ navigation }) => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState("");
    const [bloodGroup, setSelectedItem] = useState(null);
    const [dateOfBirth, setDateofBirth] = useState('');

    const [profilePictureUrl, setProfilePictureUrl] = useState(icons.profilePicGrey);


    const [profilePicture, setProfilePicture] = useState(null);

    const [uploadProfilePic, setuploadProfilePic] = useState(false);

    //const stringDate = dateOfBirth.toString();
    console.log("Profile Picture URL:", profilePictureUrl);
    console.log("Profile Picture:", profilePicture);

    useEffect(() => {
        const fetchData = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const q = query(collection(db, 'users'), where('uid', '==', user.uid)); // Change this line to use UID
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    const userData = doc.data();
                    setFullName(userData.fullName);
                    setEmail(userData.email);
                    setPhoneNumber(userData.phoneNumber);
                    setAddress(userData.address);
                    setSelectedItem(userData.bloodGroup);
                    setDateofBirth(userData.dateOfBirth);
                    if (userData.profilePicture) {
                        const url = await getDownloadURL(ref(storage, userData.profilePicture));
                        setProfilePictureUrl(url);
                    } else {
                        const storedProfilePicture = await AsyncStorage.getItem('profilePicture');
                        if (storedProfilePicture) {
                            setProfilePicture(storedProfilePicture);
                        }
                    }
                }
            }
        };

        fetchData();
    }, []);


    const handleSaveChanges = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const q = query(collection(db, 'users'), where('uid', '==', user.uid));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                await updateDoc(doc.ref, {
                    fullName,
                    email,
                    phoneNumber,
                    address,
                    bloodGroup,
                    dateOfBirth
                });

                Alert.alert(
                    "ALERT!",
                    "Changes Saved Successfully.",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        }
    }




    const uploadPic = async () => {
        setuploadProfilePic(true);

        try {
            let blob = null;

            if (profilePicture) {
                if (profilePicture.startsWith('http')) {
                    const response = await fetch(profilePicture);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    blob = await response.blob();
                } else {
                    blob = await new Promise((resolve) => {
                        const xhr = new XMLHttpRequest();
                        xhr.onload = () => {
                            resolve(xhr.response);
                        };
                        xhr.onerror = (e) => {
                            console.error(e);
                            resolve(null);
                        };
                        xhr.responseType = 'blob';
                        xhr.open('GET', profilePicture, true);
                        xhr.send(null);
                    });
                }

                const filename = profilePicture.substring(profilePicture.lastIndexOf('/') + 1);
                const storageRef = ref(storage, filename);

                await uploadBytes(storageRef, blob);

                setuploadProfilePic(false);

                Alert.alert('Profile Pic Uploaded!');


            } else {
                setuploadProfilePic(false);
                Alert.alert('Please select a profile picture.');
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            setuploadProfilePic(false);
        }
    };


    const handleImageChange = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            console.log(result);

            if (!result.canceled) {
                setProfilePicture(result.assets[0].uri)
                await AsyncStorage.setItem('profilePicture', result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };




    const saveAllChanges = () => {
        handleSaveChanges();
        uploadPic();

    }

    const handleDeleteAccount = () => {
        // Display a confirmation dialog
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => deleteAccount()
                }
            ]
        );
    };



    const deleteAccount = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const uid = user.uid;

                // Delete user data from Firestore using UID
                const userDocRef = doc(db, 'users', uid);
                await deleteDoc(userDocRef);

                // Delete user from Firebase Authentication
                await user.delete();

                // Navigate to a signin screen 
                navigation.navigate('Signin');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };



    return (
        <View style={styles.container}>
            <View style={{
                marginLeft: 30,
                marginRight: 30
            }}>


                <ScrollView>
                    <Text style={styles.text}>Personal Information</Text>

                    <View style={{ marginTop: 20, }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.black, alignSelf: 'center', fontWeight: '500' }}>
                            Avatar
                        </Text>
                        <View style={{ marginBottom: 20, justifyContent: 'center', alignSelf: 'center', }}>

                            {profilePicture && typeof profilePicture === 'string' ? (
                                <Image source={{ uri: profilePicture }} style={styles.Profileimage} />
                            ) : (
                                profilePictureUrl && typeof profilePictureUrl === 'string' ? (
                                    <Image source={{ uri: profilePictureUrl }} style={styles.Profileimage} />
                                ) : (
                                    <Image source={icons.profilePicGrey} style={styles.Profileimage} />
                                )
                            )}

                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity style={styles.button1} onPress={handleImageChange}>
                                    <Text style={{ color: COLORS.primaryRed, ...FONTS.h6, fontWeight: '700' }}>
                                        Change
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button2} >
                                    <Text style={{ color: COLORS.black, ...FONTS.h6, fontWeight: '700' }}>Remove</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.inputLabel}>Email:</Text>
                        <Input
                            placeholder={email}
                            editable={false} />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.inputLabel}>Full Name:</Text>
                        <Input
                            value={fullName}
                            onChangeText={setFullName}

                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.inputLabel}>Phone Number:</Text>
                        <Input
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.inputLabel}>Address:</Text>
                        <Input
                            value={address}
                            onChangeText={setAddress}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.inputLabel}>Blood Group:</Text>
                        <Input
                            value={bloodGroup}
                            onChangeText={setSelectedItem}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.inputLabel}>Date Of Birth:</Text>
                        <Input />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.inputLabel}>Notifications:</Text>
                    </View>
                    <View style={{ marginBottom: 50, justifyContent: 'center' }}>
                        <Button title="Delete Account" onPress={handleDeleteAccount} />
                    </View>
                    <View style={{ marginBottom: 100, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.button3}  >
                            <Text style={{ color: COLORS.black, ...FONTS.h6, fontWeight: '700' }}>Discard Changes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button4} onPress={saveAllChanges}>
                            <Text style={{ color: COLORS.secondaryWhite, ...FONTS.h6, fontWeight: '700' }}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    text: {
        color: COLORS.primaryRed,
        ...FONTS.title,
        marginTop: 20,
        alignSelf: 'center',

    },
    Profileimage: {
        width: 80,
        height: 80,
        borderRadius: 90,
        borderWidth: 3,
        //borderColor: COLORS.black,
        marginTop: 15,
        marginBottom: 20,
        alignSelf: 'center',


    },
    button1: {
        backgroundColor: COLORS.secondaryWhite,
        width: 100,
        height: 50,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: COLORS.primaryRed,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18,
        marginRight: 10

    },
    button2: {
        backgroundColor: COLORS.secondaryWhite,
        width: 100,
        height: 50,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: COLORS.black,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18,
        marginLeft: 10

    },
    button3: {
        backgroundColor: COLORS.secondaryWhite,
        width: 150,
        height: 50,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: COLORS.black,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18,
        marginLeft: 10

    },
    button4: {
        backgroundColor: COLORS.primaryRed,
        width: 150,
        height: 50,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: COLORS.primaryRed,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18,
        marginLeft: 10

    },
    inputLabel: {
        color: '#CF0A0A',
        fontWeight: 'bold',
        marginTop: 4,
        marginBottom: 1,
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
        marginTop: 10,

    },
    phoneNumberInput: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
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
});

export default Settings;
