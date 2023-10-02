import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { COLORS, images } from '../../constants';

// Define your inventory data structure
const allInventoryItems = [
  { id: 1, itemName: 'A+', quantity: 10 },
  { id: 2, itemName: 'A-', quantity: 5 },
  { id: 3, itemName: 'B+', quantity: 20 },
  { id: 4, itemName: 'B-', quantity: 15 },
  { id: 5, itemName: 'AB+', quantity: 10 },
  { id: 6, itemName: 'AB-', quantity: 5 },
  { id: 7, itemName: 'O+', quantity: 20 },
  { id: 8, itemName: 'O-', quantity: 15 },
];

const Inventory = () => {
  const navigation = useNavigation();
  const [inventoryItems, setInventoryItems] = useState(allInventoryItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(''); // State to store selected blood group


  // Function to handle the "Update" button press
  const handleUpdate = (item) => {
    // Navigate to the "UpdateInventoryScreen"
    navigation.navigate('UpdateInventory', { item, onUpdate: onUpdate });

  };

    // Function to update the quantity of an item
    const onUpdate = (itemId, newQuantity) => {
      // Find the item by its ID
      const updatedItems = inventoryItems.map((item) => {
        if (item.id === itemId) {
          // Update the quantity for the matched item
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
  
      // Update the state with the new inventory
      setInventoryItems(updatedItems);
    };
  

  // Function to add a new inventory item
const handleAddNewItem = (newItem, bloodGroup) => {
  // Check if the blood group already exists in the inventory
  const existingItem = inventoryItems.find((item) => item.itemName === bloodGroup);

  if (existingItem) {
    // Blood group already exists, show an error or handle it as needed
    alert('Blood group already exists in the inventory');
  } else {
    // Blood group does not exist, add the new item
    newItem.itemName = bloodGroup;
    setInventoryItems([...inventoryItems, newItem]);
  }
};


  // Function to search for inventory items
  const handleSearch = () => {
    const filteredItems = inventoryItems.filter((item) =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredItems);
  };

  // Function to navigate to a screen when an item is pressed
  const navigateToItemScreen = (item) => {
    // You can replace 'ItemScreen' with the name of the screen you want to navigate to
    navigation.navigate('ItemScreen', { item });
  };
  const formatQuantity = (quantity) => {
    return quantity < 10 ? `0${quantity}` : `${quantity}`;
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Inventory List</Text>

        {/* Search Bar */}
        <TextInput
          placeholder="Search Inventory Items"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={styles.searchInput}
        />

        {/* Search Button */}
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <FlatList
            style={styles.Flatlist}
            data={searchResults.length > 0 ? searchResults : inventoryItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleUpdate(item)}>
           <View style={styles.listItem}>
              <Text style={styles.inventoryItem}>{item.itemName}</Text>
              <Text style={styles.quantity}>Units Available : {formatQuantity(item.quantity)}</Text>
          </View>
        </TouchableOpacity>
  )}
/>

<TouchableOpacity
  style={styles.button}
  onPress={() =>
    navigation.navigate("AddInventoryItem", {
      onAddItem: handleAddNewItem,
      selectedBloodGroup: selectedBloodGroup,
    })
  }
>
  <Text style={styles.buttonText}>Add New Item</Text>
</TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    padding: 10,
  },
  Flatlist: {
    padding: 10,
    marginBottom: 15,
    borderColor: COLORS.black,
  },
  title: {
    color: COLORS.primaryRed,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 5,
  },
  searchInput: {
    width: '99%',
    marginLeft:5,
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 5,
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    borderColor: COLORS.black,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white', // Background color for each item
  },
  inventoryItem: {
    flex: 1,
    fontWeight:'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 10,
    marginBottom: 20,
    backgroundColor: COLORS.primaryRed,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  
  quantity: {
    fontWeight: 'bold',
    marginRight:10,
    
  },
});

export default Inventory;
