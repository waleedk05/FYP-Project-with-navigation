import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import Bottomtab from "./components/tabnavigate";

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {
  GetStarted,
  Signin,
  Signup,
  ResetPassword,

} from "./screens/AuthenticationScreens";

import {
  MassRequest,
  ManageRequest,
  ManageEvents,
  PatientInfo,
  Registration,
  Inventory,
  AdminDashboard,
  AddPatient,
  ModifyPatient,
  ViewPatient,
  EditEvent,
  UpdateInventory,
  AddInventoryItem,
  ViewInventoryDetails,
} from "./screens/AdminScreens"

import { About, Invite, Menu, Settings } from "./screens/MainScreens";



SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();




export default function App() {




  const [fontLoaded] = useFonts({
    HeeboRegular: require("./assets/fonts/Heebo-Regular.ttf"),
    PoppinBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });


  useEffect(() => {
    // Initialize Firebase Auth
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Handle the authentication state change here
      if (user) {
        console.log('User is signed in:', user);
        // Redirect to logged-in state or do any other necessary actions
      } else {
        console.log('User is signed out');
        // Redirect to logged-out state or do any other necessary actions
      }
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);


  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);
  if (!fontLoaded) {
    return null;
  }


  return (

    <NavigationContainer onReady={onLayoutRootView} initialRouteName="GetStarted">
      <Stack.Navigator>

        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }} />



        <Stack.Screen name="tabnavigate" component={Bottomtab} options={{ headerShown: false }} />

        <Stack.Screen name='Menu' component={Menu} options={{
          title: 'Menu', headerStyle: { backgroundColor: '#CF0A0A' }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white'
        }} />
        <Stack.Screen name='Invite' component={Invite} options={{
          title: 'Invite', headerStyle: { backgroundColor: '#CF0A0A' }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white'
        }} />
        <Stack.Screen name='About' component={About} options={{
          title: 'About', headerStyle: { backgroundColor: '#CF0A0A' }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white'
        }} />
        <Stack.Screen name='Settings' component={Settings} options={{
          title: 'Settings', headerStyle: { backgroundColor: '#CF0A0A' }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white'
        }} />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MassRequest"
          component={MassRequest}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ManageRequest"
          component={ManageRequest}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ManageEvents"
          component={ManageEvents}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PatientInfo"
          component={PatientInfo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Inventory"
          component={Inventory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ModifyPatient"
          component={ModifyPatient}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddPatient"
          component={AddPatient}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ViewPatient"
          component={ViewPatient}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditEvent"
          component={EditEvent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UpdateInventory"
          component={UpdateInventory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddInventoryItem"
          component={AddInventoryItem}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ViewInventoryDetails"
          component={ViewInventoryDetails}
          options={{
            headerShown: false,
          }}
        />



      </Stack.Navigator>


    </NavigationContainer>


  );
}
