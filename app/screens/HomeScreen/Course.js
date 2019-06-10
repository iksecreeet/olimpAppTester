//Course screen
import React from 'react';

import {
	StatusBar,
	View,
	Image,
	Text,
	Alert,
	Animated,
	Platform,
	TouchableOpacity,
	TouchableNativeFeedback,
	AsyncStorage,
	ActivityIndicator,
	ImageBackground
} from 'react-native';
import firebase from 'react-native-firebase';
import * as RNIap from 'react-native-iap';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
//import CountdownCircle from '../components/CountdownCircle';
import Timeline from 'react-native-timeline-listview';
import Sound from 'react-native-sound';
//import Svg, { Circle, Path, Rect } from 'react-native-svg';
//import ProgressCircle from 'react-native-progress-circle';
import Carousel from '../../components/Course/Carousel';
import DialogWindow from '../../components/Course/DialogWindow';
import Prize from '../../components/Course/Prize';
import { Left, ActionTopButton } from '../../components/common';
import OlimpIcon from '../../styles/Icons';
import styles from '../../styles/CourseStyles';
import PlayBtn from '../../components/Course/PlayBtn';
import StartPlayBtn from '../../components/Course/StartPlayBtn';
import ModalGameStarted from '../../components/Course/ModalGameStarted';
import AnimatedAfterLoad from '../../components/Course/components/AnimatedAfterLoad';
import {  
  loggedIn 
} from '../../actions';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const randomColors = [
	'#0d3d85',
	'#c29700',
	'#3dae58',
	'#b27044',
	'#2b9da7',
	'#af467e',
	'#b05656'
];
class Course extends React.Component {
	constructor(props) {
		super(props);
		this.timer = 0;
		this.startTimer = this.startTimer.bind(this);
		this.countDown = this.countDown.bind(this);
		this.state = {
			startPlayingError: null,
			userPlaying: false,
			playing: false,
			isVisible: false,
			playState: 'paused', //playing, paused
			playSeconds: 0,
			showPaused: false,
			purchased: false,
			duration: 0,
			timeToCircle: 0,
			visible: false,
			isLoading: '',
			active: false,
			seconds: 4,
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
		this.dataNew = [
			{ title: 'ЗАКОН ПРОСТОТЫ', time: '1' },
			{ title: 'ЭНЕРГИЯ', time: '2' },
			{ title: 'БОЛЬШАЯ ЦЕЛЬ', time: '3' },
			{ title: 'ФОКУСИРОВКА', time: '4' },
			{ title: 'ВОЛЯ', time: '5' },
			{ title: 'ПРЕОДОЛЕНИЕ СТРАХОВ', time: '6' },
			{ title: 'ЛЮБОВЬ К СЕБЕ', time: '7' }
		];
	}

	/*componentDidMount() {
//this.animation.play();
// Or set a specific startFrame and endFrame with:
//this.animation.play(30, 120);
}*/
/*
		AsyncStorage.getItem('@CourseStore:playingKey')
			.then(value => {
				alert(value);
			})
			.done();
*/
	componentDidMount() {
		this.props.loggedIn();
		this.ifPlay();
		const getActive = this.props.navigation.getParam('purchased');
		if (getActive) {
			this.setState({ purchased: true });
		}
		//this.play();
		/*this.timeout = setInterval(() => {
if (
this.sound &&
this.sound.isLoaded() &&
this.state.playState === 'playing' &&
!this.sliderEditing
) {
}
}, 100);*/
	}
	/*componentDidUpdate(prevState) {
this.sound.getCurrentTime((seconds) => {
this.setState({ playSeconds: seconds });
this.setState({
timeToCircle: seconds * (100 / this.state.duration)
});
});
}*/
	componentWillUnmount() {
		if (this.sound) {
			this.sound.release();
			this.sound = null;
		}
		if (this.timeout) {
			clearInterval(this.timeout);
		}
	}
	ifPlay() {
		if (this.props.user) {
			const courseID = firebase.firestore()
			.collection('courses')
			.doc('g7mJEfF2x4eWYHH9x9Iy')
			.collection(this.props.user.uid)
			.doc('courceID_1');

			courseID.get().then((data) => {
			    if (data.exists) {
			        console.log("Document data:", data.data());
			        this.setState({
			        	isPurchased: true
			        });
			    } else {
			        // doc.data() will be undefined in this case
			        console.log("No such document!");
			        this.setState({
			        	isPurchased: false
			        });
			    }
			}).catch((error) => {
			    console.log("Error getting document:", error);
			});
	}
	}
	startTimer() {
		if (this.timer === 0 && this.state.seconds > 0) {
			this.timer = setInterval(this.countDown, 1000);
		}
	}
	countDown() {
		// Remove one second, set state so a re-render happens.
		const seconds = this.state.seconds - 1;
		this.setState({
			seconds: seconds
		});

		// Check if we're at zero.
		if (seconds === 0) {
			clearInterval(this.timer);
			this.setState({ isVisible: true });
			//alert('Игра начинается!');
			this.setPlayingStatus('fdsfds');
		}
	}
	async getPlayingStatus() {
		try {
			const value = await AsyncStorage.getItem('@CourseStore:playingKey');
			this.setState({ playing: value });
		} catch (error) {
			console.log(' Error retrieving data ' + error);
		}
	}
	async setPlayingStatus(value) {
		try {
		  await AsyncStorage.setItem('@CourseStore:playingKey', value);
		} catch (error) {
			console.log(' Error saving data ' + error);
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
	toggle() {
		this.setState({
			visible: !this.state.visible
		});
	}
	setPaused = async () => {
		this.setState({
			countDown: false,
			showPaused: true
		});
	};
	closeModal() {
		this.props.navigation.navigate('Main');
	}
	startInividualdPlay() {
		firebase.firestore()
		.collection('courses')
		.doc('g7mJEfF2x4eWYHH9x9Iy')
		.collection(this.props.user.uid)
		.doc('courceID_1')
		.set({ 
			purchased: true, 
			progress: 0,
			startTime: new Date().toLocaleString()
		})
		.then(this.setState({ 
			userPlaying: true 
		}))
		.catch((error) => this.setState({
			startPlayingError: error
		}));
	}
	continueCommandPlay() {
		this.setState({
			isVisible: false
		});
	}
	render() {
		const randomColor =
			randomColors[Math.floor(Math.random() * randomColors.length)];
		//const { navigation } = this.props;
		//const itemId = navigation.getParam('itemId', 'NO-ID');
		const { navigation } = this.props;
		const color = navigation.getParam('color');
		const name = navigation.getParam('titleName');
		const purchased = this.state.purchased;
		const courseSound = navigation.getParam('sound');
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
			timeLine,
			animateImage,
			animateView,
			animateViewTransform
		} = styles;

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
						{this.state.purchased && (
							<View>
								<View style={wrappMainTitle}>
									<Text style={styles.dayText}>1</Text>
									<Text style={mainTitle}>
										{name.toUpperCase()}
									</Text>
									<Text style={{ color: '#c6ddfe' }}>
										{'Длительность игры'.toUpperCase()}
									</Text>
									<Text style={styles.durationText}>
										{'15 дней'.toUpperCase()}
									</Text>
									<View>
										<View
											style={{
												justifyContent: 'center',
												alignItems: 'center',
												marginTop: 30,
												marginBottom: 20
											}}
										>
										{this.state.isPurchased && (
											<AnimatedAfterLoad 
												text="Вы проходите данный курс"
												animation={require('../../../assets/animation/playing.json')}
										 	/>
										)}
										{this.state.userPlaying && (
											<AnimatedAfterLoad 
												text="Для вас формируются задания"
												animation={require('../../../assets/animation/loading.json')}
										 	/>
										)}
											{this.timer > 0 && this.state.seconds !== 0 && (
												<View>
													<View
														style={{
															position:
																'absolute',
															top: '20%',
															alignSelf: 'center',
															textAlign: 'center'
														}}
													>
														<Animatable.Text
															useNativeDriver={
																true
															}
															animation='zoomIn'
															duration={950}
															easing='ease-out'
															iterationCount={3}
															style={{
																color: '#FFF',
																fontSize: 64,
																fontFamily:
																	'BebasNeue',
																textAlign:
																	'center'
															}}
														>
															{this.state.seconds}
														</Animatable.Text>
													</View>
													<View
														style={{
															position:
																'absolute',
															bottom: 7,
															alignSelf: 'center',
															textAlign: 'center'
														}}
													>
														<Text
															style={{
																color: '#FFF',
																fontSize: 20,
																fontFamily:
																	'BebasNeue',
																textAlign:
																	'center'
															}}
														>
															ИГРАТЬ
														</Text>
													</View>
													<StartPlayBtn />
												</View>
											)}
											{!this.state.isPurchased && (
												<View
												style={
													this.timer > 0 
														? styles.nonActivePlayBtn
														: styles.activePlayBtn
												}
												>
												<TouchableOpacity
													onPress={this.startTimer}
												>
													<View
														style={{
															position:
																'absolute',
															bottom: 7,
															alignSelf: 'center',
															textAlign: 'center'
														}}
													>
														<Text
															style={{
																color: '#FFF',
																fontSize: 20,
																fontFamily:
																	'BebasNeue',
																textAlign:
																	'center'
															}}
														>
															ИГРАТЬ
														</Text>
													</View>
													<PlayBtn />
												</TouchableOpacity>
											</View>
											)}
											
										</View>

										<View style={[playBlock, this.state.isPurchased ? {marginTop: 0 } : {marginVertical: 30}]}>
											{this.state.isLoading ===
												'loading' && (
												<View
													style={{
														position: 'absolute',
														top: 11,
														left: 17,
														zIndex: 10
													}}
												>
													<ActivityIndicator
														style={
															styles.activityIndicator
														}
														size='large'
														color='#FFFFFF'
													/>
												</View>
											)}
											{this.state.playState ===
												'playing' && (
												<TouchableOpacity
													onPress={this.pause}
												>
													<Image
														style={{
															width: 70,
															height: 70
														}}
														source={require('../../../assets/images/pause.png')}
													/>
													<View
														style={{
															position:
																'absolute',
															top: 1,
															right: 7
														}}
													/>
												</TouchableOpacity>
											)}
											{this.state.playState ===
												'paused' && (
												<TouchableOpacity
													onPress={this.play}
												>
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
												<Text
													style={styles.playBtnText}
												>
													{'Прослушайте сюжет игры'.toUpperCase()}
												</Text>
												<Text
													style={
														styles.playBtnTextNext
													}
												>
													{'Восхождение\nна Кайлас'.toUpperCase()}
												</Text>
											</View>
										</View>
									</View>
								</View>
								<DialogWindow />
							</View>
						)}
						{this.state.purchased === false && (
							<View>
								<View style={wrappMainTitle}>
									<Text style={styles.dayText}>1</Text>
									<Text style={mainTitle}>
										{name.toUpperCase()}
									</Text>
									<Text style={{ color: '#c6ddfe' }}>
										{'Длительность игры'.toUpperCase()}
									</Text>
									<Text style={styles.durationText}>
										{'15 дней'.toUpperCase()}
									</Text>
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
													style={
														styles.activityIndicator
													}
													size='large'
													color='#FFFFFF'
												/>
											</View>
										)}
										{this.state.playState === 'playing' && (
											<TouchableOpacity
												onPress={this.pause}
											>
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
											<TouchableOpacity
												onPress={this.play}
											>
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
											<Text
												style={styles.playBtnTextNext}
											>
												{'Восхождение\nна Кайлас'.toUpperCase()}
											</Text>
										</View>
									</View>
									<View style={styles.buttonPlay}>
										<TouchableNativeFeedback
											background={TouchableNativeFeedback.Ripple(
												'ThemeAttrAndroid',
												true
											)}
										>
											<View
												style={{
													paddingHorizontal: 30,
													flexDirection: 'row'
												}}
											>
												<Text
													style={{
														fontFamily:
															'LatoRegular',
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
											</View>
										</TouchableNativeFeedback>
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
							</View>
						)}

						<View style={wrapCourse}>
							<View style={styles.timLineWrapper}>
								<View
									style={{
										height: 10,
										backgroundColor: 'transparent'
									}}
								/>
								<ImageBackground
									resizeMode='cover'
									borderRadius={5}
									style={{ flex: 1 }}
									source={require('../../../assets/images/line_background.jpg')}
								>
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
										circleColor='#19b3a6'
										lineColor='#19b3a6'
										data={this.data}
									/>
								</ImageBackground>
							</View>
							<View style={styles.timLineWrapper}>
								<View
									style={{
										height: 10,
										backgroundColor: 'transparent'
									}}
								/>
								<View

									style={{ flex: 1, borderRadius: 5, elevation: 4, backgroundColor: '#FFF', paddingHorizontal: 10 }}
									
								>
									<View
										style={{
											marginHorizontal: 30,
											marginBottom: 10,
											marginTop: 40
										}}
									>
										<Text
											style={{
												color: '#203348',
												fontFamily: 'LatoBlack',
												fontSize: 16,
												textAlign: 'center',
												lineHeight: 23,
												paddingBottom: 20,
												borderBottomWidth: 1,
												borderBottomColor: '#e8e6e7'
											}}
										>
											ТВОЙ ПУТЬ
										</Text>
									</View>
									<Timeline 
          style={{ flex: 1,
    marginTop:20}}
          data={this.dataNew}
          circleSize={20}
          circleColor='rgba(0,0,0,0)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:32, minHeight: 32}}
          timeStyle={{fontSize: 16, textAlign: 'center', backgroundColor:'#16a498', color:'white', padding:5, borderRadius:16, fontFamily: 'LatoBlack'}}
     	titleStyle={{fontFamily: 'LatoLight', fontSize: 12, textAlign: 'center'}}
          descriptionStyle={{color:'gray' ,fontFamily: 'LatoLight'}}
          options={{
            style:{paddingTop:5}
          }}                  
          //separator={false}
          lineColor='#16a498'
          detailContainerStyle={{marginBottom: 25, paddingLeft: 5, paddingRight: 5, borderWidth: 2, borderColor: '#16a498', borderStyle: 'dashed', alignItems: 'center', textAlign: 'center', borderRadius: 14}}
          columnFormat='two-column'
        />	
								</View>
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
											source={require('../../../assets/images/course_slider.jpg')}
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
											source={require('../../../assets/images/course_slider.jpg')}
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
												В этом, так и в других курсах ты
												можешь накопить кристаллы,
												выполняя задания на которые
												можешь купить другие курсы.
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
											source={require('../../../assets/images/course_slider.jpg')}
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
					style={[
						animateView,
						{
							height: HEADER_MAX_HEIGHT,
							transform: [{ translateY: headerTranslate }]
						}
					]}
				>
					<Animated.Image
						style={[
							animateImage,
							{
								height: HEADER_MAX_HEIGHT,
								opacity: imageOpacity,
								transform: [{ translateY: imageTranslate }]
							}
						]}
						source={require('../../../assets/images/gora.jpg')}
					/>
				</Animated.View>
				<Animated.View
					style={[
						animateViewTransform,
						{
							transform: [
								{ scale: titleScale },
								{ translateY: titleTranslate }
							],
							marginTop:
								Platform.OS === 'ios'
									? 20
									: StatusBar.currentHeight,
							height: Platform.OS === 'ios' ? 64 : 56
						}
					]}
				>
					<Left>
						<ActionTopButton
							onPress={() => this.props.navigation.goBack()}
							pressIcon='o-goback'
						/>
					</Left>
					<View style={flexAlign}>
						<View style={wrappFlex}>
							<Text style={topIconText}>500</Text>
							<OlimpIcon name='o-diamond' style={topIcon} />
						</View>
					</View>
				</Animated.View>
				{/* Start game Modal*/}
				<View>
					<Modal
						backdropColor='#0c3d84'
						animationIn='zoomIn'
						useNativeDriver={true}
						hideModalContentWhileAnimating={true}
						isVisible={this.state.isVisible}
						/*onBackdropPress={() =>
							this.setState({ isVisible: false })
						}*/
						//onSwipe={() => this.setState({ isVisible: false })}
						//swipeDirection='left'
					>
						<View
							style={{
								height: '70%',
								backgroundColor: '#FFF',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 10,
								elevation: 4
							}}
						>
						{this.state.userPlaying && (
								<ModalGameStarted onPress={() => this.continueCommandPlay()} />
						)}
						{!this.state.userPlaying && (
							<View style={{flex: 1, alignItems: 'center'}}>
							<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
							<Text style={{fontSize: 24, fontFamily: 'LatoLight'}}>
								Выберите режим игры
							</Text>
							</View>
						<View style={{flex: 2,
						 alignItems: 'center', justifyContent: 'center'}}>
							<TouchableOpacity style={{padding: 15, marginBottom: 20, backgroundColor: '#0c3d84', width: 200, borderRadius: 5}}>
								<Text style={{textAlign: 'center', fontSize: 14, fontFamily: 'LatoRegular', color: '#FFF'}}>С командой</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.startInividualdPlay()} style={{padding: 15, marginBottom: 10, backgroundColor: '#0c3d84', width: 200, borderRadius: 5}}>
								<Text style={{textAlign: 'center', fontSize: 14, fontFamily: 'LatoRegular', color: '#FFF'}}>Самостоятельно</Text>
							</TouchableOpacity>
						</View>
							</View>
						)}
						
							{/*<TouchableOpacity
							 onPress={() => this.closeModal()}
							style={{padding: 15, marginBottom: 10, backgroundColor: 'red', width: '80%', borderRadius: 5}}>
								<Text style={{textAlign: 'center', fontSize: 14, fontFamily: 'LatoRegular', color: '#FFF'}}>Я передумал, начну позже</Text>
							</TouchableOpacity>*/}
						</View>
					</Modal>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps, {
  loggedIn
})(Course);
