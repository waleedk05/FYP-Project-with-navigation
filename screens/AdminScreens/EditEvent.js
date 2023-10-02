import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button, Alert } from 'react-native';
import { COLORS, icons } from '../../constants';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../../config";
import { ActivityIndicator } from "react-native";


const EditEvent = ({ route, navigation }) => {
  const { event, updateEventData } = route.params; // Get the event details from props
  const [editedEvent, setEditedEvent] = useState(event);

  // Add state variables to manage the date picker visibility and selected dates:
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(event.startDate ? new Date(event.startDate) : null);
  const [endDate, setEndDate] = useState(event.endDate ? new Date(event.endDate) : null);

  // Create functions to handle date picker visibility and selected dates:

  //Activity Indicator
  const [isLoading, setIsLoading] = useState(false);
  const [eventID, setEventID] = useState(event.eventID || ''); // Initialize with existing eventID or empty string

  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };

  const handleStartDateConfirm = (date) => {
    setStartDate(date);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const handleEndDateConfirm = (date) => {
    setEndDate(date);
    hideEndDatePicker();
  };

  const eventsRef = collection(db, 'events');
  const handleSaveChanges = async () => {
    setIsLoading(true); // Start showing the activity indicator
    // Implement logic to save the changes made to the event
    // ...

    // Add the event to Firestore
    try {
      const eventData = {
        title: editedEvent.title,
        location: editedEvent.location,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        eventID: eventID || doc(collection(db, 'events')).id, // Use existing or generate a new one
      };

      await addDoc(eventsRef, eventData);
      // Call the updateEventData callback to update the event data
      updateEventData({
        ...editedEvent,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        eventID: eventData.eventID,
      });

      // Navigate back to the ManageEvent screen
      navigation.goBack();
    } catch (error) {
      console.error('Error adding event to Firestore: ', error);
    } finally {
      setIsLoading(false); // Stop showing the activity indicator
    }
  };

  const deleteEvent = async () => {
    setIsLoading(true);

    try {
      const eventRef = doc(db, 'events', eventID); // Use eventID here
      await deleteDoc(eventRef);

      updateEventData(null);
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting event from Firestore: ', error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Event</Text>
      {/* Event Title Input */}
      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={editedEvent.title}
        onChangeText={(text) => setEditedEvent({ ...editedEvent, title: text })}
      />

      {/* Location Input */}
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={editedEvent.location}
        onChangeText={(text) => setEditedEvent({ ...editedEvent, location: text })}
      />

      {/* Starting Date Picker */}
      <View style={styles.datePickerContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="Starting Date"
          value={startDate ? startDate.toLocaleDateString() : 'Not Selected'}
          editable={false} // Prevent editing the text input
        />
        <TouchableOpacity onPress={showStartDatePicker}>
          <Image style={{ marginLeft: 10, marginRight: 10 }} source={icons.datepicker1} />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
      />

      {/* Ending Date Picker */}
      <View style={styles.datePickerContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="Ending Date"
          value={endDate ? endDate.toLocaleDateString() : 'Not Selected'}
          editable={false} // Prevent editing the text input
        />
        <TouchableOpacity onPress={showEndDatePicker}>
          <Image style={{ marginLeft: 10, marginRight: 10 }} source={icons.datepicker1} />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleEndDateConfirm}
        onCancel={hideEndDatePicker}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            'Delete Event',
            'Are you sure you want to delete this event?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'Delete', onPress: () => deleteEvent(eventID) }, // Pass the event ID to deleteEvent
            ],
            { cancelable: false }
          );
        }}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.deleteButtonText}>Delete Event</Text>
        )}
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: COLORS.primaryRed,
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginTop: 40,
    marginRight: 50,
    marginLeft: 50
  },
  deleteButton: {
    backgroundColor: COLORS.primaryRed,
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginTop: 30,
    marginRight: 50,
    marginLeft: 50
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateInput: {
    color: COLORS.black,
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    padding: 12,
  },

  selectedDateText: {
    fontSize: 16,
    marginBottom: 16,
  },
  title: {
    color: COLORS.primaryRed,
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 30,
    alignSelf: 'center'
  },
});

export default EditEvent;
