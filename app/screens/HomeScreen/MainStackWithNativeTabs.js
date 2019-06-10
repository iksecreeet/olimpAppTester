import * as React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import {
  TabView,
  TabBar,
  SceneMap,
  type Route,
  type NavigationState,
} from 'react-native-tab-view';
import { Header, ActionTopButton, Left, Right, Title } from '../../components/common';
import OlimpIcon from '../../styles/Icons';
import FirstScreen from './FirstScreen';
import SeconScreen from './SecondScreen';

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

export default class MainStack extends React.Component<*, State> {
  static title = 'Scrollable top bar';
  static backgroundColor = '#3f51b5';
  static appbarElevation = 0;
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Сюжетные курсы' },
      { key: 'second', title: 'Индивидуальный путь' }
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
      //style={styles.tabbar}
      labelStyle={styles.label}
    />
  );

  _renderScene = SceneMap({
    first: FirstScreen,
    second: SeconScreen,
  });
  render() {
    return (
  <View style={{ flex: 1 }}>
      <Header>
        <Left>
        <ActionTopButton 
          onPress={() => this.props.navigation.openDrawer()}
          pressIcon='o-menu_m'
        />
        </Left>
        <Title text='Твой путь' />
       <Right>   
        <View style={styles.rows}>
            <Text style={styles.topIconText}>5000</Text>
             <OlimpIcon name='o-diamond' style={styles.topIcon} />
          </View>
        </Right>
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
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'LatoRegular',
    paddingVertical: 5,
    margin: 0
  },
  tabbar: {
    backgroundColor: '#FFF',

  },
  indicator: {
    backgroundColor: '#19b1a4',
  },
    rows: {
    flexWrap: 'wrap', 
    flexDirection: 'row', 
    alignItems: 'center', 
    alignSelf: 'flex-end' 
  },
    topIconText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'LatoSemibold'
  },
  topIcon: {
    color: '#FFF',
    fontSize: 20,
    paddingLeft: 8
  },
});
