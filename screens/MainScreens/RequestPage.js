import { View, Text, SafeAreaView, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useState } from "react";
import PageContainer from '../../components/PageContainer';
import CustomCheckbox from '../../components/CustomCheckbox';
import DropDown from '../../components/DropDown';
import Button from "../../components/Button";
import { ActivityIndicator } from 'react-native';
import { COLORS, FONTS } from "../../constants/themes";

import { collection, addDoc, query, where, getDoc, doc } from 'firebase/firestore';

import { auth, db } from '../../config';


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

function RequestPage() {
    const [isLoading, setIsLoading] = useState(false);

    const [selectedBloodType, setSelectedBloodType] = useState(null);
    const [selectedMedicalReason, setSelectedMedicalReason] = useState(null);

    const [selectedItem, setSelectedItem] = useState(null);
    const onSelect = (item) => {
        setSelectedItem(item);
    };

    const requestAddOn = () => {
        setIsLoading(true); // Set loading state to true
        // Saving the request data to the Firestore Database
        const requestCollection = collection(db, 'requests');
        addDoc(requestCollection, {

            bloodType: selectedBloodType,
            bloodGroup: selectedItem?.name,
            medicalReason: selectedMedicalReason,

        })
            .then(() => {
                //Storing request on firestore
                console.log('Request added successfully.');
                setIsLoading(false); // Setting Loading to false when done

                setSelectedBloodType(null);
                setSelectedMedicalReason(null);
                setSelectedItem(null);
                Alert.alert(
                    "ALERT!",
                    "Request Added Successfully.",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                ); // Alert on screen for successful request
            })
            .catch((error) => {
                console.error('Error adding data:', error);
                setIsLoading(false); // Setting loading state to false in case of an error
            });
    };



    return (


        <View style={styles.container}>
            <ScrollView>
                <View style={{ marginLeft: 40, marginRight: 60, marginTop: 40 }}>
                    <Text style={styles.inputLabel}>Blood Type: </Text>

                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', marginRight: 22 }}>

                        <CustomCheckbox
                            label="Whole Blood"
                            isChecked={selectedBloodType === "Whole Blood"}
                            onChange={() => setSelectedBloodType("Whole Blood")}
                        />
                        <CustomCheckbox
                            label="Platelets"
                            isChecked={selectedBloodType === "Platelets"}
                            onChange={() => setSelectedBloodType("Platelets")}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', marginBottom: 20 }}>

                        <CustomCheckbox
                            label="Plasma"
                            isChecked={selectedBloodType === "Plasma"}
                            onChange={() => setSelectedBloodType("Plasma")}
                        />
                        <CustomCheckbox
                            label="I Don't Know"
                            isChecked={selectedBloodType === "I Don't Know"}
                            onChange={() => setSelectedBloodType("I Don't Know")}
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

                    <Text style={styles.inputLabel}>Medical Reason: </Text>

                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', marginRight: 22 }}>

                        <CustomCheckbox
                            label="Thalassemia"
                            isChecked={selectedMedicalReason === "Thalassemia"}
                            onChange={() => setSelectedMedicalReason("Thalassemia")}
                        />
                        <CustomCheckbox
                            label="Surgery"
                            isChecked={selectedMedicalReason === "Surgery"}
                            onChange={() => setSelectedMedicalReason("Surgery")}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', marginRight: 26 }}>

                        <CustomCheckbox
                            label="Accident"
                            isChecked={selectedMedicalReason === "Accident"}
                            onChange={() => setSelectedMedicalReason("Accident")}
                        />
                        <CustomCheckbox
                            label="Cancer"
                            isChecked={selectedMedicalReason === "Cancer"}
                            onChange={() => setSelectedMedicalReason("Cancer")}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', marginBottom: 20, marginRight: 35 }}>

                        <CustomCheckbox
                            label="Pregnancy"
                            isChecked={selectedMedicalReason === "Pregnancy"}
                            onChange={() => setSelectedMedicalReason("Pregnancy")}
                        />
                        <CustomCheckbox
                            label="Other"
                            isChecked={selectedMedicalReason === "Other"}
                            onChange={() => setSelectedMedicalReason("Other")}
                        />
                    </View>
                </View>
                <View>
                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primaryRed} />
                    ) : (
                        <Button title="Request Blood" onPress={requestAddOn} />
                    )}
                </View>
            </ScrollView>



        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    inputLabel: {
        color: '#CF0A0A',
        fontWeight: 'bold',
        marginTop: 4,
        marginBottom: 1,
    },


});
export default RequestPage;