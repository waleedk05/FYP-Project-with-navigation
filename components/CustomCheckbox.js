import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CustomCheckbox = ({ label, isChecked, onChange }) => {
    return (
        <TouchableOpacity onPress={onChange}>
            <View style={styles.checkboxContainer}>
                <View style={isChecked ? styles.checkboxChecked : styles.checkbox}></View>
                <Text>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginRight: 10,
    },
    checkboxChecked: {
        width: 20,
        height: 20,
        backgroundColor: '#CF0A0A',
        borderRadius: 5,
        marginRight: 10,
    },
});

export default CustomCheckbox;
