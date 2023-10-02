import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";

const ViewInventoryDetails = ({ route, navigation }) => {
  const { item } = route.params;

  const [quantity, setQuantity] = useState(item.quantity);

  const handleEditItem = () => {
    navigation.navigate("EditInventoryItem", {
      item,
      onEditItem: (updatedItem) => {
        setQuantity(updatedItem.quantity);
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.itemName}</Text>
      <Text style={styles.quantity}>Quantity: {quantity}</Text>
      <TouchableOpacity style={styles.button} onPress={handleEditItem}>
        <Text style={styles.buttonText}>Edit Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: COLORS.primaryRed,
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 5,
  },
  quantity: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: COLORS.primaryRed,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ViewInventoryDetails;