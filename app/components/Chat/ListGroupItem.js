import React from 'react';

import {
	View,
	TouchableOpacity,
	TouchableNativeFeedback,
	Text,
	StyleSheet
} from 'react-native';

const ListGroupItem = ({ onPressItem, title }) => {
	return (
		<View style={styles.item}>
		<TouchableNativeFeedback
			background={TouchableNativeFeedback.Ripple(
				'ThemeAttrAndroid',
				true
			)}
			onPress={onPressItem}
		>
		<View style={{ paddingHorizontal: 16 }}>
			<Text style={styles.title}>{title}</Text>
		</View>
			
		</TouchableNativeFeedback>
		</View>
	);
};
const styles = StyleSheet.create({
	item: {
		overflow: 'hidden',
		paddingVertical: 14,
		backgroundColor: '#FFF',
		borderColor: '#f2f2f2',
		borderBottomWidth: 1
	},
	title: {
		fontFamily: 'LatoRegular',
		fontSize: 16,
		color: '#000'
	}
});
export default ListGroupItem;
