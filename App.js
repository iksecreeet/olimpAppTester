import React from 'react';

import { Provider } from 'react-redux';
import configureStore from './app/store';

import Routes from './app/routes';
import NavigationService from './app/actions/NavigationService';

export default class AppOlimp extends React.Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <Routes
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
