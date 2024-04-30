import Geocoder from 'react-native-geocoding';
import React, {useState, useEffect, Children} from 'react';
import GetLocation from 'react-native-get-location'
import {
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { storeData } from './Storage';

let location1 :any=null
const getOneTimeLocation = () => {
 
 Geolocation.getCurrentPosition(
    //Will give you the current location
    async(position) => {
        Geocoder.init("AIzaSyBb3j8Aiv60CadZ_wJS_5wg2KBO6081a_k");
       location1= await Geocoder.from(position.coords.latitude, position.coords.longitude)
        .then(json => {return json.results[0]?.formatted_address})
        .catch(d=>
          {console.log("erro",d)}
          )

     storeData("loc",location1)
     console.log(location1);
     
    },
    (error) => {
     
    },
    {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 1000
    },
  );

};

const LocationGeo=()=>{
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
    // subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
        } else {
         
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  requestLocationPermission();
  return () => {
    Geolocation.clearWatch(watchID);
  };

}

export {LocationGeo}