import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const UpdateInventory = ({ route, navigation }) => {
  const { item, onUpdate } = route.params; // Get the item to update and the callback function for updating

  const [quantityChange, setQuantityChange] = useState(''); // Positive or negative quantity change

  // Function to handle the update
  const handleUpdate = () => {
    if (!quantityChange) {
      // Validation: Ensure a quantity change is provided
      alert('Please enter a quantity change.');
      return;
    }

    const newQuantity = item.quantity + parseInt(quantityChange, 10);
    
    if (newQuantity < 0) {
      // Validation: Prevent negative quantity
      alert('Quantity cannot be negative.');
      return;
    }

    onUpdate(item.id, newQuantity); // Call the callback function to update the item in the inventory list
    navigation.goBack(); // Return to the Inventory screen
  };

  // Function to format the quantity with a leading '0' if it's less than 10
  const formatQuantity = (quantity) => {
    return quantity < 10 ? `0${quantity}` : `${quantity}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Inventory</Text>
      <Text style={styles.itemName}>{item.itemName}</Text>
      <Text style={styles.quantityLabel}>Current Quantity: {formatQuantity(item.quantity)}</Text>

      <TextInput
        placeholder="Quantity Change (+/-)"
        value={quantityChange}
        onChangeText={(text) => setQuantityChange(text)}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Quantity</Text>
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
    color:COLORS.primaryRed,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:5,
    marginBottom: 10,
  },
  quantityLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 8,
    marginBottom: 20,
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

export default UpdateInventory;
