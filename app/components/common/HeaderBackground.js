import React from 'react';

import {
	StyleSheet,  
	ImageBackground, 
	} from 'react-native';

const HeaderBackground = (props) =>  {
		const { 
			headerBackground,
		} = styles;
			return (
		<ImageBackground 
			style={headerBackground} 
			resizeMode={'cover'} 
			source={require('../../../assets/images/header_background.jpg')}
		>
         {props.children}

      </ImageBackground>
		);
};

const styles = StyleSheet.create({
	headerBackground: {
		alignSelf: 'stretch', 
		width: '100%', 
		height: 140,
		zIndex: 1, 
		elevation: 9,
		backgroundColor: '#0c3d84'
	},
});


export { HeaderBackground };
