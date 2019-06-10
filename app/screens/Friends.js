
/*
  Friends screen
  Using GiftedChat as UI and Pusher Chatkit for backend
                <Dropdown
                data={data}
                renderBase={() => (
                  <OlimpIcon name='o-vmenu' style={styles.dropdownBtn} />
                )}
                rippleInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
                dropdownPosition={1}
                itemColor='rgba(0, 0, 0, .87)'
                pickerStyle={{
                  width: 200,
                  left: null,
                  right: 0,
                  marginRight: 8,
                  marginTop: 28
                }}
              />
*/

import React from 'react';

import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import RNPopoverMenu from 'react-native-popover-menu';
import Icon from 'react-native-vector-icons'
import ChatRoom from './Chat/ChatRoomRedux';

import {
  Title,
  HeaderBackground2,
  Header,
  Left,
  Right,
  ActionTopButton
} from '../components/common';
import { TitleChat } from '../components/Chat';
import OlimpIcon from '../styles/Icons';
import { loggedIn } from '../actions';
import 'moment/locale/ru';
const data = [
  { value: 'Отключить уведомления' },
  { value: 'Все кланы' },
  { value: 'Выйти из клана' }
];

let menus = [
  {
    label: "Чат",
    menus: [
      { label: "Отключить уведомления" },
      { label: "Все группы" },
      { label: "Выйти из группы" }
    ]
  },
]
class Friends extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    this.props.loggedIn();
  }
  onMore() {
    RNPopoverMenu.Show(this.ref, {
  title: "",
  menus: menus,
  onDone: selection => { },
  onCancel: () => { }
});
  }
  render() {
    if (!this.props.isLoggedIn) {
      return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{marginBottom: 15, fontFamily: 'LatoRegular'}}>Чат доступен зарегистрированным пользователям</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AuthScreen')}>
              <View style={{padding: 10, backgroundColor: '#0c3d84'}}>
                <Text style={{color:'#FFF'}}>Войти или зарегистрироваться</Text>
              </View>
            </TouchableOpacity>
          </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <HeaderBackground2>
          <Header>
            <Left>
              <ActionTopButton
                onPress={() => this.props.navigation.openDrawer()}
                pressIcon='o-menu'
              />
            </Left>
            <TitleChat
              coverRoom={require('../../assets/images/1.jpg')}
              text='Как достигать больших целей'
              onPress={() => alert('Boom')}
              usersOnline='8 участника(ов)'
              usersCount='3 в сети'
            />
            <Right>
                <TouchableOpacity
                  delayLongPress={3800}
                  ref={ref => this.ref = ref}
                  onPress={() => this.onMore()}
              >
                  <OlimpIcon name='o_more_vert' style={styles.dropdownBtn} />
              </TouchableOpacity>
            </Right>
          </Header>
        </HeaderBackground2>
        <ChatRoom 
          userId={this.props.user.email}
        />
      </View>
    );
  }
}

const styles = {
  dropdownBtn: {
    padding: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    color: '#FFF'
  }
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps, {
  loggedIn
})(Friends);
