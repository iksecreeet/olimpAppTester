import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

const AnimatedAfterLoad = ({ animation, text }) => {
	const { container, pulseText, animationContainer } = styles;
	return (
		<View style={container}>
			<Animatable.Text
				animation='pulse'
				iterationCount='infinite'
				iterationDelay={50}
				easing='ease-out'
				style={pulseText}
			>
				{text}
			</Animatable.Text>
			<View style={animationContainer}>
				<LottieView
					source={animation}
					autoPlay
					loop
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 150
	},
	pulseText: {
		fontFamily: 'LatoRegulat',
		textAlign: 'center',
		fontSize: 14,
		color: '#FFF'
	},
	animationContainer: {
		width: 120,
		height: 120
	}
});

export default AnimatedAfterLoad;

