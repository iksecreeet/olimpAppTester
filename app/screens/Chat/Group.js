import React from 'react';

import { View, Text } from 'react-native';

export default class Group extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text style={{fontFamily: 'LatoBold'}}>Ваши группы</Text>
			</View>
		);
	}
}
