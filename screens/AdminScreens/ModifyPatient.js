import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { icons, COLORS } from '../../constants';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../config';
import { collection, addDoc } from 'firebase/firestore';

const ModifyPatient = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { patientData, uniqueID } = route.params || {};

  const [editedData, setEditedData] = useState({
    patientID: uniqueID || '', // Use the generated patient ID
    age: patientData.age || '',
    registrationDate: patientData.registrationDate || '',
    previousAppointment: patientData.previousAppointment || '',
    upcomingAppointment: patientData.upcomingAppointment || '',
    bloodGroup: patientData.bloodGroup || '', // New state for blood group
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateField, setDateField] = useState('');

  const [selectedBloodGroup, setSelectedBloodGroup] = useState(editedData.bloodGroup); // State for selected blood group

  const showDatePicker = (field) => {
    setDatePickerVisibility(true);
    setDateField(field);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (selectedDate) => {
    hideDatePicker();
    if (dateField) {
      setEditedData({ ...editedData, [dateField]: selectedDate });
    }
    if (dateField) {
      if (dateField === 'age') {
        // Calculate age based on the selected date
        const birthDate = new Date(selectedDate);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();

        // Check if the birthdate for this year has occurred or not
        if (
          currentDate.getMonth() < birthDate.getMonth() ||
          (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
        ) {
          // Subtract 1 if the birthdate for this year hasn't occurred yet
          setEditedData({ ...editedData, age: (age - 1).toString() });
        } else {
          setEditedData({ ...editedData, age: age.toString() });
        }
      } else {
        // Convert the selectedDate to an ISO date string
        const dateValue = selectedDate.toISOString().split('T')[0];
        setEditedData({ ...editedData, [dateField]: dateValue });
      }
    }
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes to patient data
    // This is where you would update the patient data with the editedData


    // Create a new object for the updated patient data, including the selected blood group
    const updatedPatientData = {
      ...patientData, // Include the original data
      ...editedData, // Include the edited data
      name: patientData.name, // Keep the name unchanged
      patientID: editedData.patientID, // Include the updated patientID
      bloodGroup: selectedBloodGroup, // Include the selected blood group
    };

    addDoc(collection(db, 'patients'), updatedPatientData)
      .then(() => {
        console.log('Patient data updated and added to Firestore');
        //After Saving Changes Navigate back to View Patient Screen
        navigation.navigate('ViewPatient', { patientData: updatedPatientData });
      })
      .catch((error) => {
        console.error('Error updating patient data in Firestore:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Patient Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Patient ID"
        value={editedData.patientID}
        keyboardType="numeric"
        editable={false} // Make the field uneditable
      />
      {/* Age Picker */}
      <View style={styles.datePickerContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="Age"
          value={editedData.age.toString()}
          editable={false}
        />
        <TouchableOpacity onPress={() => showDatePicker('age')}>
          <Image style={{ marginLeft: 10, marginRight: 10 }} source={icons.datepicker1} />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      {/* Registration Date Picker */}
      <View style={styles.datePickerContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="Registration Date"
          value={editedData.registrationDate.toString()}
          editable={false}
        />
        <TouchableOpacity onPress={() => showDatePicker('registrationDate')}>
          <Image style={{ marginLeft: 10, marginRight: 10 }} source={icons.datepicker1} />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      {/* Previous Appointment Picker */}
      <View style={styles.datePickerContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="Previous Appointment"
          value={editedData.previousAppointment.toString()}
          editable={false}
        />
        <TouchableOpacity onPress={() => showDatePicker('previousAppointment')}>
          <Image style={{ marginLeft: 10, marginRight: 10 }} source={icons.datepicker1} />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      {/* Upcoming Appointment Picker */}
      <View style={styles.datePickerContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="Upcoming Appointment"
          value={editedData.upcomingAppointment.toString()}
          editable={false}
        />
        <TouchableOpacity onPress={() => showDatePicker('upcomingAppointment')}>
          <Image style={{ marginLeft: 10, marginRight: 10 }} source={icons.datepicker1} />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      {/* Blood Group Picker */}
      <Text style={styles.pickerLabel}>Blood Group:</Text>
      <View style={styles.pickerContainer}>


        <Picker
          style={styles.picker}
          selectedValue={selectedBloodGroup}
          onValueChange={(itemValue) => setSelectedBloodGroup(itemValue)}
        >
          <Picker.Item label="Select Blood Group" value="" />
          <Picker.Item label="A+" value="A+" />
          <Picker.Item label="B+" value="B+" />
          <Picker.Item label="AB+" value="AB+" />
          <Picker.Item label="O+" value="O+" />
          <Picker.Item label="A-" value="A-" />
          <Picker.Item label="B-" value="B-" />
          <Picker.Item label="AB-" value="AB-" />
          <Picker.Item label="O-" value="O-" />
        </Picker>
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: COLORS.primaryRed,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 10
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateInput: {
    color: 'black',
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ccc',
    padding: 10,
  },
  input: {
    height: 52,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 10,
    marginRight: 68,
    marginBottom: 16,
    paddingHorizontal: 8,

  },
  saveButton: {
    backgroundColor: COLORS.primaryRed,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginRight: 50,
    marginLeft: 50
  },
  saveButtonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 10,
    padding: 2
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10

  },
  picker: {
    flex: 2,


  },
});

export default ModifyPatient;