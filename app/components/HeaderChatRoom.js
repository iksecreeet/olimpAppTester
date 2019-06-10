import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { HeaderBackButton } from 'react-navigation';
import RNPopoverMenu from 'react-native-popover-menu';
import { StatusBar, View, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import OlimpIcon from '../styles/Icons';
import { ActionTopButton, Left, Right } from '../components/common';
import { TitleChat } from '../components/Chat';

const popoverMenu = [
  {
    label: 'Чат',
    menus: [
      { label: 'Отключить уведомления' },
      { label: 'Все группы' },
      { label: 'Выйти из группы' }
    ]
  },
];


export default class HeaderChatRoom extends Component {
	onMore() {
		RNPopoverMenu.Show(this.ref, {
			title: '',
			menus: popoverMenu,
			onDone: selection => { },
			onCancel: () => { }
		});
	}
	render() {
		const { title } = this.props;
		const { goBack, navigate } = this.props.navigation;
		return (
			<View>
				<View style={styles.statusBar}>
					<StatusBar animated translucent backgroundColor='#133a72' />
				</View>
				<View style={styles.headerBody}>
					<Left>

				          <HeaderBackButton tintColor={'white'} onPress={() => navigate('CommonScene')}/>                
			
					</Left>
					<TitleChat
						coverRoom={require('../../assets/images/1.jpg')}
						text={title}
						onPress={() => alert('Boom')}
						usersOnline='8 участника(ов)'
						usersCount='3 в сети'
					/>
					<Right>
						<TouchableOpacity
							delayLongPress={2400}
							ref={ref => (this.ref = ref)}
							onPress={() => this.onMore()}
						>
							<OlimpIcon
								name='o_more_vert'
								style={styles.dropdownBtn}
							/>
						</TouchableOpacity>
					</Right>
				</View>
			</View>
		);
	}
}

const styles = {
	headerBody: {
		backgroundColor: '#17478d',
		height: Platform.OS === 'ios' ? 64 : 56,
		//marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
		//paddingLeft: 16,
		paddingRight: 16,
		flexDirection: 'row',
		alignItems: 'center'
		//elevation: 4
	},
	statusBar: {
		height: StatusBar.currentHeight,
		backgroundColor: '#133a72'
	},
	rows: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-end'
	},
	topIconText: {
		color: '#FFF',
		fontSize: 16,
		fontFamily: 'LatoSemibold'
	},
	topIcon: {
		color: '#FFF',
		fontSize: 20,
		paddingLeft: 8
	},
	dropdownBtn: {
		padding: 5,
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 14,
		color: '#FFF'
	}
};

HeaderChatRoom.propTypes = {
	title: PropTypes.string
};
