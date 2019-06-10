import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

const ModalGameStarted = ({ onPress }) => {
	const { container, titleText, text, button, buttonText, animation } = styles;
	return (
		<View style={container}>
			<Text style={titleText}>Игра началась</Text>
			<View style={animation}>
				<LottieView
					source={require('../../../assets/animation/checked.json')}
					autoPlay
					loop
				/>
			</View>
			<Text style={text}>
				Вскоре вы получите первое задание от наставника
			</Text>
				<TouchableOpacity onPress={onPress} style={button}>
					<Text style={buttonText}> Понятно</Text>
				</TouchableOpacity>
			</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleText: {
		fontSize: 24, 
		fontFamily: 'LatoLight'
	},
	text: {
		fontFamily: 'LatoLight',
		fontSize: 16,
		textAlign: 'center',
	},
	button: {
		padding: 15,
		marginVertical: 20,
		backgroundColor: '#0c3d84',
		width: '80%',
		borderRadius: 5
	},
	animation: {
		marginVertical: 20,
		width: 100,
		height: 100
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 14,
		fontFamily: 'LatoRegular',
		color: '#FFF'
	}
});

export default ModalGameStarted;
