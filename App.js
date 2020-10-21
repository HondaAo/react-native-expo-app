import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import Feed from './src/feed';
import Screen1 from './src/drawer/screen1'
import Screen2 from './src/drawer/screen2'
import Screen3 from './src/drawer/screen3'
import {Tab1} from './src/tabs/Home'
import {Tab2} from './src/tabs/Login'
import Tab3 from './src/tabs/Fovorites'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { Colors, ActivityIndicator } from 'react-native-paper'
import { AuthContext } from './src/Auth/AuthProvider'
import {AuthProvider} from './src/Auth/AuthProvider'
import Guide from './src/tabs/Guide';
import {Mypage} from './src/tabs/Mypage';
import { Chat } from './src/tabs/Chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();

 const createBottomTabs = () =>{
  const { userInfo, setUserInfo, isTabVisible } = useContext(AuthContext)
  useEffect(()=>{
    setUserInfo(AsyncStorage.getItem('userInfo'))
  },[])
  return(
    <MaterialBottomTabs.Navigator
    initialRouteName="Home"
    activeColor="tomato"
    inactiveColor="lightgrey"
    barStyle={{ backgroundColor: 'white',display: isTabVisible ? null : 'none' }}
    >
    { !userInfo ? (  
      <>
      <MaterialBottomTabs.Screen 
         name="Home" 
         children={Tab1} 
         options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <MaterialBottomTabs.Screen 
      name="Guide" 
      component={Guide} 
      options={{
        tabBarLabel: 'Guide',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}/>
      <MaterialBottomTabs.Screen 
        name="Login"
        children={Tab2} 
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="lock" color={color} size={26} />
        )}}
      />
      </>
    ): (
      <>
      <MaterialBottomTabs.Screen 
         name="Home" 
         children={Tab1}
         options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }} />
      <MaterialBottomTabs.Screen name="Mypage" children={Mypage}
      options={{
        tabBarLabel: 'Mypage',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }} />
      <MaterialBottomTabs.Screen name="Chat" children={Chat}
       options={{
        tabBarLabel: 'Chat',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="chat" color={color} size={26} />
        ),
      }}
      />
      </>
    )}
    </MaterialBottomTabs.Navigator>
  )
 }
export default function App() {

  return (
   <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" children={createBottomTabs} />
      </Stack.Navigator> 
    </NavigationContainer>
  </AuthProvider>
  );
}
