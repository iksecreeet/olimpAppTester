import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import * as Animatable from 'react-native-animatable';
import AnimatedAfterLoad from '../../../components/Course/components/AnimatedAfterLoad';
import StartPlayBtn from '../../../components/Course/StartPlayBtn';
import PlayBtn from '../../../components/Course/PlayBtn';


class PlayingStartStop extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
	checkPurchased() {
		if (this.props.isPurchased) {
			return (
				<AnimatedAfterLoad
					text='Вы проходите данный курс'
					animation={require('../../../../assets/animation/playing.json')}
				/>
			);
		}
	}
	checkTimer() {
		if (this.props.timer > 0) {
			return (
					<View
	style={{
		zIndex: 100,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 20
	}}
>
			<View
				style={{
					position: 'absolute',
					top: '20%',
					alignSelf: 'center',
					textAlign: 'center'
				}}
			>
				<Animatable.Text
					useNativeDriver={true}
					animation='zoomIn'
					duration={950}
					easing='ease-out'
					iterationCount={3}
					style={{
						color: '#FFF',
						fontSize: 64,
						fontFamily: 'BebasNeue',
						textAlign: 'center'
					}}
				>
					{this.props.seconds}
				</Animatable.Text>
			</View>
			<View
				style={{
					position: 'absolute',
					bottom: 7,
					alignSelf: 'center',
					textAlign: 'center'
				}}
			>
				<Text
					style={{
						color: '#FFF',
						fontSize: 20,
						fontFamily: 'BebasNeue',
						textAlign: 'center'
					}}
				>
					ИГРАТЬ
				</Text>
			</View>
			<StartPlayBtn />
		</View>	
			);
		}
	}
	startState() {
		if (!this.props.isPurchased || !this.props.userStartPlay) {
			return (
					<View
	style={{
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 20,
	}}
>
		<TouchableOpacity onPress={this.props.onPressPlay}>
			<View
				style={{
					position: 'absolute',
					bottom: 7,
					alignSelf: 'center',
					textAlign: 'center'
				}}
			>
				<Text
					style={{
						color: '#FFF',
						fontSize: 20,
						fontFamily: 'BebasNeue',
						textAlign: 'center'
					}}
				>
					ИГРАТЬ
				</Text>
			</View>
			<PlayBtn />
		</TouchableOpacity>
	</View>
			);
		}
	}
	render() {
		return (
			<View>
				{this.checkPurchased()}
				{this.checkTimer()}
				{this.startState()}
			</View>
		);
	}
}
PlayingStartStop.propTypes = {
  isPurchased: PropTypes.isRequired,
  userStartPlay: PropTypes.isRequired,
  timer: PropTypes.number,
  seconds: PropTypes.number,
  onPressPlay: PropTypes.object.isRequired
};

export default PlayingStartStop;
