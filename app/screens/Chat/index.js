import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';
import { 
  createStackNavigator, 
  createMaterialTopTabNavigator, 
  //createAppContainer 
} from 'react-navigation';
import { connect } from 'react-redux';
import { loggedIn } from '../../actions';

import HeaderChat from '../../components/HeaderChat';
import GroupList from './GroupList';
import UserRoom from './UserRoom';
import Raiting from './Raiting';
import Group from './Group';
 
const ChatUser = createMaterialTopTabNavigator({
  Group: {
    screen: Group,
    navigationOptions: () => ({
        title: 'Мои группы'
    })
  },
  GroupList: {
    screen: GroupList,
    navigationOptions: () => ({
        title: 'Общий чат'
    })
  },
  Raiting: {
    screen: Raiting,
    navigationOptions: () => ({
        title: 'Рейтинг'
    })
  },
},
{
  initialRouteName: 'GroupList',
  tabBarOptions: {
    indicatorStyle: {
      backgroundColor: '#19b1a4'
    },
    labelStyle: {
      color: '#FFF',
      fontSize: 12,
      fontFamily: 'LatoRegular',
      padding: 2,
      margin: 4,
      //backgroundColor: '#FFF',
      //borderRadius: 10,
      paddingHorizontal: 5
    }
  }
}
);


const Common = createStackNavigator({
  CommonScene: {
    screen: ChatUser,
    navigationOptions: () => ({
        header: props => <HeaderChat {...props} title='Друзья' />
    })
  },
  UserScene: {
    screen: UserRoom
  },

}
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

class ChatScreens extends Component {
  componentDidMount() {
    this.props.loggedIn(); 
  }
  render() {
    if (!this.props.isLoggedIn) {
      return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.statusBar}>
          <StatusBar translucent backgroundColor="#133a72" />
        </View>
            <Text style={{marginBottom: 15, fontFamily: 'LatoRegular'}}>Чат доступен зарегистрированным пользователям</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AuthScreen')}>
              <View style={{padding: 10, backgroundColor: '#0c3d84'}}>
                <Text style={{color:'#FFF'}}>Войти или зарегистрироваться</Text>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
      );
    } 
    return (
      <View style={{ flex: 1 }}>
        <Common />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#133a72'
  },
});

const mapStateToProps = state => ({
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, {
  loggedIn,
})(ChatScreens);

