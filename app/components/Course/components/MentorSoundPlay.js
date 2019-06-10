import React, { Component } from 'react';

import { 
	View,
	Alert, 
	Text, 
	TouchableOpacity, 
	Image, 
	ActivityIndicator, 
	StyleSheet  
} from 'react-native';
import PropTypes from 'prop-types';
import Sound from 'react-native-sound';

class MentorSoundPlay extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playState: 'paused', //playing, paused
			playSeconds: 0,
			showPaused: false,
			duration: 0,
			timeToCircle: 0,
			isLoading: ''
		};
	}
	componentDidMount() {

	}
	componentWillUnmount() {
		if (this.sound) {
			this.sound.release();
			this.sound = null;
		}
	}
	pause = async () => {
		if (this.sound) {
			this.sound.pause();
		}
		this.setState({ playState: 'paused' });
	};
	play = async () => {
		if (this.sound) {
			this.sound.play(this.playComplete);
			this.setState({ playState: 'playing' });
		} else {
			this.setState({ isLoading: 'loading' });
			const filepath = 'https://liga-app.com/api/audio/001.mp3';
			//console.log('[Play]', filepath);
			this.sound = new Sound(filepath, Sound.MAIN_BUNDLE, error => {
				if (error) {
					Alert.alert('Ошибка при загрузке', error);
					Alert.alert('Уведомление', 'Ошибка аудио файла. (Код : 1)');
					this.setState({ playState: 'paused' });
				} else {
					this.setState({
						isLoading: '',
						playState: 'playing',
					});
					this.sound.play(this.playComplete);
				}
			});
		}
	};
	playComplete = success => {
		if (this.sound) {
			if (success) {
				console.log('successfully finished');
			} else {
				console.log('playback failed due to audio decoding errors');
				//Alert.alert('Notice', 'audio file error. (Error code : 2)');
			}
			this.setState({ playState: 'paused', playSeconds: 0 });
			this.sound.setCurrentTime(0);
		}
	};
	render() {
		return (
			<View style={styles.playBlock}>
				{this.state.isLoading === 'loading' && (
					<View style={styles.actWrapStyle}>
						<ActivityIndicator
							style={styles.activityIndicator}
							size='large'
							color='#FFFFFF'
						/>
					</View>
				)}
				{this.state.playState === 'playing' && (
					<TouchableOpacity onPress={this.pause}>
						<Image
							style={styles.imgBtn}
							source={require('../../../../assets/images/pause.png')}
						/>
						<View
							style={styles.imgPauseBtn}
						/>
					</TouchableOpacity>
				)}
				{this.state.playState === 'paused' && (
					<TouchableOpacity onPress={this.play}>
						<Image
							source={require('../../../../assets/images/play_course.png')}
							style={styles.imgBtn}
						/>
					</TouchableOpacity>
				)}

				<View>
					<Text style={styles.playBtnText}>
						{'Прослушайте сюжет игры'.toUpperCase()}
					</Text>
					<Text style={styles.playBtnTextNext}>
						{'Восхождение\nна Кайлас'.toUpperCase()}
					</Text>
				</View>
			</View>
		);
	}
}

MentorSoundPlay.propTypes = {
  playState: PropTypes.string.isRequired,
  isLoading: PropTypes.number,
  removeWhenHidden: PropTypes.bool,
  noAnimation: PropTypes.bool
};

const styles = StyleSheet.create({
	playBlock: {
		marginVertical: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	actWrapStyle: {
		position: 'absolute',
		top: 11,
		left: 17,
		zIndex: 10
	},
	activityIndicator: {
		backgroundColor: '#0c3d84',
		borderRadius: 50
	},
	imgBtn: {
		width: 70,
		height: 70
	},
	imgPauseBtn: {
		position: 'absolute',
		top: 1,
		right: 7
	}
});
export default MentorSoundPlay;
