import { Image } from 'react-native'
import React from 'react'
import icons from './icons'

const TabBarIcons = ({ focused, icon }) => {
    return (
        <Image
            source={icon}
            style={{ width: 23, height: 23, tintColor: focused ? '#CF0A0A' : 'grey' }}
        />
    );
};

export default TabBarIcons;