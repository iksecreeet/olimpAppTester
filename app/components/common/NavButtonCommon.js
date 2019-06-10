import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class NavButtonCommon extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
		onPress: props.onPress,
		active: props.active,
		title: props.title
	};
	}
  componentWillReceiveProps(nextProps) {
      // update original states
      this.setState({
        onPress: nextProps.onPress,
		active: nextProps.active,
		title: nextProps.title
      });
  }
	render() {
	const { buttonBlock, textStyle, textStyleActive } = styles;
	return (
	{this.state.active === 1 ? (
	<TouchableOpacity style={styles.button} onPress={this.state.onPress}>
		<LinearGradient colors={['#3f92ce', '#2f7db6']} style={styles.linearGradient2}>
			<Text style={textStyle}>
				{this.state.title}
			</Text>
		</LinearGradient>
		<View style={styles.activeButton} />
	</TouchableOpacity>	
		) :
	<TouchableOpacity style={styles.button} onPress={this.state.onPress}>
		<LinearGradient colors={['#0B3374', '#2758A2']} style={styles.linearGradient}>
			<Text style={[textStyle, textStyleActive]}>
				{this.state.title}
			</Text>
		</LinearGradient>
	</TouchableOpacity>
	}
	);
}
}

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
		justifyContent: 'center',
	},
	linearGradient2: {
		padding: 12,
		alignItems: 'center',
		borderRadius: 4,
		justifyContent: 'center',
	},
	button: {
		width: '49%'
	},
	activeButton: {
		backgroundColor: '#174276',
		borderBottomLeftRadius: 4, 
		borderBottomRightRadius: 4, 
		width: '100%', 
		height: 3, 
		position: 'absolute', 
		bottom: 0 
	}
};

export { NavButtonCommon };
