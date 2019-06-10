import React from 'react';

import { View, Text, ImageBackground } from 'react-native';

const Slide = (image, h1, h2, text) => {
	const { wrapper, textWrapper, titleH1, titleH2, textStyle } = styles;
	return (
	<ImageBackground
	borderRadius={5}
	resizeMode={'cover'}
	style={wrapper}
	source={image}
	>
	<View style={textWrapper}>
		<Text style={titleH1}>
			{h1}
		</Text>
		<Text style={titleH2}>
			{h2}
		</Text>
	</View>
	<Text style={textStyle}>
		{text}
	</Text>
	</ImageBackground>
	);
};

const styles = {
	wrapper: {
		paddingHorizontal: 20,
		width: 300,
		height: 243,
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	textWrapper: {
		paddingBottom: 20
	},
	titleH1: {
		fontSize: 20,
		fontFamily: 'LatoRegular',
		color: '#203348',
		textAlign: 'center'
	},
	titleH2: {
		fontSize: 20,
		fontFamily: 'LatoBold',
		color: '#203348',
		textAlign: 'center'
	},
	textStyle: {
		paddingHorizontal: 5,
		fontSize: 14,
		lineHeight: 18,
		fontFamily: 'LatoRegular'
	}
};

export { Slide };

