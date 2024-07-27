import React, { useEffect } from 'react'
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import VideoAndroid from './videoPlayer.android'
import Thumbnails from './thumbnails'
import Bottom from './bottomSheet'
//import Try from './try'
function HomeScreen() {
  return (
      //<VideoAndroid />
     <Thumbnails />
    // <Bottom />
 //   <Try />
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();


function Tabs() {


  useEffect(() => {

    axios.get('http://192.168.1.7:4000/users').then(data => console.log(data.data)).catch(Err => console.log(Err))

    //  axios.post('http://192.168.43.147:3000/users' , users)
    //.then(data => console.log(data.data))
    //.catch(err => console.log(err))
    //axios.get('http://192.168.43.147:4000/users').then(data => console.log(data.data)).catch(err => console.log(err))
    //axios.get('http://192.168.43.147:4000/users').then(data => console.log(data.data)).catch(err => console.log(err))

    //axios.get('https://jsonplaceholder.typicode.com/posts').then(data => console.log(data.data)) 
  })

  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home-outline'
              : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'arrow-back-circle' : 'arrow-back-circle';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>

  )
}

export default Tabs
