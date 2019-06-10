import React from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';

const TitleChat = ({ text, onPress, coverRoom, usersCount, usersOnline }) => {
	const { titleStyle, textStyle, cover, online, count, headerText } = styles;
	return (
		<TouchableOpacity onPress={onPress} style={titleStyle}>
				<Image
					style={cover}
					resizeMode={'cover'}
					source={coverRoom}
				/>
				<View style={{ flexDirection: 'column', flex: 1 }}>
					<Text numberOfLines={1} style={textStyle}>
						{text}
					</Text>
					<View style={headerText}>
						<Text numberOfLines={1} style={online}>
							{usersOnline}
						</Text>
						<Text numberOfLines={1} style={count}>
							{usersCount}
						</Text>
					</View>
				</View>
		</TouchableOpacity>
	);
};

const styles = {
	headerText: {
		flex: 1,
		flexDirection: 'row',
		paddingLeft: 5
	},
	titleStyle: {
		alignSelf: 'center',
		flexDirection: 'row',
		paddingLeft: 5,
		width: '70%'
	},
	textStyle: {
		color: '#FFF',
		fontSize: 16,
		paddingLeft: 5,
		fontFamily: 'LatoMedium',
		alignSelf: 'flex-start'
	},
	cover: {
		alignSelf: 'flex-start',
		width: 40,
		height: 40,
		borderRadius: 20
	},
	online: {
		color: '#B0D2F2',
		fontSize: 12,
		fontFamily: 'LatoMedium',
		paddingRight: 5
	},
	count: {
		color: '#B0D2F2',
		fontFamily: 'LatoMedium',
		fontSize: 12
	}
};
export { TitleChat };
