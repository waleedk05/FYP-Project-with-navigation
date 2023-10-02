import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS, FONTS, SIZES } from "../constants/themes";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config';

const CustomDatePicker = ({ onDateChange }) => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = async (event, date) => {
        if (date) {
            // Extract only the date part from the selected date
            const isoDateString = date.toISOString().split('T')[0];

            try {
                // Access the Firestore collection and add the date of birth
                const docRef = await addDoc(collection(db, 'users'), {
                    dateOfBirth: isoDateString
                });

                // Optionally, you can return the document ID or do something with it
                console.log('Document written with ID: ', docRef.id);
            } catch (e) {
                console.error('Error adding document: ', e);
            }
        }
        setShowDatePicker(false); // Close the picker only on iOS
    };


    const openDatePicker = () => {
        setShowDatePicker(true);
    };

    const formatDate = (date) => {
        if (date) {
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }
        return "Choose your birthdate";
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            {/* Other UI components here */}
            <TouchableOpacity
                style={styles.textInputContainer}
                activeOpacity={1}
                onPress={openDatePicker}
            >
                <Text style={styles.textInput}>{formatDate(selectedDate)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <>
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                    {Platform.OS === "ios" && (
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setShowDatePicker(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setShowDatePicker(false)}
                            >
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1.5,
        paddingLeft: 18,
        paddingRight: 258,
        paddingTop: 17,
        paddingBottom: 17,
        borderRadius: 12,
        elevation: 8,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 10,
        backgroundColor: "#f5f5f5",
    },
    textInput: {
        fontSize: 15,
        color: "black",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    button: {
        backgroundColor: COLORS.primaryRed,
        borderRadius: 13,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 15,
        margin: 10,
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

export default CustomDatePicker;
