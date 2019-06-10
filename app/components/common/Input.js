import React from 'react';

import { View, Text, TextInput } from 'react-native';

const Input = ({ 
	label, 
	value, 
	placeholder, 
	onChangeText, 
	secureTextEntry, 
	style,
	underlineColorAndroid, 
	textColor 
}) => {
	return (
		<View>
			<Text style={{color: '#FFF', fontFamily: 'LatoRegular'}}>{label}</Text>
			<TextInput
				underlineColorAndroid={underlineColorAndroid}
				style={style}
				placeholderTextColor={textColor}
				secureTextEntry={secureTextEntry}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
			/>
		</View>
	);
};

export { Input };
