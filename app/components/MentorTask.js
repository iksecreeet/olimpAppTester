import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Dimensions,
  StyleSheet
} from 'react-native';
import Modal from 'react-native-modal';
import Sound from 'react-native-sound';
import ProgressCircle from 'react-native-progress-circle';
import HideableView from '../components/HideableView'; 
import PlaySky from '../components/MentorTasks/PlaySky';

const TaskPause = require('../../assets/resources/ui-pause-button.png');
const TaskPlay = require('../../assets/resources/ui-play-button.png');
const TaskJumpLeft = require('../../assets/resources/ui-arrow-previous.png');
const TaskJumpRight = require('../../assets/resources/ui-arrow-next.png');

let winSize = Dimensions.get('window');
export default class MentorTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0,
      timeToCircle: 0,
      visible: false,
      isVisible: false
    };
    this.toggle = this.toggle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.sliderEditing = false;
  }
  toggle() {
        this.setState({
            visible: !this.state.visible
        });
    }
    openModal() {
      this.setState({
        isVisible: true
      })
    }
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
      const filepath = 'https://liga-app.com/api/audio/ilya_isaev_audio-production_demo.mp3';
      console.log('[Play]', filepath);

      this.sound = new Sound(filepath, Sound.MAIN_BUNDLE, error => {
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
    this.jumpSeconds(-5);
  };
  jumpNext5Seconds = () => {
    this.jumpSeconds(5);
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

  render() {
    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);
    return (
      <View >
      <PlaySky />
      <View style={{height: 95, position: 'absolute', width: Dimensions.get('window').width * 0.9}}>
          <View
            style={{
              position: 'absolute',
              width: 100,
              top: 25,
              left: '12%'
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: '#203348',
                textAlign: 'center',
                fontFamily: 'LatoRegular'
              }}
            >
              Задание
            </Text>

            <TouchableOpacity style={{ padding: 5 }} onPress={this.openModal}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 10,
                  paddingTop: 2,
                  paddingBottom: 2,
                  textAlign: 'center',
                  backgroundColor: '#4d86e3',
                  fontFamily: 'LatoBold',
                  borderRadius: 20
                }}
              >
                {/*{this.state.visible ? 'Свернуть' : 'Читать'}*/}
                Читать
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              alignSelf: 'center',
              position: 'absolute',
              right: '23.5%',
              top: 4,
              fontFamily: 'LatoBold',
              fontSize: 9,
              color: '#4d86e3'
            }}
          >
            {currentTimeString}
          </Text>
          {this.state.playState === 'playing' && (
            <View>
            <TouchableOpacity
              onPress={this.pause}
              style={{
                zIndex: 2,
                position: 'absolute',
                top: 18,
                right: '18%'
              }}
            >
              <Image source={TaskPause} style={{ width: 60, height: 60, position: 'relative', right: 0, top: 0, zIndex: 100}} />
              <View style={{position: 'absolute', top: 0, right: 0, zIndex: 1}}>
              <ProgressCircle
                    percent={this.state.timeToCircle}
                    radius={30}
                    borderWidth={3}
                    color="#3399FF"
                    shadowColor="#999"
                    bgColor="#fff"
                />
                </View>
            </TouchableOpacity>
            </View>
          )}
          {this.state.playState === 'paused' && (
            <TouchableOpacity
              onPress={this.play}
              style={{
                zIndex: 2,
                position: 'absolute',
                top: 18,
                right: '18%'
              }}
            >
              <Image source={TaskPlay} style={{ width: 60, height: 60 }} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={this.jumpNext5Seconds}
            style={{ position: 'absolute', right: '9%', top: 40 }}
          >
            <Image source={TaskJumpRight} style={{ width: 18, height: 15 }} />
            <Text
              style={{
                alignSelf: 'center',
                color: '#657280',
                fontSize: 10,
                fontFamily: 'LatoRegular'
              }}
            >
              5 c
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.jumpPrev5Seconds}
            style={{ position: 'absolute', right: '40%', top: 40 }}
          >
            <Image source={TaskJumpLeft} style={{ width: 18, height: 15 }} />
            <Text
              style={{
                alignSelf: 'center',
                color: '#657280',
                fontFamily: 'LatoRegular',
                fontSize: 10,
                zIndex: 20
              }}
            >
              5 c
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              position: 'absolute',
              right: '8%',
              top: 80,
              color: '#eaecee',
              fontSize: 10
            }}
          >
            12:42
          </Text>
            <HideableView removeWhenHidden={true} visible={this.state.visible}>
              <View style={{ backgroundColor: 'white', 
               paddingVertical: 20,
               paddingHorizontal: 10, 
               width: 299, 
               marginLeft: '5%',
               marginTop:65, 
               borderBottomLeftRadius: 12, 
               borderBottomRightRadius: 12}}>
              <Text style={{fontFamily: 'LatoRegular', fontSize: 12}}>
                  Привет. Я Зевс. Тут будет много текста, который будет прокручиваться
              </Text>
              </View>
          </HideableView>
          </View>
<View>
          <Modal
            backdropColor='#0c3d84'
            animationIn='zoomIn'
            //useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            isVisible={this.state.isVisible}
            /*onBackdropPress={() =>
              this.setState({ isVisible: false })
            }*/
            onSwipe={() => this.setState({ isVisible: false })}
            swipeDirection='right'
          >
            <View
              style={{
                backgroundColor: '#FFF',
                justifyContent: 'center',
                padding: 20,
                alignItems: 'center',
              }}
            >
            <Text style={{fontSize: 14, lineHeight: 18, textAlign: 'justify' }}>Большие цели за 15 минут
Нам важно выявить твои большие мечты, потому что в них огромное количество энергии. Для этого ты, в течении 15 минут на листке бумаги пишешь 100 целей, почему всего 15 минут, чтобы ты не успевал думать, тогда подключится твоя интуиция и твои цели будут ближе к истине, а не навязанные обществом. Пиши первую мысль, которая приходит в голову. Пока только пиши, завтра все будем упрощать и убирать лишнее. 
После истечения времени, ответь себе на такой вопрос: если бы ты был Богом, и ты мог загадывать самые масштабные и смелые желания, какие цели бы ты загадал? Напиши еще минимум 5 самых масштабных целей, которые тебя бы зажигали.</Text>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(240,240,240,1)'
  },
  button: {
    backgroundColor: 'rgba(220,220,220,1)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    padding: 7
  },
  header: {
    textAlign: 'left'
  },
  feature: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)'
  }
});
