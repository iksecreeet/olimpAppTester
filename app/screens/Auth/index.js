import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { fromLeft } from 'react-navigation-transitions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AuthScreen from '../Auth/AuthScreen';
import Profile from '../Auth/Profile';
import SignIn from '../Auth/SignIn';
import ForgotPassword from '../Auth/ForgotPassword';

const First = createBottomTabNavigator({
     AuthScreen: {
        screen: AuthScreen,
        navigationOptions: () => ({
            header: null,
            title: 'Вход',
            tabBarIcon: ({ tintColor }) =>  <Icon name="person" size={16} color={tintColor} />
        })
    },
    SignIn: {
        screen: SignIn,
        navigationOptions: () => ({
            header: null,
            title: 'Регистрация',
            tabBarIcon: ({ tintColor }) =>  <Icon name="group" size={16} color={tintColor} />
        })
    },   
    }, {
        tabBarOptions: {
      activeTintColor: '#19b3a6',
      inactiveTintColor: '#000',
      activeBackgroundColor: '#f2f2f2',
      style: {
        backgroundColor: '#FFF',
        elevation: 4
      },
      labelStyle: {
        fontFamily: 'LatoRegular',
        fontSize: 12,
      }
    },
    }
);

const Auth = createStackNavigator({
    First: {
        screen: First,
        navigationOptions: () => ({
            header: null
        })
    },
    Profile: {
        screen: Profile,
        navigationOptions: () => ({
            header: null
        })
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: () => ({
            header: null
        })
    },
    },
    { 
        initialRouteName: 'First', 
        transitionConfig: () => fromLeft(), 
    }
    );

export default Auth;
