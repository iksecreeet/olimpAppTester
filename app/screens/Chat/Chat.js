import * as React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {
  TabView,
  TabBar,
  SceneMap,
  type Route,
  type NavigationState,
} from 'react-native-tab-view';

import GroupList from './GroupList';
import Raiting from './Raiting';
import Group from './Group';

import { 
  Left, 
  RightIcon, 
  Header, 
  Title, 
  ActionTopButton
  } from '../../components/common';

import { loggedIn, connectToChat } from '../../actions';

type State = NavigationState<
  Route<{
    key: string,
    title: string,
  }>
>;

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

class ChatGroup extends React.Component<*, State> {
  static title = 'Scrollable top bar';
  static backgroundColor = '#3f51b5';
  static appbarElevation = 0;
  state = {
    index: 1,
    routes: [
      { key: 'group', title: 'Чат группы' },
      { key: 'groupList', title: 'Общий чат' },
      { key: 'raiting', title: 'Рейтинг' },
    ],
  };
  componentDidMount() {
    this.props.loggedIn();
  }
  _handleIndexChange = index =>
    this.setState({
      index,
    });
  _renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      //style={styles.tabbar}
      labelStyle={styles.label}
    />
  );

  _renderScene = SceneMap({
    group: Group,
    groupList: GroupList,
    raiting: Raiting,
  });

  render() {
    if (!this.props.isLoggedIn && !this.props.chatuser) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
          <Text style={styles.text}>Раздел "Друзья" доступен только для зарегистрированных пользователей</Text>
          <Text style={styles.text}>Вы можете выполнить вход в приложение под своей учетной записью созданной ранее, либо зарегистрироваться</Text>
          <TouchableOpacity style={{ marginTop: 15}} onPress={() => this.props.navigation.navigate('AuthScreen')}>
              <View style={{
                padding: 10, 
                backgroundColor: '#0c3d84', 
                borderRadius: 5
              }}>
                <Text style={{ color: '#FFF' }}>Войти или зарегистрироваться</Text>
              </View>
          </TouchableOpacity>
        </View>
      );
    }
    return (
    <View style={styles.container}>
      <Header>
        <Left>
        <ActionTopButton 
          onPress={() => this.props.navigation.navigate('Common')}
          pressIcon='o-goback'
        />
        </Left>
        <Title text='Друзья' />
        <RightIcon count={5000} />
      </Header>
      <TabView
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'LatoRegular',
    fontSize: 14,
    paddingVertical: 5,
    textAlign: 'center'
  },
    container: {
    flex: 1,
  },
  label: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'LatoRegular',
    padding: 2,
    margin: 4
  },
  tabbar: {
    backgroundColor: '#FFF',

  },
  indicator: {
    backgroundColor: '#19b1a4',
  },
});
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    chatuser: state.chat.chatuser
  };
};

export default connect(mapStateToProps, {
  loggedIn,
  connectToChat
})(ChatGroup);
