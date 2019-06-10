import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainScreen from '../app/screens/MainScreen';
import AuthScreen from '../app/screens/Auth/AuthScreen';


const Router = createStackNavigator({
    AuthScreen: {
        screen: AuthScreen,
        navigationOptions: () => ({
            title: 'Login',
            headerBackTitle: null,
            header: null
        })
    },
    MainScreen: {
        screen: MainScreen,
        navigationOptions: () => ({
			title: 'MainScreen',
            headerBackTitle: null,
            header: null
        })
    }
    }, { initialRouteName: 'MainScreen' },
     {
		//drawerWidth: Math.min(height, width) * 0.8,
		useNativeAnimations: true
	});

export default createAppContainer(Router);
