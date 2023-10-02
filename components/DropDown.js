//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import images from '../constants/images';


const DropDown = ({
    data = [],
    value = {},
    onSelect = () => { }

}) => {
    console.log("selected value", !!value)
    const [showOption, setShowOption] = useState(false)

    const onSelectedItem = (val) => {
        setShowOption(false)
        onSelect(val)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.dropDownStyle}
                activeOpacity={0.8}

                onPress={() => setShowOption(!showOption)}
            >
                <Text style={{ fontSize: 15 }}>{!!value ? value?.name : 'Choose a blood type'}</Text>
                <Image
                    style={{ transform: [{ rotate: showOption ? '180deg' : '0deg' }] }}
                    source={images.downArrow} />

            </TouchableOpacity>
            {showOption && (<View style={{
                backgroundColor: '#DC5252',
                padding: 6,
                borderRadius: 12,
                maxHeight: 500

            }}>
                <ScrollView >
                    {data.map((val, i) => {
                        return (
                            <TouchableOpacity
                                key={String(i)}
                                onPress={() => onSelectedItem(val)}
                                style={{
                                    ...styles.selectedItemStyle,
                                    backgroundColor: value && value.id == val.id ? '#d3d3d3' : '#f5f5f5',
                                }}
                            >
                                <Text>{val.name}</Text>
                            </TouchableOpacity>
                        )

                    })}
                </ScrollView>
            </View>)}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15
    },
    dropDownStyle: {
        backgroundColor: '#f5f5f5',
        padding: 18,
        borderRadius: 9,
        minHeight: 42,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
        borderColor: 'black',
        borderWidth: 1.5,
        elevation: 8,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 10,
    },
    selectedItemStyle: {
        paddingVertical: 18,
        borderRadius: 9,
        paddingHorizontal: 15,
        marginBottom: 5,
        elevation: 8,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 10,

    }
});


export default DropDown;
