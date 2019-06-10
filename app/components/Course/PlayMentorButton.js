import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';

class PlayMentorButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playing: false,
			playState: 'paused', //playing, paused
			playSeconds: 0,
			showPaused: false,
			duration: 0
		};
	}
	componentDidMount() {}
	componentWillUnmount() {
		if (this.sound) {
			this.sound.release();
			this.sound = null;
		}
	}
	playComplete = success => {
		if (this.sound) {
			if (success) {
				console.log('successfully finished playing');
			} else {
				console.log('playback failed due to audio decoding errors');
				//Alert.alert('Notice', 'audio file error. (Error code : 2)');
			}
			this.setState({ playState: 'paused', playSeconds: 0 });
			this.sound.setCurrentTime(0);
		}
	};

	pause = () => {
		if (this.sound) {
			this.sound.pause();
		}

		this.setState({ playState: 'paused' });
	};

	getAudioTimeString(seconds) {
		//const h = parseInt(seconds / (60 * 60));
		const m = parseInt((seconds % (60 * 60)) / 60, 10);
		const s = parseInt(seconds % 60, 10);

		return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
	}
	play = async () => {
		if (this.sound) {
			this.sound.play(this.playComplete);
			this.setState({ playState: 'playing' });
		} else {
			this.setState({ isLoading: 'loading' });
			const filepath = 'https://liga-app.com/api/audio/001.mp3';
			console.log('[Play]', filepath);
			this.sound = new Sound(filepath, Sound.MAIN_BUNDLE, error => {
				if (error) {
					Alert.alert('failed to load the sound', error);
					Alert.alert('Notice', 'audio file error. (Error code : 1)');
					this.setState({ playState: 'paused' });
				} else {
					this.setState({
						isLoading: '',
						playState: 'playing',
						duration: this.sound.getDuration()
					});
					this.sound.play(this.playComplete);
				}
			});
		}
	};
	setPaused = async () => {
		this.setState({
			countDown: false,
			showPaused: true
		});
	};
	render() {
		return (
			<View style={playBlock}>
				{this.state.isLoading === 'loading' && (
					<View
						style={{
							position: 'absolute',
							top: 11,
							left: 17,
							zIndex: 10
						}}
					>
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
							style={{
								width: 70,
								height: 70
							}}
							source={require('../../../assets/images/pause.png')}
						/>
						<View
							style={{
								position: 'absolute',
								top: 1,
								right: 7
							}}
						/>
					</TouchableOpacity>
				)}
				{this.state.playState === 'paused' && (
					<TouchableOpacity onPress={this.play}>
						<Image
							source={require('../../../assets/images/play_course.png')}
							style={{
								width: 70,
								height: 70
							}}
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

const styles = StyleSheet.create({

})
export default PlayMentorButton;
