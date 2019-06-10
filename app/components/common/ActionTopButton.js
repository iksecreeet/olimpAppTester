import React from 'react';

import {
	TouchableOpacity, 
	TouchableNativeFeedback, 
	View,
	StyleSheet 
	} from 'react-native';
import OlimpIcon from '../../styles/Icons';

const ActionTopButton = ({ onPress, pressIcon, size, iconColor }) => {
	return (
			<View style={styles.icon}>
			<TouchableNativeFeedback
				background={TouchableNativeFeedback.Ripple(
					'ThemeAttrAndroid',
					true
				)}
				onPress={onPress}
			>
			<View style={styles.radius}>
				<OlimpIcon 
					style={{ fontSize: size ? 18 : 18, color: iconColor ? '#FFF' : '#FFF' }} 
					name={pressIcon} 
				/>
			</View>
				</TouchableNativeFeedback>
			</View>
	);
};

const styles = StyleSheet.create({
	icon: {
		width: 44, 
		borderRadius: 22, 
		alignItems: 'center', 
		justifyContent: 'center', 
		height: 44, 
		backgroundColor: 'transparent'
	},
	radius: {
		borderRadius: 22,
		padding: 9
	}
});


export { ActionTopButton };
