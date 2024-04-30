import React from 'react'
import {Text} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screen/HomeScreen'
import Tab from './Tab'
const Stack = createNativeStackNavigator()
export default function NavigationRouter(){
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
        <Stack.Screen name={'tab'} component={Tab} />
        </Stack.Navigator>
    )
} 