import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import SessionScreen from '../screens/NoteScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default createBottomTabNavigator(
    {
      Session: {
        screen: SessionScreen,
      },
      Profile: {
        screen: ProfileScreen,
      },
    },
    {
      tabBarPosition: 'bottom',
      animationEnabled: false,
      swipeEnabled: false,
      tabBarOptions: {
        showLabel: false,
        activeTintColor: '#ccc',
        inactiveTintColor: 'lightgray'
      }
    }
);