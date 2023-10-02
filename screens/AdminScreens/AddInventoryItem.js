import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants';
import { Picker } from '@react-native-picker/picker';

const AddInventoryItem = ({ route }) => {
  const navigation = useNavigation();
  const [bloodGroup, setBloodGroup] = useState(''); // State to store selected blood group
  const [quantity, setQuantity] = useState('');
  const { onAddItem } = route.params;

  const handleAddItem = () => {
    if (bloodGroup && quantity) {
      // Generate a unique ID for the new item (you can use a library or a server-generated ID)
      const newItemId = Math.random().toString(36).substr(2, 9);
  
      // Set the itemName to the selected blood group
      const itemName = bloodGroup;
  
      // Create a new item object
      const newItem = {
        id: newItemId,
        itemName: itemName,
        quantity: parseInt(quantity),
      };
  
      onAddItem(newItem, bloodGroup); // Confirm that 'newItem' and 'bloodGroup' are correctly passed
  
      // Navigate back to the Inventory screen
      navigation.goBack();
    }
  };  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Inventory Item</Text>

      {/* Blood Group Picker */}
      <Picker
        selectedValue={bloodGroup}
        onValueChange={(value) => setBloodGroup(value)}
        style={styles.picker}
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

      <TextInput
        style={styles.input}
        placeholder="Units"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Add Item</Text>
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
    marginBottom: 16,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: COLORS.primaryRed,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
});

export default AddInventoryItem;
