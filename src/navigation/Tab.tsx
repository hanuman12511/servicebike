import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react'
import {Text,View,StyleSheet, Image,Animated,  TouchableOpacity, FlatList} from 'react-native'
import bikelogo from '../assets/logo.png'
import About from '../screen/About';
import {bike,servicetype} from '../data/data'
import {Linking} from 'react-native'
import HomeScreen from '../screen/HomeScreen';
import Mapp from '../screen/Mapp';
import Map1 from '../screen/Map1';
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location'
import { SliderBox } from "react-native-image-slider-box";
import {
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const BottomTab = createBottomTabNavigator();

function Tab() {
  const [bikeinfo,setBikeInfo] = useState(bike)
  const [bikemodel,setBikemodel] = useState('')
  const [animation] = useState(new Animated.Value(0));
  const [animation1] = useState(new Animated.Value(0));
  const [location ,setLocation] = useState('');
  const [servicetype1 ,setServiceType] = useState(servicetype);

 const  images= [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree", // Network image
    ]
  useEffect(()=>{
 
  },[])

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


    const renderitemservice=(item:any)=>{
     
      let item1= item.item
      
      return(
        <View style={styles.serviceView}>
            <Image source={item1.img} style={styles.serviceimage}/>
            <Text style={styles.servicetextname}>{item1.name}</Text>
            <Text style={styles.servicetextname}>services</Text>
        </View>
      )
    }



  const t1 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0], // Start from bottom (300) to top (0)
  });
 
  const t2 = animation1.interpolate({
    inputRange: [0, 1],
    outputRange: [800, 0], // Start from bottom (300) to top (0)
  });
  useEffect(()=>{
    stopanimation()
    stopanimation1()
  },[])
  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500, // Adjust duration as needed
      useNativeDriver: true,
    }).start();

   
  };
 
  const stopanimation=()=>{
    Animated.timing(animation, {
        toValue: 0,
        duration: 500, // Adjust duration as needed
        useNativeDriver: true,
      }).start();
      setBikemodel("")
  }



  const startAnimation1 = (item:any) => {
    Animated.timing(animation1, {
      toValue: 1,
      duration: 500, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
    setBikemodel(item.model)
  };
 
  const stopanimation1=()=>{
    Animated.timing(animation1, {
        toValue: 0,
        duration: 500, // Adjust duration as needed
        useNativeDriver: true,
      }).start();
      setBikemodel("")
  }
  function HomeScreen1(){
    return(
        <View style={styles.mainview}>
             <View style={styles.mainviewtop}>
            <View style={styles.header}>
            <View>
                    <Text style={styles.headertext}>{'BikeService'}</Text>
                    <Text style={{}}>{location.slice(0,30)}</Text>
                </View>
                    <TouchableOpacity onPress={startAnimation}>
                    <Image source={bikelogo} style={styles.bikelogo}/>
                    </TouchableOpacity>
            </View>
            <SliderBox 
            images={images}
            autoplay
            circleLoop
            />

          </View>
          <View style={styles.serviceshow}>
              <View style={styles.serviceshowtop}>
                  <Text style={styles.serviceshowtoplefttext}>Service Type</Text>
                  <TouchableOpacity>  
                  <Text style={styles.serviceshowtoprighttext}>View More</Text>  
                  </TouchableOpacity>
              </View>  

              <FlatList
              data={servicetype1}
              renderItem={renderitemservice}
              numColumns={3}
              />  
          </View>
        </View>
    )
}
  function Call(){
    return(
      Linking.openURL(`tel:${'+919829139264'}`)
    )
  }
  const renderitem=(item:any)=>{
    return(
    <TouchableOpacity  onPress={()=>startAnimation1(item.item)}>
    <View style={ styles.bikeshow1}> 
    <Image source={item.item.img} style={{width:100,height:100}}/>
        <Text>{item.item.name}</Text>
    </View>
    </TouchableOpacity>
      )
  }
  return (
    <>
    <BottomTab.Navigator 
  
        screenOptions={{
          tabBarStyle:{
          position:'absolute',
          marginHorizontal:20,
          marginVertical:0,
          borderRadius:10,
          bottom:10,
          left:0,
          right:0,
          elevation:1,
          zIndex:10
        }
          ,headerShown: false
        }}
        >
      <BottomTab.Screen name="Home" component={HomeScreen1}  options={{
          tabBarLabel: 'Home',
          tabBarIcon:()=>(
           <View style={{}}>
             <Image source={require('../assets/logo/icons8-home-100.png')} style={styles.tablogo}/>
           </View>
          )
        }}/>
      <BottomTab.Screen name="Home1" component={Mapp}  options={{
          tabBarLabel: 'Booking',
          tabBarIcon:()=>(
           <View style={{}}>
             <Image source={require('../assets/logo/icons8-booking-91.png')} style={styles.tablogo}/>
           </View>
          )
        }}/>
        <BottomTab.Screen name={'ab'} component={Call}  options={{
          tabBarLabel: '',
          tabBarIcon:()=>(
            <View style={{
              backgroundColor:'#fff',
              width:60,
              height:60,
              position:'absolute',
              bottom:10,
              borderRadius:100,
              alignItems:'center',
              justifyContent:'center',
              borderColor:'#fff',
              borderWidth:1,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              }}>
               <Image source={require('../assets/logo/call.png')} style={styles.tablogo}/>
            </View>
          )
        }}/>
         <BottomTab.Screen name="add" component={Map1}  options={{
          tabBarLabel: 'wallet',
          tabBarIcon:()=>(
            <View style={{}}>
              <Image source={require('../assets/logo/icons8-wallet-80.png')} style={styles.tablogo}/>
            </View>
          )
        }}/>
         <BottomTab.Screen name="add2" component={About}  options={{
          tabBarLabel: 'profile',
          tabBarIcon:()=>(
            <View style={{}}>
              <Image source={require('../assets/logo/icons8-user-90.png')} style={styles.tablogo}/>
            </View>
          )
          
        }}/>
     
    </BottomTab.Navigator>
   
    <Animated.View style={[styles.bikeshow, {transform: [{ translateY:t1 }]}]}>
    <View style={styles.closeanimation}>
    <Text>Select your Vehicle Brand</Text>
      <TouchableOpacity onPress={stopanimation}>
       <Text>Close</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.innerbikeshowview}>
        <FlatList
          data={bikeinfo}
          renderItem={renderitem}
          keyExtractor={index=>index.id}
        />
      </View>
    </Animated.View>
<Animated.View style={[styles.bikeshowmodel, {transform:[ {translateY:t2}] }]}>
    <View style={styles.closeanimation}>
    <Text>Select your model</Text>
      <TouchableOpacity onPress={stopanimation1}>
      <Text>Close</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.innerbikeshowview}>
      <FlatList
          data={bikemodel}
          renderItem={renderitem}
          keyExtractor={index=>index.id}
        />
      </View>
      </Animated.View> 
    </>
  );
}
export default Tab
const styles=StyleSheet.create({
  model:{
    width:'100%',
    height:300,
    backgroundColor:'blue',
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    zIndex:10
  },
  mainview:{
      flex:1,
   },

  mainviewtop:{
    backgroundColor:"#C0D6E8",
  paddingBottom:20,
  },
  serviceshow:{
   paddingHorizontal:10
  },
  
  serviceshowtop:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10,
    alignItems:'center'
  },
  serviceshowtoplefttext:{
    fontSize:20,
    color:"#A34343"
  },
  serviceshowtoprighttext:{
    color:"#C0D6E8"
    
  },

  serviceView:{
    flex:1,
    backgroundColor:'#fff',
    borderRadius:10,
    margin:5,
    alignItems:'center',
    paddingVertical:10
  },
  servicetextname:{
    flex:1,
   
  },
  serviceimage:{
  width:50,
  height:50
  },
  header:{
      height:70,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginHorizontal:10
  },
  headertext:{
    fontSize:20,
    color:"#000"
  },
  bikelogo:{width:50,height:40
  },

  tablogo:{
    width:25,
    height:25
  },
  bikeshow:{
      width:'100%',
      height:400,
      backgroundColor:'#fff',
      position:'absolute',
      bottom:0,
      left:0,
      right:0,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      elevation:20,
      zIndex:20
     },
  bikeshowmodel:{
      width:'100%',
      height:600,
      backgroundColor:'#fff',
      position:'absolute',
      bottom:0,
      left:0,
      right:0,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      elevation:20,
      zIndex:30
     },

     innerbikeshowview:{
      height:'90%',
      marginVertical:'15%'
     },
     closeanimation:{
      justifyContent:'space-between',
      flexDirection:'row',
      marginHorizontal:20,
      paddingVertical:20
     }
     ,

     bikeshow1:{
      flex:1,
      height:100,
      padding:20,
      borderRadius:20,
      alignItems:'center',
      margin:10,
      justifyContent:'space-around'
    }
})