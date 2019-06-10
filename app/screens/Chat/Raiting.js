import React from 'react';

import { View, Text } from 'react-native';

export default class Raiting extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text style={{fontFamily: 'LatoBold'}}>Рейтинг будет доступен после начала игры</Text>
			</View>
		);
	}
}
