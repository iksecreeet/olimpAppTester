import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { 
  signOut, 
  loggedIn 
} from '../../actions';
import NavigationService from '../../actions/NavigationService';
import { Input } from '../../components/common';

class Profile extends Component {
  constructor() {
      super();
      this.toggleSwitch1 = this.toggleSwitch1.bind(this);
      this.state = {
         password: '',
         switch1Value: false,
      };
   }
  componentDidMount() {
    this.props.loggedIn();
  }
  signOutAndNavigate() {
    this.props.signOut();
    NavigationService.navigate('Common');
  }
  changeName(text) {
    this.setState({
      name: text
    });
  }
  changePassword(text) {
    this.setState({
      password: text
    });
  }
  toggleSwitch1 = (value) => {
      this.setState({ switch1Value: value });
      console.log('Switch 1 is: ' + value );
   }
   pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height},
        images: null
      });
    }).catch(e => alert(e));
  }
  render() {
    if(this.props.isLoggedIn) {
        return (
          <View style={styles.container}>
            <StatusBar backgroundColor={'transparent'} translucent />
            <View style={styles.header}>
            {this.props.user.photoURL ? (
              <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)}>
                <Image
                  source={{ uri: this.props.user.photoURL }}
                  style={styles.avatar}
                />
              </TouchableOpacity>
          ) : <Image
              source={require('../../../assets/images/man.png')}
              style={styles.avatar}
              /> }
            </View>
            <ScrollView style={styles.body}>
                <View style={{ flex: 1, justifyContent: 'center'}}>
                <View style={{ backgroundColor: '#f2f2f2'}}>
                  <Text style={{padding: 10, fontFamily: 'LatoBold'}}>ОСНОВНЫЕ</Text>
                </View>
                <View style={{backgroundColor: '#FFF', padding: 10}}>
                  <Text style={{color: '#CCC', fontFamily:'LatoRegular', paddingVertical: 10}}>Имя</Text>
                  <Text style={styles.name}>{this.props.user.displayName}</Text>     
                </View>
                <View style={{ backgroundColor: '#f2f2f2'}}>
                  <Text style={{padding: 10}}>Уведомления</Text>
                </View>
                <View style={{backgroundColor: '#FFF', padding: 5, flexDirection: 'row'}}>
                <View style={{alignSelf: 'flex-start', paddingHorizontal: 5}}>
                  <Text style={{color: '#CCC', fontFamily:'LatoRegular', flex: 2}}>
                    Push уведомления
                  </Text>  
                </View>
                <View style={{alignSelf: 'flex-end',flex: 1,  paddingHorizontal: 5 }}>
                  <Switch
                   onValueChange={this.toggleSwitch1}
                   value={this.state.switch1Value}
                   />
                </View>
                </View>
                 <View style={{backgroundColor: '#FFF', flex: 1}}>
                  <View style={{ backgroundColor: '#f2f2f2'}}>
                    <Text style={{ padding: 10 }}>ИЗМЕНИТЬ ДАННЫЕ</Text>
                  </View>
                  <View style={{backgroundColor: '#FFF', justifyContent: 'center', padding: 10}}>
                  <Text style={{color: '#CCC', fontFamily:'LatoRegular', paddingVertical: 10}}>Имя пользователя</Text>
                  <Input
                    style={styles.inputStyle}
                    autoCorrect={false}
                    disabled
                    underlineColorAndroid='transparent'
                    label='Имя пользователя'
                    value={this.props.user.email}
                    onChangeText={this.changeName.bind(this)}
                  />
                  <Text style={{color: '#CCC', fontFamily:'LatoRegular', paddingVertical: 10}}>Пароль</Text>  
                  <Input
                    style={styles.inputStyle}
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    label='Пароль'
                    secureTextEntry
                    value='Новый пароль'
                    onChangeText={this.changePassword.bind(this)}
                  />
                  </View>
                 </View>
                 <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF'}}>
                <TouchableOpacity onPress={this.signOutAndNavigate.bind(this)} style={styles.button}>
                  <Text style={styles.buttonText}>Выйти</Text>  
                </TouchableOpacity>
                </View>
                </View>    
            </ScrollView>
          </View>
          ); 
    } 
    else {
      return (
          <View>
            <Text>Вы не авторизованы</Text>  
          </View>
          ); 
    }
  }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFF'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0c3d84',
    height: 160,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  name:{ 
    fontSize:14,
    fontFamily: 'LatoBold',
    color:'#000',
  },
  body:{
    backgroundColor: '#0c3d84',
    flex: 1,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    paddingVertical:10,
    paddingHorizontal: 20,
    marginBottom: 20
  },
  info:{
    fontSize:14,
    color: '#ccc',
    marginTop:20
  },
  description:{
    fontSize:14,
    color: '#696969',
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    borderRadius:5,
    backgroundColor: '#0c3d84',
  },
  inputStyle: {
    width: 300,
    backgroundColor: '#f2f2f2',
    borderColor: '#0c3d84',
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 14,
    marginVertical: 5
  },
  button: {
    width: 300,
    backgroundColor: '#24bf53',
    borderRadius: 6,
    marginVertical: 10,
    paddingVertical: 12
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'LatoBold',
    textAlign: 'center'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn
  }
}
export default connect(mapStateToProps, {
  loggedIn, signOut
})(Profile)

