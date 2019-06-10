//Export routes 'react-navigation'
import React from 'react';
import { Dimensions } from 'react-native';
import { 
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  //createAppContainer 
} from 'react-navigation';
import { fromLeft } from 'react-navigation-transitions';

import MainStack from '../screens/HomeScreen';
import Ideas from '../screens/Ideas';
import Settings from '../screens/Settings';
import Trove from '../screens/Trove';
import Wisdom from '../screens/Wisdom';
import Rules from '../screens/Rules';
import Auth from '../screens/Auth';
import Profile from '../screens/Auth/Profile';
import Avatar from '../screens/Avatar';
import Chat from '../screens/Chat';
import Olimp from '../screens/Olimp';
import Mentor from '../screens/MentorScreen';
import Course from '../screens/HomeScreen/Course';
import CourseIndividual from '../screens/HomeScreen/CourseNew';
import SideBar from '../components/SideBar';
import OlimpIcon from '../styles/Icons';


const MainStackNavigator = createBottomTabNavigator(
{
  Main: { 
    screen: MainStack,
    navigationOptions: () => ({
      title: 'ПУТЬ',
      tabBarIcon: ({ tintColor }) =>  <OlimpIcon name="o-earth" size={26} style={{ color: tintColor }} />
    }),
  },
  Mentor: { 
    screen: Mentor,
    navigationOptions: () => ({
      title: 'НАСТАВНИК',
      tabBarVisible: false,
      tabBarIcon: ({ tintColor }) =>  <OlimpIcon name="o-mentor" size={26} style={{color: tintColor}} />
    }),
  },
  Friends: { 
    screen: Chat,
    navigationOptions: () => ({
      title: 'ДРУЗЬЯ',
      tabBarIcon: ({ tintColor }) =>  <OlimpIcon name="o-friends" size={26} style={{color: tintColor}} />
    }),
  },
  Avatar: { 
    screen: Avatar,
    navigationOptions: () => ({
      title: 'АВАТАР',
      tabBarIcon: ({ tintColor }) =>  <OlimpIcon name="o-olimp" size={26} style={{color: tintColor}} />
    }), 
  },
  Olimp: { 
    screen: Olimp,
    navigationOptions: () => ({
      title: 'ОЛИМП',
      tabBarIcon: ({ tintColor }) =>  <OlimpIcon name="o-avatar" size={26} style={{color: tintColor}} />
    }),
  },
},
{
     tabBarOptions: {
      activeTintColor: '#19b3a6',
      inactiveTintColor: '#FFF',
      activeBackgroundColor: '#0c3d84',
      style: {
        backgroundColor: '#17478d',
        elevation: 4,
      },
      tabStyle: {
        minheight: 60
      },
      labelStyle: {
        fontFamily: 'LatoRegular',
        fontSize: 9,
      }
    },
  }
); 

const AppNavigator = createDrawerNavigator({
    Common: { screen: MainStackNavigator },
    Auth: { screen: Auth },
    Ideas: { screen: Ideas },
    Settings: { screen: Settings },
    Trove: { screen: Trove },
    Wisdom: { screen: Wisdom },
    Profile: { screen: Profile },
    Rules: { screen: Rules },
},
    {
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    drawerWidth: Math.min(Dimensions.get('window').width) * 0.85,
    useNativeAnimations: true,
    contentComponent: props => <SideBar {...props} />
  }
);


const StackNavigator = createStackNavigator({
   MainStackNavigator: {
    screen: AppNavigator
   },
   Course: { screen: Course },
   CourseIndividual: { screen: CourseIndividual }
},
{
    headerMode: 'none',
    initialRouteName: 'MainStackNavigator',
    transitionConfig: () => fromLeft(),
  });

//export default createAppContainer(StackNavigator);
export default StackNavigator;
