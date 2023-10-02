import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../constants';

const AddPatient = ({ route }) => {
  const navigation = useNavigation();
  const [patientName, setPatientName] = useState('');
  const { onAddPatient } = route.params;

  const handleAddPatient = () => {
    if (patientName) {
      // Generate a unique ID for the new patient (you can use a library or a server-generated ID)
      const SerialId = Math.random().toString(36).substr(2, 9);

      // Create a new patient object
      const newPatient = {
        id: SerialId,
        name: patientName,
      };

      // Pass the new patient data back to the PatientInfo screen
      onAddPatient(newPatient);

      // Navigate back to the PatientInfo screen
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Patient</Text>
      <TextInput
        style={styles.input}
        placeholder="Patient Name"
        value={patientName}
        onChangeText={(text) => setPatientName(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPatient}>
        <Text style={styles.buttonText}>Add Patient</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: 15,
    marginRight: 15
  },
  title: {
    color: COLORS.primaryRed,
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 36,
    marginTop: 10,
    alignSelf: 'center'
  },
  input: {
    height: 55,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 56,
    paddingHorizontal: 10,
    fontSize: 16
  },
  button: {
    backgroundColor: COLORS.primaryRed,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginLeft: 50,
    marginRight: 50
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
});

export default AddPatient;