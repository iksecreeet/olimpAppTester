import React from 'react';
import { View, Text, Image, TouchableOpacity, Share, FlatList, Dimensions, ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { MenuItem } from './common';
import { loggedIn } from '../actions';
import SideBarData from '../data/SideBarData.json';
import SideBarDataSetting from '../data/SideBarDataSetting.json';
import styles from '../styles/SideBarStyles';

class SideBar extends React.Component {
	constructor() {
    super();
    this.state = {
		user: '',
		photoURL: '',
		loading: true,
		authenticated: false,
    };
  }
	componentWillMount() {
		this.props.loggedIn();
	}
  checkOpenDrawer() {
  	if (this.props.navigation.state.isDrawerOpen) {
  		return (
			<StatusBar 
				barStyle='light-content'
				translucent
				backgroundColor="rgba(0, 0, 0, 0.20)"
				animated
			/>
  		)
  	}
  }
	keyExtractor = item => item.name;
	renderName() {
		if (this.props.isLoggedIn) {
			return (
				<View>
				<TouchableOpacity 
					onPress={() => this.props.navigation.navigate('Profile')}
					style={styles.avatarBody}
					>
					{this.props.user.photoURL ? (
					<Image
							source={{ uri: this.props.user.photoURL }}
							style={styles.avatarImg}
					/>
					) : <Image
							source={require('../../assets/images/man.png')}
							style={styles.avatarImg}
						/>}
						
				</TouchableOpacity>
					<TouchableOpacity
						style={styles.NameText}
						onPress={() => this.props.navigation.navigate('Profile')}
					>
						<Text style={{ fontFamily: 'LatoBold', color: '#FFF' }}>
							{this.props.user.displayName ? (this.props.user.displayName) : this.props.user.email}
						</Text>
					</TouchableOpacity>
					<Text style={styles.StatusText}>Новичок</Text>
				</View>
			);
		}
		if (!this.state.authenticated) {
			return (
				<View>
				<TouchableOpacity 
					onPress={() => this.props.navigation.navigate('Auth')}
					style={styles.avatarBody}
					>
						<Image
							source={require('../../assets/images/man.png')}
							style={styles.avatarImg}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.NameText}
						onPress={() => this.props.navigation.navigate('Auth')}
					>
						<Text style={{ fontFamily: 'LatoBold', color: '#FFF' }}>
							Войти
						</Text>
					</TouchableOpacity>
					<Text style={styles.StatusText}>Гость</Text>
				</View>
			);
		}		
	}
	onShare() {
	  Share.share({
	    message: 'Покори олимп!',
	    url: 'http://liga-app.ru',
	    title: 'Класс!!'
	  }, {
	    // Android only:
	    dialogTitle: 'ПОДЕЛИТЕСЬ ПРИЛОЖЕНИЕМ',
	    // iOS only:
	    excludedActivityTypes: [
	      'com.apple.UIKit.activity.PostToTwitter'
	    ]
	  });
	}
	render() {
		const {
			sidebarBody,
			sideBarTop,
			avatarBody,
			avatarImg,
			StatusText,
			NameText,
			ListData,
			ListDataBottom
		} = styles;
		const win = {
			height: Dimensions.get('window').height,
			width: Dimensions.get('window').width
		};
		const height = Dimensions.get('window').height;
		const width = Dimensions.get('window').width;
		return (
			<ScrollView 
			style={[sidebarBody, 
				{ 
					flex: 1, 
					zIndex: 1000, 
					width: Math.min(height, width) * 0.85 
				}]}
			>
				<View style={sideBarTop}>
					{this.renderName()}
				</View>
				<FlatList
					style={ListData}
					data={SideBarData}
					renderItem={({ item }) => (
						<MenuItem
							name={item.icon}
							onPress={() =>
								this.props.navigation.navigate(item.route, { 
									user: this.props.user
								})
							}
							text={item.name.toUpperCase()}
						>
							}
						</MenuItem>
					)}
					keyExtractor={this.keyExtractor}
				/>
				<View style={ListDataBottom}>
					<MenuItem
						name="o-share"
						onPress={this.onShare.bind(this)}
						text={'Поделиться'.toUpperCase()}
					/>
					<MenuItem
						name="o-rules"
						onPress={() =>
								this.props.navigation.navigate('Rules')
							}
						text={'Правила игры'.toUpperCase()}
					/>
					<MenuItem
						name="o-settings"
						onPress={() =>
								this.props.navigation.navigate('Settings')
							}
						text={'Настройки'.toUpperCase()}
					/>
					<MenuItem
						name="o_mail"
						onPress={() =>
								this.props.navigation.navigate('Ideas')
							}
						text={'Идея или проблема'.toUpperCase()}
					/>
				</View>
			</ScrollView>
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
})(SideBar);

