import React from 'react';

import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { loggedIn, connectToChat, loadChannels } from '../../actions';

import ListGroupItem from '../../components/Chat/ListGroupItem';

class GroupList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}
	_renderItem = ({ item }) => (
		<ListGroupItem
			onPressItem={() =>
				this.props.navigation.navigate('UserScene', {
					user: this.props.chatuser,
					roomId: item.id,
					title: item.name
				})
			}
			title={item.name}
		/>
	);
	componentDidMount() {
		this.props.loggedIn();
		if (this.props.user) {
			this.props.connectToChat(this.props.user.email);	
		}		
	}
	componentDidUpdate(oldProps) {
	  const newProps = this.props;
	  if(oldProps.chatuser !== newProps.chatuser) {
	    	this.props.loadChannels(newProps.chatuser);
	  }
	}
	_keyExtractor = (item, index) => item.name;
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
		if (!this.props.chatuser) {
			return (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<ActivityIndicator />
				</View>
			);
		}
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: '#FFF'
				}}
			>
				<Text style={{marginHorizontal: 16, marginTop: 10, color: '#2b9da7'}}>Доступные группы</Text>
				<FlatList
					style={{ paddingVertical: 5 }}
					data={this.props.chatuser.rooms }
					renderItem={this._renderItem}
					keyExtractor={this._keyExtractor}
				/>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
		isLoggedIn: state.auth.isLoggedIn,
		chatuser: state.chat.chatuser,
		channelsList: state.chat.channelsList
	};
};

export default connect(mapStateToProps, {
	loggedIn,
	connectToChat,
	loadChannels
})(GroupList);
