import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, RequestPage, Profile, Menu, EventPage, MapPage } from "../screens/MainScreens";
import { TouchableOpacity, Text, Image } from "react-native";
import { icons } from '../constants';
import { COLORS, FONTS, SIZES } from "../constants/themes";

import TabBarIcons from '../constants/TabBarIcons';
import DonorPage from '../screens/MainScreens/DonorPage';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();




function Bottomtab({ navigation }) {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let icon;

                    if (route.name === 'Home') {
                        icon = focused ? icons.home : icons.home;
                    } else if (route.name === 'RequestPage') {
                        icon = focused ? icons.requsetIcon : icons.requsetIcon;
                    } else if (route.name === 'DonorPage') {
                        icon = focused ? icons.donorIcon : icons.donorIcon;
                    } else if (route.name === 'EventPage') {
                        icon = focused ? icons.eventIcon : icons.eventIcon;
                    } else if (route.name === 'MapPage') {
                        icon = focused ? icons.mapWhite : icons.mapWhite;
                    }

                    return <TabBarIcons focused={focused} icon={icon} />;
                },
                tabBarStyle: {
                    backgroundColor: 'white',
                    elevation: 20,
                    shadowColor: 'black',
                    shadowOpacity: 0.4,
                    shadowRadius: 4,
                    shadowOffset: 50,


                    borderTopWidth: 0.6,
                    borderTopColor: 'grey',


                    height: 85




                },
                tabBarIconStyle: { marginBottom: -10 },
                tabBarLabelStyle: { marginBottom: 10, marginTop: 10, color: 'black', fontWeight: 'bold', fontSize: 12, }
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{
                title: 'Home',

                headerTitleStyle: { color: 'white', fontSize: 40, },
                headerStyle: {
                    backgroundColor: '#CF0A0A',
                    height: 120,
                    elevation: 20,
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 6,
                    shadowOpacity: 0.3,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10
                },
                headerLeft: () => ( // Custom header with image

                    <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                        <Image
                            source={icons.profilePicWhite} // Replace with actual image path
                            style={{ width: 55, height: 55, marginRight: 10, marginLeft: 30 }}
                        />
                    </TouchableOpacity>
                ),
            }} />

            <Tab.Screen name="RequestPage" component={RequestPage}
                options={{
                    title: 'Request',
                    headerTitle: 'Request Tab',
                    headerTitleStyle: { color: 'white', fontSize: 45, marginLeft: 65 },
                    headerStyle: {
                        backgroundColor: '#CF0A0A',
                        height: 120,
                        elevation: 20,
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 6,
                        shadowOpacity: 0.3,
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                    },
                }} />
            <Tab.Screen name="DonorPage" component={DonorPage}
                options={{
                    title: 'Donors',
                    headerTitle: 'Donors Tab',
                    headerTitleStyle: { color: 'white', fontSize: 45, marginLeft: 65 },
                    headerStyle: {
                        backgroundColor: '#CF0A0A',
                        height: 120,
                        elevation: 20,
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 6,
                        shadowOpacity: 0.3,
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                    },
                }} />
            <Tab.Screen name="EventPage" component={EventPage} options={{
                title: 'Events',
                headerTitle: 'Events Tab',
                headerTitleStyle: { color: 'white', fontSize: 45, marginLeft: 78 },
                headerStyle: {
                    backgroundColor: '#CF0A0A',
                    height: 120,
                    elevation: 10,
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 6,
                    shadowOpacity: 0.3,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,



                },
            }} />
            <Tab.Screen name="MapPage" component={MapPage} options={{
                title: 'Map',
                headerTitle: 'Location Tab',
                headerTitleStyle: { color: 'white', fontSize: 45, marginLeft: 55 },
                headerStyle: {
                    backgroundColor: '#CF0A0A',
                    height: 120,
                    elevation: 20,
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 6,
                    shadowOpacity: 0.3,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                },
            }} />

        </Tab.Navigator>
    )
}

export default Bottomtab;