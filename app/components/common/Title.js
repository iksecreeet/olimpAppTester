import React from 'react';

import { View, Text } from 'react-native';

const Title = ({ text }) => {
	const { titleStyle, textStyle } = styles; 
	return (
		<View style={titleStyle}>
			<Text numberOfLines={1} style={textStyle}>{text}</Text>
		</View>
	);
};

const styles = {
	titleStyle: {
		flex: 1,
		alignSelf: 'center', 
		paddingLeft: 20
	},
	textStyle: {
		color: '#FFF',
		fontSize: 18,
		fontFamily: 'LatoBold'
	}
};
export { Title };
