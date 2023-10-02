import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { COLORS } from '../../constants';
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'; // Added necessary imports for Firestore
import { db } from "../../config";
import { getAuth } from 'firebase/auth'; // Added import for getting the auth object

const ManageEvent = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    id: '', // Generate a unique ID for the new event
    title: 'New Event', // Predefined title
    location: 'Location', // Predefined location
    startDate: '2023-10-01', // Predefined start date
    endDate: '2023-10-03', // Predefined end date
    interestedUsers: [], // Predefined interested users
  });

  const auth = getAuth(); // Get the authentication object
  const uid = auth.currentUser.uid; // Get the current user's UID

  const updateEventData = (updatedEventData) => {
    // Find the index of the updated event in the events array
    const eventIndex = events.findIndex((event) => event.id === updatedEventData.id);

    if (eventIndex !== -1) {
      // Create a copy of the events array
      const updatedEvents = [...events];
      // Update the event data at the found index
      updatedEvents[eventIndex] = updatedEventData;
      // Set the state with the updated events array
      setEvents(updatedEvents);
    }
  };

  const addEvent = async () => {
    // Validate event data (add your validation logic here)
    if (newEvent.title && newEvent.location && newEvent.startDate && newEvent.endDate) {
      // Generate a unique ID for the new event (you can use a library or a server-generated ID)
      const newEventId = Math.random().toString(36).substr(2, 9);

      // Create a new event object
      const eventToAdd = {
        id: newEventId,
        title: newEvent.title,
        location: newEvent.location,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate,
        interestedUsers: newEvent.interestedUsers,
      };

      // Add the new event to the events list
      setEvents([...events, eventToAdd]);

      // Add the new event to Firestore
      const eventsCollection = collection(db, 'events');
      await addDoc(eventsCollection, eventToAdd);

      // Clear the new event data
      setNewEvent({
        id: '', // Generate a unique ID for the new event
        title: 'New Event', // Predefined title
        location: 'Location', // Predefined location
        startDate: '2023-10-01', // Predefined start date
        endDate: '2023-10-03', // Predefined end date
        interestedUsers: [], // Predefined interested users
      });
    } else {
      // Handle validation errors or display an error message
      alert('Please fill in all event details.');
    }
  };

  const toggleInterest = async (eventId, isGoing) => {
    try {
      const eventRef = doc(db, 'events', eventId);
      await updateDoc(eventRef, {
        interestedUsers: isGoing ? arrayUnion(uid) : arrayRemove(uid)
      });
    } catch (error) {
      console.error('Error toggling interest:', error);
    }
  };

  const fetchData = async () => {
    try {
      const eventsCollection = collection(db, 'events');
      const snapshot = await getDocs(eventsCollection);
      const eventData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching events: ', error);
    }
  };
  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventItem}
            onPress={() => navigation.navigate('EditEvent', { event: item, updateEventData })}
          >
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventLocation}>{item.location}</Text>
            <Text style={styles.eventDates}>
              {`${new Date(item.startDate).toLocaleDateString()} - ${new Date(item.endDate).toLocaleDateString()}`}
            </Text>
            <Text style={styles.eventInterested}>
              {item.interestedUsers ? `${item.interestedUsers.length} Interested` : '0 Interested'}
            </Text>

          </TouchableOpacity>
        )}
      />
      <TextInput
        placeholder="Event Title"
        value={newEvent.title}
        onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
        style={styles.input}
      />
      {/* Add more input fields for event details */}
      <TouchableOpacity style={styles.button} onPress={addEvent} >

        <Text style={styles.buttonText}>Add New Event</Text></TouchableOpacity>
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
    marginBottom: 30,
    alignSelf: 'center'
  },
  eventItem: {
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  button: {
    backgroundColor: COLORS.primaryRed,
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
  },
  input: {
    height: 55,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 10,
    fontSize: 15
  },
});

export default ManageEvent;
