import React, { useEffect, useState } from 'react'
import {Text,View,StyleSheet, Image,Animated,  TouchableOpacity,} from 'react-native'
 import bikelogo from '../assets/logo.png'
import { getData } from '../utility/Storage';
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location'
import {
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';


export default function HomeScreen(){
  
    const [animation] = useState(new Animated.Value(0));
    const [location ,setLocation] = useState('');


console.log(location);


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
       setLocation(location1)
         
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
            } else {
             
            }
          } catch (err) {
            console.warn(err);
          }
        }
      };
      requestLocationPermission();
    
    }
    
useEffect(()=>{
        LocationGeo()
    },[])

   
    const startAnimation = () => {
        Animated.timing(animation, {
          toValue: 1,
          duration: 500, // Adjust duration as needed
          useNativeDriver: true,
        }).start();
      };
      const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [400, 0], // Start from bottom (300) to top (0)
      });
      const stopanimation=()=>{
        Animated.timing(animation, {
            toValue: 0,
            duration: 500, // Adjust duration as needed
            useNativeDriver: true,
          }).start();
 }
    return(
        <View style={styles.mainview}>
            <View style={[styles.header]}>
                <View>
                    <Text style={{}}>{'bike'}</Text>
                    <Text style={{}}>{location.slice(0,30)}</Text>
                </View>
                    
                    <TouchableOpacity onPress={startAnimation}>
                    <Image source={bikelogo} style={styles.bikelogo}/>
                    </TouchableOpacity>
            </View>
           
            <Animated.View style={[styles.bikeshow, {transform: [{ translateY }]}]}>
                <View style={styles.innerbikeshowview}>

                </View>
                <View style={styles.closeanimation}>
                    <TouchableOpacity onPress={stopanimation}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}

const styles=StyleSheet.create({
    mainview:{
        flex:1,
        height:100,
        marginHorizontal:20
    },
    header:{
        width:'100%',
        height:70,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    bikelogo:{width:50,height:40
    },
    bikeshow:{
        width:'100%',
        height:400,
        backgroundColor:'#fff',
        position:'absolute',
        bottom:10,
        left:0,
        right:0,
        borderRadius:20,
        elevation:20,
        zIndex:20
       },
       innerbikeshowview:{
        backgroundColor:'yellow',
        height:'70%',
        marginVertical:'15%'

       },
       closeanimation:{
        position:'absolute',
        right:10,
        top:10
       }

})