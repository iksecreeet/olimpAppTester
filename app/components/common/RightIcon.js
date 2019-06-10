import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { View, StyleSheet, Text } from 'react-native';
import OlimpIcon from '../../styles/Icons';

class RightIcon extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.rows}>
					<Text style={styles.topIconText}>
						{this.props.count}
					</Text>
					<OlimpIcon name='o-diamond' style={styles.topIcon} />
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'center',
		alignItems: 'flex-end'
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
	}
});

// You can declare that a prop is a specific JS type. 
RightIcon.propTypes = {
  count: PropTypes.number,
};

RightIcon.defaultProps = {
  count: 0,
};

export { RightIcon };
