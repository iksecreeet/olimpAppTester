import React, { Component } from 'react';

import { 
	View,
	StyleSheet, 
	Text,
	TouchableOpacity, 
	ImageBackground 
} from 'react-native';

export default class Puzzles extends Component {
	render() {
		const { wrapp, ImageParam, alignEnd, text, textBlockParam, courseItem } = styles;
		return (
			<View style={wrapp}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Mentor')}
                style={courseItem}
              >
                <ImageBackground
                  resizeMode={'cover'}
                  borderRadius={3}
                  style={[ImageParam, alignEnd]}
                  source={require('../../../assets/images/lego.png')}
                >
                  <Text style={[text, textBlockParam]}>
                    {'Квест 1'.toUpperCase()}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Mentor')}
                style={courseItem}
              >
                <ImageBackground
                  resizeMode={'cover'}
                  borderRadius={3}
                  style={[styles.ImageParam, styles.alignEnd]}
                  source={require('../../../assets/images/hidden.png')}
                >
                  <Text style={[text, textBlockParam]}>
                    {'Квест 2'.toUpperCase()}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              </View>
		);
	}
}

const styles = StyleSheet.create({
	wrapp: {
		flexDirection: 'row',
        flexWrap: 'wrap',
	},
	ImageParam: {
		flex: 1,
		alignSelf: 'stretch',
		width: null,
		height: null,
		borderRadius: 3
  },
	alignEnd: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexGrow: 1
  },
	text: {
		color: '#FFF',
		paddingHorizontal: 5,
		fontFamily: 'LatoBold',
		fontSize: 12,
		textAlign: 'center'
  },
	textBlockParam: {
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		width: '100%',
		padding: 10,
		borderBottomLeftRadius: 3,
		borderBottomRightRadius: 3
  },
    courseItem: {
		width: '50%',
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		paddingLeft: 6,
		paddingBottom: 12,
		paddingRight: 6,
		borderColor: 'transparent'
  },
});
