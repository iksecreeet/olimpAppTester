import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MainScreen from './MainScreen';
import Individual from './Individual';

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'MainScreen', title: 'Сюжетные курсы' },
      { key: 'Individual', title: 'Индивидуальный путь' },
    ],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: MainScreen,
          second: Individual,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});