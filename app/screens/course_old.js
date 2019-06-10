//Course screen
/*
		<LottieView
			ref={animation => {
				this.animation = animation;
			}}
			source={require('../../assets/animation/suncloud.json')}
		/>
*/
import React from 'react';

import {
	StatusBar,
	View,
	Image,
	ScrollView,
	Text,
	Alert,
	TouchableOpacity,
	TouchableHighlight,
	ImageBackground
} from 'react-native';

import Timeline from 'react-native-timeline-listview';
import Sound from 'react-native-sound';
import Svg,{
    Circle,
    Path
} from 'react-native-svg';
import ProgressCircle from 'react-native-progress-circle';
import Carousel from '../components/Course/Carousel';
import DialogWindow from '../components/Course/DialogWindow';
import Prize from '../components/Course/Prize';
import { Left, TopIcon } from '../components/common';
import OlimpIcon from '../styles/Icons';
import styles from '../styles/CourseStyles';


export default class DetailsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playState: 'paused', //playing, paused
			playSeconds: 0,
			duration: 0,
			timeToCircle: 0,
			visible: false,
			active: false,
			activeMentor: 1
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
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({ playSeconds: seconds });
          this.setState({ timeToCircle: seconds * (100 / this.state.duration) });
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
  onSliderEditStart = () => {
    this.sliderEditing = true;
  };
  onSliderEditEnd = () => {
    this.sliderEditing = false;
  };
  onSliderEditing = value => {
    if (this.sound) {
      this.sound.setCurrentTime(value);
      this.setState({ playSeconds: value });
    }
  };

  play = async () => {
    if (this.sound) {
      this.sound.play(this.playComplete);
      this.setState({ playState: 'playing' });
    } else {
      const filepath = 'http://d.zaix.ru/7Uee.mp3';
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

  jumpPrev5Seconds = () => {
    this.jumpSeconds(-15);
  };
  jumpNext5Seconds = () => {
    this.jumpSeconds(15);
  };
  jumpSeconds = secsDelta => {
    if (this.sound) {
      this.sound.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if (nextSecs < 0) nextSecs = 0;
        else if (nextSecs > this.state.duration) nextSecs = this.state.duration;
        this.sound.setCurrentTime(nextSecs);
        this.setState({ playSeconds: nextSecs });
      });
    }
  };

  getAudioTimeString(seconds) {
    //const h = parseInt(seconds / (60 * 60));
    const m = parseInt(((seconds % (60 * 60)) / 60), 10);
    const s = parseInt((seconds % 60), 10);

    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
  }
	toggle() {
		this.setState({
			visible: !this.state.visible
		});
	}
	render() {
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
			playBlock,
			wrapCourse
		} = styles;
		//const { navigation } = this.props;
		//const itemId = navigation.getParam('itemId', 'NO-ID');

		return (
			<View>
				<ImageBackground
					style={coverImage}
					resizeMode={'cover'}
					source={require('../../assets/images/gora.jpg')}
				>
					<View style={headerBody}>
						<StatusBar
							barStyle='light-content'
							backgroundColor='transparent'
							translucent={true}
						/>
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
					</View>
				</ImageBackground>
				<View style={viewBackground}>
					<ScrollView
						ref={c => {
							this.parentScrollView = c;
						}}
					>
						<View style={wrappMainTitle}>
							<Text style={{color: '#FFF', fontSize: 16, fontFamily: 'LatoRegular', paddingBottom: 15}}>1</Text>
							<Text style={mainTitle}>
								{'Как достигать больших целей?'.toUpperCase()}
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
					            <TouchableOpacity
					              onPress={this.pause}
					            >
									<Image
										style={{ width: 70, height: 70 }}
										source={require('../../assets/images/play_course.png')}
									/>
					              <View style={{position: 'absolute', top: 1, right: 7}}>
					              <ProgressCircle
					                    percent={this.state.timeToCircle}
					                    radius={28}
					                    borderWidth={3}
					                    color="#3399FF"
					                    shadowColor="#999"
					                    bgColor="#0d3d85"
					                />
					                </View>
					            </TouchableOpacity>
					          )}
					          {this.state.playState === 'paused' && (
            <TouchableOpacity
              onPress={this.play}
            >
              <Image source={require('../../assets/images/play_course.png')} style={{ width: 70, height: 70 }} />
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
								style={{ alignItems: 'center', marginTop: 7,marginBottom: 2 }}
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
									top: -20,
									zIndex: 10,
									left: 40
								}}/>
							<ImageBackground
								resizeMode='cover'
								borderRadius={5}
								style={{ flex: 1 }}
								source={require('../../assets/images/line_background.jpg')}
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
														fontFamily: 'LatoRegular',
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
									</Carousel>
								</View>
								<View style={{marginVertical: 10}}>
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
								<View style={{marginVertical: 10}}>
								<Prize />
								</View>
								</View>
							</View>
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}

