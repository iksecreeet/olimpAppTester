import React from 'react';

import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';

import HeaderMain from '../../components/HeaderMain';
import FirstScreen from './MainScreen';
import SecondScreen from './Individual';

const StackNavigator = createMaterialTopTabNavigator({
  FirstScreen: {
    screen: FirstScreen,
    navigationOptions: () => ({
        title: 'Сюжетные курсы'
    })
  },
  SecondScreen: {
    screen: SecondScreen,
    navigationOptions: () => ({
        title: 'Индивидуальные курсы'
    })
  },
},
  {
	tabBarOptions: {
    indicatorStyle: {
      backgroundColor: '#19b1a4'
    },
    labelStyle: {
      color: '#FFF',
      //backdropColor: '#FFF',
      fontSize: 12,
      margin: 0,
      paddingVertical: 5,
      paddingHorizontal: 2,
      fontFamily: 'LatoRegular',
    }
}
});

const MainStack = createStackNavigator({
	MainStack: {
		screen: StackNavigator,
		navigationOptions: () => ({
        header: props => <HeaderMain {...props} title='Твой путь' />
    })
	}
});

export default MainStack;

