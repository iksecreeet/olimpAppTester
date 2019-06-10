import React from 'react';
import { StatusBar, View, Platform } from 'react-native';
import { PropTypes } from 'prop-types';

export default class ChatHeader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<View>
				<View style={styles.statusBar}>
					<StatusBar animated translucent backgroundColor='#133a72' />
				</View>
				<View style={styles.headerBody} />
			</View>
		);
	}
}

ChatHeader.propTypes = {
	title: PropTypes.isRequired,
	icon: PropTypes.string
};

const styles = {
	headerBody: {
		backgroundColor: '#17478d',
		height: Platform.OS === 'ios' ? 64 : 56,
		//marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
		paddingLeft: 16,
		paddingRight: 16,
		flexDirection: 'row',
		alignItems: 'center'
		//elevation: 4
	},
	statusBar: {
		height: StatusBar.currentHeight,
		backgroundColor: '#133a72'
	}
};
