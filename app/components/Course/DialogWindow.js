import React from 'react';

import {
	View,
	Text,
	ImageBackground,
	TouchableHighlight,
	AsyncStorage
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import OlimpIcon from '../../styles/Icons';

class DialogWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeMentor: true,
			animation: '',
			myKey: null
		};
	}
	async componentDidMount() {
		  	const value = await AsyncStorage.getItem('@activeMentor:key');
		  	console.log("Value " + value);
		  
	}
	async activeMentorState() {
		try {
		  await AsyncStorage.setItem('@activeMentor:key', true);
		  this.setState({ animation: 'flipOutX' });
		setTimeout(() => {
			this.setState({ activeMentor: false });
			//AsyncStorage.setItem('activeMentor', false);
		}, 1100);
		} catch (error) {
		  console.log("Error saving data" + error);
		}
	}

	render() {
		return (
			<Animatable.View
				animation={this.state.animation}
				style={[
					styles.wrapper,
					this.state.activeMentor === false
						? styles.activeMentor
						: styles.notActive
				]}
			>
				<ImageBackground
					source={require('../../../assets/images/mentor_dialog.jpg')}
					style={styles.imgBackground}
					borderRadius={5}
					resizeMode='cover'
				>
					<Text style={styles.title}>
						НАСТАВНИК И ЕГО{'\n'}ПРАВИЛА ИГРЫ
					</Text>
					<TouchableHighlight style={styles.button}>
						<Text style={styles.buttonText}>
							{'Начать диалог'.toUpperCase()}
						</Text>
					</TouchableHighlight>
				</ImageBackground>
				<OlimpIcon
					onPress={this.activeMentorState.bind(this)}
					name='o-close'
					style={styles.closeBtn}
				/>
			</Animatable.View>
		);
	}
}

const styles = {
	wrapper: {
		marginVertical: 10,
		marginHorizontal: 15,
		backgroundColor: '#0c3d84',
		elevation: 7
	},
	imgBackground: {
		width: '100%',
		alignSelf: 'stretch',
		height: 175
	},
	title: {
		fontSize: 20,
		lineHeight: 28,
		fontFamily: 'LatoBold',
		color: '#203348',
		position: 'absolute',
		top: 35,
		left: 125
	},
	button: {
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 7,
		backgroundColor: '#4d86e3',
		position: 'absolute',
		top: 100,
		left: 125,
		marginTop: 5
	},
	buttonText: {
		color: '#FFF',
		fontFamily: 'LatoBold'
	},
	closeBtn: {
		fontSize: 14,
		color: '#203348',
		position: 'absolute',
		top: 10,
		right: 10,
		zIndex: 10
	},
	activeMentor: {
		height: 0,
		opacity: 0,
		marginVertical: 0
	},
	notActive: {
		height: 175,
		opacity: 1
	}
};

export default DialogWindow;
