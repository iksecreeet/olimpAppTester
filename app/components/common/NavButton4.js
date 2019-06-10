import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const NavButton4 = ({ onPress1, onPress2, buttonText1, buttonText2 }) => {
	const { buttonBlock, textStyle, textStyleActive } = styles;
	return (
		<View style={buttonBlock}>
			<TouchableOpacity style={{ width: '49%' }} onPress={onPress2}>
				<LinearGradient
					colors={['#3f92ce', '#2f7db6']}
					style={styles.linearGradient2}
				>
					<Text style={textStyle}>{buttonText2}</Text>
				</LinearGradient>
				<View
					style={{
						backgroundColor: '#174276',
						borderBottomLeftRadius: 4,
						borderBottomRightRadius: 4,
						width: '100%',
						height: 3,
						position: 'absolute',
						bottom: 0
					}}
				/>
			</TouchableOpacity>
			<TouchableOpacity style={{ width: '49%' }} onPress={onPress1}>
				<LinearGradient
					colors={['#0B3374', '#2758A2']}
					style={styles.linearGradient}
				>
					<Text style={[textStyle, textStyleActive]}>
						{buttonText1}
					</Text>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
};

const styles = {
	textStyle: {
		color: '#FFF',
		textAlign: 'center',
		fontFamily: 'LatoRegular',
		fontSize: 12
	},
	textStyleActive: {
		fontFamily: 'LatoBlack'
	},
	buttonBlock: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingTop: 10,

		marginHorizontal: 10,
		justifyContent: 'space-between'
	},
	linearGradient: {
		borderRadius: 4,
		padding: 12,
		alignItems: 'center',
		justifyContent: 'center'
	},
	linearGradient2: {
		padding: 12,
		alignItems: 'center',
		borderRadius: 4,
		justifyContent: 'center'
	}
};

export { NavButton4 };
