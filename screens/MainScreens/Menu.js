import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native'; // Import the necessary navigation hook
import Button from "../../components/Button";
import { icons } from '../../constants';
import images from "../../constants/images";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/themes";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config';


const Menu = (props) => {

    const [signingOut, setSigningOut] = useState(false);
    const [fullName, setFullName] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        const fetchFullName = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const q = query(collection(db, 'users'), where('email', '==', user.email));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    const userData = doc.data();
                    setFullName(userData.fullName);
                }
            }
        };

        fetchFullName();
    }, []);

    useEffect(() => {
        const fetchProfilePicture = async () => {
            const storedProfilePicture = await AsyncStorage.getItem('profilePicture');
            if (storedProfilePicture) {
                setProfilePicture(storedProfilePicture);
            }
        };

        fetchProfilePicture();
    }, []);



    const handleSignOut = () => {

        setSigningOut(true); // Show activity indicator

        setTimeout(() => {
            const auth = getAuth();
            signOut(auth)
                .then(() => {
                    // Clear stored email and password
                    AsyncStorage.removeItem('email');
                    AsyncStorage.removeItem('password');
                    // Remove user from AsyncStorage
                    AsyncStorage.removeItem('user');
                    console.log('User signed out');
                    props.navigation.navigate("Signin"); // Navigate to the Sign In screen after sign out
                    console.log('Navigation complete.');
                })
                .catch((error) => {
                    console.error('Error signing out:', error);
                })
                .finally(() => {
                    setSigningOut(false); // Hide activity indicator
                });
        }, 3000); // 3-second delay before sign out

    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",

                }}
            >
                <Image source={profilePicture ? { uri: profilePicture } : icons.profilePicWhite} style={{ marginTop: 60, height: 95, width: 95, justifyContent: 'center' }} />

                <Text style={{ fontSize: 20, marginTop: 20 }}>{fullName}</Text>
            </View>
            <View style={{ marginLeft: 40, marginRight: 40, marginBottom: 10, marginTop: 70 }}>
                <TouchableOpacity style={styles.blocks} onPress={() => props.navigation.navigate("Settings")}>
                    <Text style={{ fontSize: 20 }}>
                        Settings
                    </Text>
                    <Image source={icons.rightArrowBlack} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 40, marginRight: 40, marginBottom: 30, marginTop: 10 }}>
                <TouchableOpacity style={styles.blocks} onPress={() => props.navigation.navigate("About")}>
                    <Text style={{ fontSize: 20 }}>
                        About
                    </Text>
                    <Image source={icons.rightArrowBlack} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View>
                {signingOut ? (
                    <ActivityIndicator size="large" color={COLORS.primaryRed} /> // Show activity indicator while signing out
                ) : (
                    <Button title="Sign Out" onPress={handleSignOut} />
                )}
            </View>

            <View style={styles.bottomContainer}>
                <Image source={images.bottomDesign} style={styles.bottom} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

        backgroundColor: 'white',

    },
    bottomContainer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    bottom: {
        height: 150,
        width: 150,
        resizeMode: "contain",
        marginRight: -8,
    },
    blocks: {
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'

    },
    icon: {
        justifyContent: 'flex-end',
        height: 16,
        width: 10
    }
});
export default Menu;