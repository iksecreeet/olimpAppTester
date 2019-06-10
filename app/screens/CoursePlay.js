//Course screen
import React from 'react';

import {
	StatusBar,
	View,
	Image,
	ScrollView,
	Text,
	Alert,
	Animated,
	Platform,
	TouchableOpacity,
	TouchableHighlight,
	ImageBackground
} from 'react-native';

import Timeline from 'react-native-timeline-listview';
import Sound from 'react-native-sound';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import ProgressCircle from 'react-native-progress-circle';
import Carousel from '../components/Course/Carousel';
import DialogWindow from '../components/Course/DialogWindow';
import Prize from '../components/Course/Prize';
import { Left, TopIcon } from '../components/common';
import OlimpIcon from '../styles/Icons';
import styles from '../styles/CourseStyles';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class Course extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playState: 'paused', //playing, paused
			playSeconds: 0,
			duration: 0,
			timeToCircle: 0,
			visible: false,
			active: false,
			scrollY: new Animated.Value(
				// iOS has negative initial scroll value because content inset...
				Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
			)
		};
		this.toggle = this.toggle.bind(this);
		this.sliderEditing = false;
		this.data = [
			{ title: 'Ставить большие цели' },
			{ title: 'Доводить дела до конца' },
			{ title: 'Наполнять себя энергией и мотивацией' },
			{ title: 'Фокусироваться и мыслить масштабно' },
			{ title: 'Эффективно использовать свою волю' },
			{ title: 'Преодолевать страхи и сомнения' },
			{ title: 'Принимать трудные решения' },
			{ title: 'Не расстрачивать энергию впустую' },
			{ title: 'Жить здесь и сейчас' }
		];
	}

	/*componentDidMount() {
	//this.animation.play();
	// Or set a specific startFrame and endFrame with:
	//this.animation.play(30, 120);
}*/
	componentDidMount() {
		//this.play();
		this.timeout = setInterval(() => {
			if (
				this.sound &&
				this.sound.isLoaded() &&
				this.state.playState === 'playing' &&
				!this.sliderEditing
			) {
				this.sound.getCurrentTime((seconds) => {
					this.setState({ playSeconds: seconds });
					this.setState({
						timeToCircle: seconds * (100 / this.state.duration)
					});
				});
			}
		}, 100);
	}
	componentWillUnmount() {
		if (this.sound) {
			this.sound.release();
			this.sound = null;
		}
		if (this.timeout) {
			clearInterval(this.timeout);
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
			const filepath = 'https://liga-app.com/audio/001.mp3';
			console.log('[Play]', filepath);

			this.sound = new Sound(filepath, '', error => {
				if (error) {
					console.log('failed to load the sound', error);
					Alert.alert('Notice', 'audio file error. (Error code : 1)');
					this.setState({ playState: 'paused' });
				} else {
					this.setState({
						playState: 'playing',
						duration: this.sound.getDuration()
					});
					this.sound.play(this.playComplete);
				}
			});
		}
	};
	toggle() {
		this.setState({
			visible: !this.state.visible
		});
	}
	render() {
		// Because of content inset the scroll value will be negative on iOS so bring
		// it back to 0.
		const scrollY = Animated.add(
			this.state.scrollY,
			Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0
		);
		const headerTranslate = scrollY.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE],
			outputRange: [0, -HEADER_SCROLL_DISTANCE],
			extrapolate: 'clamp'
		});

		const imageOpacity = scrollY.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
			outputRange: [1, 1, 0],
			extrapolate: 'clamp'
		});
		const imageTranslate = scrollY.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE],
			outputRange: [0, 100],
			extrapolate: 'clamp'
		});

		const titleScale = scrollY.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
			outputRange: [1, 1, 1],
			extrapolate: 'clamp'
		});
		const titleTranslate = scrollY.interpolate({
			inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
			outputRange: [0, 0, -8],
			extrapolate: 'clamp'
		});
		const {
			coverImage,
			headerBody,
			flexAlign,
			wrappFlex,
			topIconText,
			topIcon,
			viewBackground,
			wrappMainTitle,
			mainTitle,
			wrapCourse,
			playBlock,
			timeLine
		} = styles;
		//const { navigation } = this.props;
		//const itemId = navigation.getParam('itemId', 'NO-ID');
		const { navigation } = this.props;
	    const color = navigation.getParam('color');
	    const name = navigation.getParam('titleName');
	    const courseSound = navigation.getParam('sound');
		return (
			<View style={viewBackground}>
				<StatusBar
					barStyle='light-content'
					backgroundColor='transparent'
					translucent={true}
				/>
				<Animated.ScrollView
					scrollEventThrottle={1}
					onScroll={Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: { y: this.state.scrollY }
								}
							}
						],
						{ useNativeDriver: true }
					)}
					style={{ flex: 1 }}
					ref={c => {
						this.parentScrollView = c;
					}}
					contentInset={{
						top: HEADER_MAX_HEIGHT
					}}
					contentOffset={{
						y: -HEADER_MAX_HEIGHT
					}}
				>
					<View
						style={{
							paddingTop:
								Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0
						}}
					>
						<View style={wrappMainTitle}>
							<Text
								style={{
									color: '#FFF',
									fontSize: 16,
									fontFamily: 'LatoRegular',
									paddingBottom: 15
								}}
							>
								1
							</Text>
							<Text style={mainTitle}>
							{name.toUpperCase()}
							</Text>
							<Text style={{ color: '#c6ddfe' }}>
								{'Длительность игры'.toUpperCase()}
							</Text>
							<Text
								style={{
									fontFamily: 'LatoBold',
									color: '#c6ddfe',
									fontSize: 20
								}}
							>
								{'15 дней'.toUpperCase()}
							</Text>
							<View style={playBlock}>
								<View>
									{this.state.playState === 'playing' && (
										<TouchableOpacity onPress={this.pause}>
											<Image
												style={{
													width: 70,
													height: 70
												}}
												source={require('../../assets/images/play_course.png')}
											/>
											<View
												style={{
													position: 'absolute',
													top: 1,
													right: 7
												}}
											>
												<ProgressCircle
													percent={
														this.state.timeToCircle
													}
													radius={28}
													borderWidth={3}
													color='#3399FF'
													shadowColor='#999'
													bgColor='#0d3d85'
												/>
											</View>
										</TouchableOpacity>
									)}
									{this.state.playState === 'paused' && (
										<TouchableOpacity onPress={this.play}>
											<Image
												source={require('../../assets/images/play_course.png')}
												style={{
													width: 70,
													height: 70
												}}
											/>
										</TouchableOpacity>
									)}
								</View>
								<View>
									<Text
										style={{
											marginLeft: 15,
											paddingBottom: 5,
											fontSize: 10,
											color: '#c6ddfe',
											fontFamily: 'LatoRegular'
										}}
									>
										{'Прослушайте сюжет игры'.toUpperCase()}
									</Text>
									<Text
										style={{
											marginLeft: 15,
											fontSize: 15,
											color: '#c6ddfe',
											lineHeight: 20,
											fontFamily: 'LatoBold'
										}}
									>
										{'Восхождение\nна Кайлас'.toUpperCase()}
									</Text>
								</View>
							</View>
	<View>
			<Svg 
				width="146" height="159" viewBox="0 0 146 159"
				fill="none" 
				xmlns="http://www.w3.org/2000/svg"
			>
			<Circle 
				cx="73" cy="73" r="70.5"
				fill="transparent" 
				stroke="white" 
				strokeWidth="3"
				strokeOpacity="0.5" 
			/>
			<Path 
				d="M93 121.5H52C42.335 121.5 34.5 129.335 34.5 139C34.5 148.665 42.335 156.5 52 156.5H93C102.665 156.5 110.5 148.665 110.5 139C110.5 129.335 102.665 121.5 93 121.5Z"
				fill="#0c3d84" 
				stroke="white"
				strokeOpacity="0.5" 
				strokeWidth="3"
			/>
		</Svg>
	</View>
							<View>
								<TouchableOpacity
									style={{
										backgroundColor: '#FFF',
										elevation: 4,
										borderRadius: 50,
										flexDirection: 'row',
										paddingHorizontal: 30,
										paddingVertical: 12,
										marginBottom: 10
									}}
								>
									<Text
										style={{
											fontFamily: 'LatoRegular',
											color: '#3dae58',
											fontSize: 18
										}}
									>
										Купить за
									</Text>
									<Text
										style={{
											fontFamily: 'LatoBold',
											color: '#3dae58',
											fontSize: 18,
											marginLeft: 5
										}}
									>
										2100
									</Text>
									<OlimpIcon
										name='o-diamond'
										style={{
											color: '#3dae58',
											fontSize: 18,
											marginLeft: 5,
											marginTop: 4
										}}
									/>
								</TouchableOpacity>
							</View>
							<View
								style={{
									alignItems: 'center',
									marginTop: 7,
									marginBottom: 2
								}}
							>
								<Text
									style={{
										color: '#fecebd',
										fontFamily: 'LatoBlack',
										fontSize: 12
									}}
								>
									{'Не хватает 1600'.toUpperCase()}
								</Text>
								<Text
									style={{
										color: '#FFF',
										fontFamily: 'LatoBlack',
										fontSize: 12
									}}
								>
									{'У тебя 3500'.toUpperCase()}
								</Text>
							</View>
						</View>
						<DialogWindow />
						<View style={wrapCourse}>
							<View style={styles.timLineWrapper}>
							<View style={{
									borderLeftWidth: 2, 
									borderLeftColor: '#24bf53', 
									height: 200, width: 2, 
									position: 'absolute',
									top: 8,
									zIndex: 10,
									left: 40
								}}/>
			
								<View style={{height: 10, backgroundColor: 'transparent'}}/>
							<ImageBackground
								resizeMode='cover'
								borderRadius={5}
								style={{ flex: 1 }}
								source={require('../../assets/images/line_background.jpg')}
							>
												<View style={{width: 20, height: 20, position: 'absolute', left: 34, top: -9}}>
								<OlimpIcon
								style={{color: '#24bf53', fontSize: 14}} 
								name='o-up-arrow' 
								/>
								</View>
								<View
									style={{
										marginLeft: 65,
										marginBottom: 30,
										marginTop: 40
									}}
								>
									<Text
										style={{
											color: '#203348',
											fontFamily: 'LatoBlack',
											fontSize: 16,
											lineHeight: 23,
											marginRight: 20,
											paddingBottom: 20,
											borderBottomWidth: 1,
											borderBottomColor: '#e8e6e7'
										}}
									>
										ТЫ ИСПЫТАЕШЬ{'\n'}НА СЕБЕ КАК:
									</Text>
								</View>

								<Timeline
									titleStyle={{
										color: '#203348',
										fontSize: 14,
										marginTop: -13,
										marginLeft: 5,
										paddingBottom: 10,
										fontFamily: 'LatoLight'
									}}
									showTime={false}
									circleSize={12}
									lineWidth={2}
									columnFormat='single-column-left'
									listViewStyle={{
										paddingLeft: 20,
										marginRight: 40
									}}
									circleColor='#24bf53'
									lineColor='#24bf53'
									data={this.data}
								/>
							</ImageBackground>
							</View>
							<View style={{ marginVertical: 30, flex: 1 }}>
								<Text
									style={{
										color: '#fff',
										fontFamily: 'LatoBold',
										fontSize: 16,
										textAlign: 'center'
									}}
								>
									{'Особенности этого курса'.toUpperCase()}
								</Text>
								<View
									style={{
										borderRadius: 20,
										alignItems: 'center',
										paddingVertical: 30,
										backgroundColor: 'transparent'
									}}
								>
									<Carousel
										height={243}
										width={300}
										color='#FFF'
										backgroundColor='transparent'
									>
										<ImageBackground
											borderRadius={5}
											resizeMode={'cover'}
											style={{
												paddingHorizontal: 20,
												width: 300,
												height: 243,
												flex: 1,
												flexDirection: 'column',
												alignItems: 'center',
												justifyContent: 'center'
											}}
											source={require('../../assets/images/course_slider.jpg')}
										>
											<View style={{ paddingBottom: 20 }}>
												<Text
													style={{
														fontSize: 20,
														fontFamily:
															'LatoRegular',
														color: '#203348',
														textAlign: 'center'
													}}
												>
													ВСЕ ЗАДАНИЯ
												</Text>
												<Text
													style={{
														fontSize: 20,
														fontFamily: 'LatoBold',
														color: '#203348',
														textAlign: 'center'
													}}
												>
													1 СЕЗОНА
												</Text>
											</View>
											<Text
												style={{
													paddingHorizontal: 5,
													fontSize: 14,
													lineHeight: 18,
													fontFamily: 'LatoRegular'
												}}
											>
												В этом курсе ты сможешь испытать
												на себе по одному заданию из
												каждого курса 1 сезона.
											</Text>
										</ImageBackground>

										<ImageBackground
											borderRadius={5}
											resizeMode={'cover'}
											style={{
												paddingHorizontal: 20,
												width: 300,
												height: 243,
												flex: 1,
												flexDirection: 'column',
												alignItems: 'center',
												justifyContent: 'center'
											}}
											source={require('../../assets/images/course_slider.jpg')}
										>
											<View style={{ paddingBottom: 20 }}>
												<Text
													style={{
														fontSize: 20,
														fontFamily:
															'LatoRegular',
														color: '#203348',
														textAlign: 'center'
													}}
												>
													НАКОПИ
												</Text>
												<Text
													style={{
														fontSize: 20,
														fontFamily: 'LatoBold',
														color: '#203348',
														textAlign: 'center'
													}}
												>
													КРИСТАЛЫ
												</Text>
											</View>
											<Text
												style={{
													paddingHorizontal: 5,
													fontSize: 14,
													lineHeight: 18,
													fontFamily: 'LatoRegular'
												}}
											>
												В этом, так и в других курсах ты можешь накопить кристаллы, выполняя задания на которые можешь купить другие курсы.
											</Text>
										</ImageBackground>
										<ImageBackground
											borderRadius={5}
											resizeMode={'cover'}
											style={{
												paddingHorizontal: 20,
												width: 300,
												height: 243,
												flex: 1,

												flexDirection: 'column',
												alignItems: 'center',
												justifyContent: 'center'
											}}
											source={require('../../assets/images/course_slider.jpg')}
										>
											<View style={{ paddingBottom: 20 }}>
												<Text
													style={{
														fontSize: 20,
														fontFamily:
															'LatoRegular',
														color: '#203348',
														textAlign: 'center'
													}}
												>
													БЕСПЛАТНО
												</Text>
												<Text
													style={{
														fontSize: 20,
														fontFamily: 'LatoBold',
														color: '#203348',
														textAlign: 'center'
													}}
												>
													И БЕЗ ОГРАНИЧЕНИЙ
												</Text>
											</View>
											<Text
												style={{
													paddingHorizontal: 5,
													fontSize: 14,
													lineHeight: 18,
													fontFamily: 'LatoRegular'
												}}
											>
												В этом курсе ты сможешь испытать
												на себе по одному заданию из
												каждого курса 1 сезона.
											</Text>
										</ImageBackground>
									</Carousel>
								</View>
								<View style={{ marginVertical: 10 }}>
									<Text
										style={{
											color: '#fff',
											fontFamily: 'LatoBold',
											fontSize: 16,
											textAlign: 'center'
										}}
									>
										{'Награды и находки'.toUpperCase()}
									</Text>
									<View style={{ marginVertical: 10 }}>
										<Prize />
									</View>
								</View>
							</View>
						</View>
					</View>
				</Animated.ScrollView>
				<Animated.View
					pointerEvents='none'
					style={{
						position: 'absolute',
						top: 0, 
						left: 0,
						right: 0,
						backgroundColor: '#17478d',
						overflow: 'hidden',
						height: HEADER_MAX_HEIGHT,
						transform: [{ translateY: headerTranslate }]
					}}
				>
					<Animated.Image
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							width: null,
							height: HEADER_MAX_HEIGHT,
							resizeMode: 'cover',
							opacity: imageOpacity,
							transform: [{ translateY: imageTranslate }]
						}}
						source={require('../../assets/images/gora.jpg')}
					/>
				</Animated.View>
				<Animated.View
					style={{
						transform: [
							{ scale: titleScale },
							{ translateY: titleTranslate }
						],
						backgroundColor: 'transparent',
						marginTop: Platform.OS === 'ios' ? 28 : 38,
						height: 32,
						alignItems: 'center',
						justifyContent: 'center',
						position: 'absolute',
						paddingLeft: 20,
					    paddingRight: 20,
					    flexDirection: 'row',
						top: 0,
						left: 0,
						right: 0
					}}
				>
					<Left>
						<TopIcon
							name='o-goback'
							onPress={() => this.props.navigation.goBack()}
						/>
					</Left>
					<View style={flexAlign}>
						<View style={wrappFlex}>
							<Text style={topIconText}>500</Text>
							<OlimpIcon name='o-diamond' style={topIcon} />
						</View>
					</View>
				</Animated.View>
			</View>
		);
	}
}

export default Course;