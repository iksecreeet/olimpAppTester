/* @flow */

import * as React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import {
  TabView,
  TabBar,
  SceneMap,
  type Route,
  type NavigationState,
} from 'react-native-tab-view';
import { 
  Left, 
  RightIcon, 
  Header, 
  Title, 
  ActionTopButton
  } from '../../components/common';
import MentorScreen from './Mentor';
import ReportScreen from './Reports';

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

export default class TopBarTextExample extends React.Component<*, State> {
  static title = 'Scrollable top bar';
  static backgroundColor = '#3f51b5';
  static appbarElevation = 0;

  state = {
    index: 0,
    routes: [
      { key: 'mentor', title: 'Наставник' },
      { key: 'reports', title: 'Отчеты' },
    ],
  };

  _handleIndexChange = index =>
    this.setState({
      index,
    });
  _renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      labelStyle={styles.label}
    />
  );

  _renderScene = SceneMap({
    mentor: MentorScreen,
    reports: ReportScreen,
  });

  render() {
    return (
    <View style={styles.container}>
      <Header>
        <Left>
        <ActionTopButton 
          onPress={() => this.props.navigation.navigate('Main')}
          pressIcon='o-goback'
        />
        </Left>
        <Title text='Наставник' />
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
  container: {
    flex: 1,
  },
  label: {
    color: '#000',
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
