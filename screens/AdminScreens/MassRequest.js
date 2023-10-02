import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { COLORS } from '../../constants';

const MassRequest = () => {
  const [region, setRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');

  useEffect(() => {
    // Get the user's current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const GoogleplacesInput = (data, details) => {
    // Handle the selected location from Google Places Autocomplete
    const location = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };
    setSelectedLocation(location);
  };

  const handleSendRequest = () => {
    // Implement logic to send the request with selectedBloodGroup and selectedLocation.
    // You can send data to your server or perform any desired action.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blood Donation Request</Text>

      {/* Blood Group Picker */}
      <Picker
        selectedValue={selectedBloodGroup}
        onValueChange={(value) => setSelectedBloodGroup(value)}
        style={styles.input}
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

      {/* Google Places Autocomplete */}
      <GooglePlacesAutocomplete
        placeholder="Search for a location"
        onPress={(data, details) => console.log(data, details)}
        query={{
          key: 'AIzaSyB30d3Q2mphuzlMNXYZojiH6sicXbyJyfY',
          language: 'en',
          type:'(cities)'
        }}
        styles={{
          textInput: styles.input,
        }}
        onFail={error => console.error('Error:', error)} // Add this line
      />

      {/* Map */}
      {region && (
        <MapView
          style={styles.map}
          initialRegion={region}
          region={region}
          showsUserLocation
        >
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
            />
          )}
        </MapView>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSendRequest}>
        <Text style={styles.buttonText}>Send Request</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.black,
    elevation: 10,
    padding: 8,
    marginBottom: 20,
  },
  map: {
    flex: 1,
    height: 400,
    marginBottom: 40,
  },
  button: {
    backgroundColor: COLORS.primaryRed,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
});

export default MassRequest;