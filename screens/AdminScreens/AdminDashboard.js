import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { COLORS, FONTS, SIZES } from "../../constants/themes";
import { admins } from '../../constants/data';
import { useNavigation } from '@react-navigation/native'

const AdminDashboard = () => {
    const navigation = useNavigation();
    const handleIconPress = (screenName) => {
        navigation.navigate(screenName);
    };


    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 12,
                }}
            >
                <TouchableOpacity onPress={() => console.log('Pressed')}>
                    <MaterialCommunityIcons
                        name="view-dashboard"
                        size={28}
                        color={COLORS.primaryRed}
                    />
                </TouchableOpacity>
                <View>
                    <View
                        style={{
                            height: 6,
                            width: 6,
                            backgroundColor: COLORS.primaryRed,
                            borderRadius: 3,
                            position: 'absolute',
                            right: 5,
                            top: 5,
                        }}
                    ></View>
                    <TouchableOpacity onPress={() => console.log('Pressed')}>
                        <Ionicons
                            name="notifications-outline"
                            size={28}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    function renderFeatures() {
        return (
            <View
                style={{
                    marginVertical: SIZES.padding,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}
            >

                {admins.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            height: 120,
                            width: 110,
                            borderColor: COLORS.secondaryWhite,
                            borderWidth: 2,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 22,
                        }}
                        onPress={() => handleIconPress(category.screen)}
                    >
                        <Image
                            source={category.icon}
                            resizeMode="contain"
                            style={{
                                height: 40,
                                width: 40,
                                marginVertical: 12,
                            }}
                        />
                        <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.black,
                            }}
                        >
                            {category.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ marginHorizontal: 22 }}>
                {renderHeader()}
                {renderFeatures()}
            </View>
        </SafeAreaView>
    )
}

export default AdminDashboard;
