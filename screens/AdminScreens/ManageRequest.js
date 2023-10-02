import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../config";

const ManageRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestCollection = collection(db, 'requests');
        const snapshot = await getDocs(requestCollection);
        const requestData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRequests(requestData);
      } catch (error) {
        console.error('Error fetching requests: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.requestItem}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.requestHeading}>Blood Type:</Text>
              <Text style={styles.requestValue}> {item.bloodType}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.requestHeading}>Blood Group:</Text>
              <Text style={styles.requestValue}> {item.bloodGroup}</Text>

            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.requestHeading}>Medical Reason:</Text>
              <Text style={styles.requestValue}> {item.medicalReason}</Text>

            </View>

          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.secondaryWhite
  },
  title: {
    color: COLORS.primaryRed,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center'
  },
  requestItem: {
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  requestHeading: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  requestValue: {
    fontSize: 18,
    marginBottom: 4,
  },

});

export default ManageRequest;
