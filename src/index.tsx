import Geocoder from 'react-native-geocoding';
import React, {useState, useEffect} from 'react';
import GetLocation from 'react-native-get-location'
import {
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()
import NavigationRouter from './navigation'
import auth from '@react-native-firebase/auth';
import firebase from'@react-native-firebase/app' 
import firestore from '@react-native-firebase/firestore';



import {LocationGeo} from './utility/LocationGeo';


export default function App(){
return(
   
      
           
        <NavigationContainer>
        {LocationGeo()} 
            <NavigationRouter/>
        </NavigationContainer>
      
       
      )
}