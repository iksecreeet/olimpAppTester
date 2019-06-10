import React from 'react';

import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { loggedIn } from '../actions';

class Olimp extends React.Component {
  componentDidMount() {
      this.props.loggedIn();
  }
  render() {
    if (this.props.isLoggedIn) {
      return (
        <View>
          <Text>Email: {this.props.user.email}</Text>
        </View>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>{'Олимп'.toUpperCase()}</Text>
      </View>
    );
  }
}

const mapStateToProps = state =>  {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps, {
  loggedIn
})(Olimp);
