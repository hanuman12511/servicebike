


// React Native Geolocation
// https://aboutreact.com/react-native-geolocation/
import Geocoder from 'react-native-geocoding';
// import React in our code
import React, {useState, useEffect, useCallback} from 'react';
import GetLocation from 'react-native-get-location'
// import all the components we are going to use
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';

//import all the components we are going to use.
import Geolocation from '@react-native-community/geolocation';
import { useFocusEffect } from '@react-navigation/native';

const Map1 = () => {

  const[address,setAddres] =useState([])
  const[Singleaddress,setSingleAddres] =useState('')
 console.log(address);
 
  useEffect(()=>{
    setSingleAddres(address[0]?.formatted_address)
   
  },[address])


  console.log(Singleaddress);
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
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
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
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
  }, []);

  const getOneTimeLocation = () => {

 
    
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    })
    .then(location => {
        console.log("lo91",location);
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
 


    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');


        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);
          
            Geocoder.init("AIzaSyBb3j8Aiv60CadZ_wJS_5wg2KBO6081a_k");
          Geocoder.from(position.coords.latitude, position.coords.longitude).then(json => {setAddres(json.results)}).catch(d=>{console.log("erro",d)});
       

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );


   
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        
        setLocationStatus('You are Here');
        console.log(position);

        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };
/* console.log(address[0]?.formatted_address); */

 /*  address&&address.map(async(value,index)=>{
    if(index==0){
  console.log
  (value.formatted_address)
    }
  })
  console.log(Singleaddress); */
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
            }}
            style={{width: 100, height: 100}}
          />
          <Text style={styles.boldText}>
            {locationStatus}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Latitude: {currentLatitude}
          </Text>
          <Text>{Singleaddress}</Text>
          <View style={{marginTop: 20}}>
            <Button
              title="Refresh"
              onPress={getOneTimeLocation}
            />
          </View>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          React Native Geolocation
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
    textAlign: 'center'
  },
});

export default Map1;

/* import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { GeoCoordinates } from 'react-native-geolocation-service';
import RNMapView, { Circle, Marker } from 'react-native-maps';

interface MapViewProps {
  coords: GeoCoordinates | null;
}

const Map1= ({ coords }: MapViewProps) => {
  const mapRef = useRef<RNMapView>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
            console.log(position);
            
          //getting the Longitude from the location json
          const currentLongitude =
            JSON.stringify(position.coords.longitude);
      
          //getting the Latitude from the location json
          const currentLatitude =
            JSON.stringify(position.coords.latitude);
            
         }, (error) => alert(error.message), { 
           enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
         }
      );
    if (!!coords && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 16,
      });
    }
  }, [coords]);

  return (
    <View style={styles.container}>
      <RNMapView
        ref={mapRef}
        initialCamera={{
          altitude: 15000,
          center: {
            latitude: 23.7603,
            longitude: 90.4125,
          },
          heading: 0,
          pitch: 0,
          zoom: 11,
        }}
        loadingEnabled
        loadingBackgroundColor="white"
        style={StyleSheet.absoluteFillObject}
        rotateEnabled={false}>
        {!!coords && (
          <>
            <Marker
              anchor={{ x: 0.5, y: 0.6 }}
              coordinate={{
                latitude: coords.latitude,
                longitude: coords.longitude,
              }}
              flat
              style={{
                ...(coords.heading !== -1 && {
                  transform: [
                    {
                      rotate: `${coords.heading}deg`,
                    },
                  ],
                }),
              }}>
              <View style={styles.dotContainer}>
                <View style={[styles.arrow]} />
                <View style={styles.dot} />
              </View>
            </Marker>
            <Circle
              center={{
                latitude: coords.latitude,
                longitude: coords.longitude,
              }}
              radius={coords.accuracy}
              strokeColor="rgba(0, 150, 255, 0.5)"
              fillColor="rgba(0, 150, 255, 0.5)"
            />
          </>
        )}
      </RNMapView>
    </View>
  );
};

export default Map1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'rgb(0, 120, 255)',
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 12,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 4,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgb(0, 120, 255)',
  },
}); */