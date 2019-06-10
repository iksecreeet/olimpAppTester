import React from 'react';

import { View, Text } from 'react-native';

import { connect } from 'react-redux';
import { 
  signOut, 
  loggedIn 
} from '../../actions';

class Instructions extends React.Component {
	render() {
		return (
			<View>
				<Text>Обучение у наставника</Text>
			</View>
		);
	}
}


const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps, {
  loggedIn, signOut
})(Instructions);

