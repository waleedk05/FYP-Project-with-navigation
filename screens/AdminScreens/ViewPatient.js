import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants';

const PatientDetails = ({ route }) => {
  const { patientData } = route.params;
  const navigation = useNavigation();
  const [counter, setCounter] = useState(0); // Add this line

  const handleEdit = () => {
    // Generate a unique ID for the patient

    const generatePatientID = () => {
      setCounter(counter + 1); // Increment counter
      const formattedID = counter.toString().padStart(3, '0');
      console.log(formattedID)
      return formattedID;
    };
    const uniquePatientID = generatePatientID(); // Generate a new patient ID

    // Pass the patient ID along with the patient data to the ModifyPatient screen
    // Navigate to the EditPatient screen with the patientData
    navigation.navigate('ModifyPatient', { patientData, uniqueID: uniquePatientID });
  };



  const handleBack = () => {
    // Navigate back to the PatientInfo screen
    navigation.navigate('PatientInfo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name: {patientData.name}</Text>

      {/* First Row */}
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Patient ID:</Text>
            <Text style={styles.infoValue}>{patientData.patientID}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Age:</Text>
            <Text style={styles.infoValue}>{patientData.age}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Blood Group:</Text>
            <Text style={styles.infoValue}>{patientData.bloodGroup}</Text>
          </View>
        </View>

        {/* Second Row */}
        <View style={styles.column}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Registration:</Text>
            <Text style={styles.infoValue}>{patientData.registrationDate}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Previous Visit:</Text>
            <Text style={styles.infoValue}>{patientData.previousAppointment}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Upcoming Visit:</Text>
            <Text style={styles.infoValue}>{patientData.upcomingAppointment}</Text>
          </View>
        </View>
      </View>

      {/* Edit Button */}
      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.button} onPress={handleBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 40
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    flex: 1,
  },
  infoItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    margin: 4,
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primaryRed,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 15,
    marginLeft: 50,
    marginRight: 50
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
});

export default PatientDetails;