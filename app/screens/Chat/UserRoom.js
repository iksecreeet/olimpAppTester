import React from 'react';

import { 
	View, 
	Text, 
	ActivityIndicator, 
	TouchableOpacity 
} from 'react-native';
import { connect } from 'react-redux';
import { 
	GiftedChat, 
	Bubble,
	InputToolbar,
	Send 
} from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import EmojiView from 'react-native-emoji-view';
//import EmojiPanel from 'react-native-emoji-panel';
import { 
	connectToChat, 
	receiveMessage,
	addMessage,
	addMessageImage, 
	messageChanged,
	loadMessages,
	resetStoreMessage,
	loadPreviousMessages
	} from '../../actions';
import MessageReply from './MessageReply';
import BubbleView from '../../components/Chat/Bubble';
import HeaderChatRoom from '../../components/HeaderChatRoom';

class UserRoom extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		header: props => 
				<HeaderChatRoom 
					{...props} 
					title={navigation.state.params.title}
				/>
    });
	constructor(props) {
		super(props);
		this.state = {
			showEmoji: false,
			inputText: '',
			imageSource: null,
			scrollToBottom: false,
			current_text: null,
			current_user: null	
		};
		//this.onLongPress = this.onLongPress.bind(this);
		this.renderFooter = this.renderFooter.bind(this);
		this.onEndReachedCalledDuringMomentum = true;
		this.handlePick = this.handlePick.bind(this);
		this.addImage = this.addImage.bind(this);
		this.showEmojiPanel = this.showEmojiPanel.bind(this);
		this.renderImageButton = this.renderImageButton.bind(this);
		this.renderEmojiButton = this.renderEmojiButton.bind(this);
	}
	componentDidMount() {
		const { navigation } = this.props;
		const userID = navigation.getParam('user');
		const roomNum = navigation.getParam('roomId');
		if (!userID.roomSubscriptions[roomNum]) {
			const subsribe = userID.subscribeToRoom({
					roomId: roomNum,
					hooks: {
						onMessage: this.onReceive.bind(this)
					},
					messageLimit: 0,
				});
			if (subsribe) {
				this.props.loadMessages({ user: userID, roomId: roomNum });
			}
		}
			//this.props.loadMessages({ user: userID, roomId: roomNum });
	}
	onReceive(messageData) {
		const { navigation } = this.props;
		const userID = navigation.getParam('user');
		const roomNum = navigation.getParam('roomId');
		const { id, senderId, text, createdAt } = messageData;
		if (senderId !== userID.id) {
			this.props.receiveMessage({
				_id: id,
				text: text,
				//isLoadingEarlier: true,
				createdAt: new Date(createdAt),
				received: true,
				user: {
					_id: senderId,
					name: senderId
					//avatar:
					//  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA'
				},
			});
			const notification = new firebase.notifications.Notification()
			.setNotificationId('1')
			.setTitle('Как достигать больших целей')
			.setBody(senderId + ' ' + text)
			.setSound('default')
			.android.setGroup('groupNotificationId')
			.android.setGroupSummary(true)
			.android.setTag('1')
			.android.setGroupAlertBehaviour(firebase.notifications.Android.GroupAlert.Children)
			.android.setChannelId('channelId')
			.android.setSmallIcon('ic_launcher');
			firebase.notifications().displayNotification(notification);
		}
	}

	onSend([message]) {
		/*if (this.state.current_text && this.state.current_user) {
			this.props.addMessage(message, this.getSessionDataReply(this.props));
		}*/
		this.props.addMessage(message, this.getSessionData(this.props));
	}
	onMessageChanged(text) {
		this.props.messageChanged(text);
	}
	getSessionData() {
		const { navigation } = this.props;
		const userID = navigation.getParam('user');
		const roomNum = navigation.getParam('roomId');
		return { user: userID, roomId: roomNum };
	}
	/*getSessionDataReply() {
		const { navigation } = this.props;
		const userID = navigation.getParam('user');
		const roomNum = navigation.getParam('roomId');
		return { user: userID, roomId: roomNum, reply: true };
	}*/
	renderFooter() {
		if (this.state.current_text && this.state.current_user) {
		//this.refs.TotalInputField.focus();
			 return (
        <View style={{ height: 50, flexDirection: 'row', backgroundColor: '#FFF' }}>
        <View style={{ height:50, width: 5, backgroundColor: 'red' }}></View>
        <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'red', paddingLeft: 10, paddingTop: 5 }}>{this.state.current_user}</Text>
            <Text style={{ color: 'gray', paddingLeft: 10, paddingTop: 5 }}>{this.state.current_text}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10 }}>
            <TouchableOpacity onPress={() => this.setState({current_user: null, current_text: null})}>
                <Icon name='times' type='feather' color='#000' />
            </TouchableOpacity>
        </View>
      </View>
      );	
		}
     
  }
	renderName(props) {
		if (
			!props.isSameUser(props.currentMessage, props.previousMessage) && props.position === 'left'
		) {
			return (
				<Text style={styles.userBubble}>
					{props.currentMessage.user.name}
				</Text>
			);
		}
	}
	setCustomText(text) {
		this.setState({
			inputText: text,
			showAddImage: false
		});
	}

	loadEarlierMessages = () => {
		const { navigation } = this.props;
		const userID = navigation.getParam('user');
		const roomNum = navigation.getParam('roomId');

		//const olderMessages = this.props.messages;
		if (this._giftedChatRef.getMessages().length > 0 ) {
			const initialId = Math.min(...this.props.messages.map(m => m._id));
		const id = Number(initialId);
		if (this.props.loadEarlierMessagesStarted === false) {
			this.props.loadPreviousMessages({
				id, user: userID, roomId: roomNum
			});
		const widthMessages = this._giftedChatRef.getMessages().length;
		if (widthMessages >= 60) {
			this.setState({
				scrollToBottom: true
			});
		}	
		}
	}
}
	customBubble(props) {
		if (
			!props.isSameUser(props.currentMessage) && props.position === 'left'
		) {
			return (
				<View style={{ position: 'absolute', left: -8, bottom: 0, width: 9, height: 14 }}>
					<BubbleView />
				</View>
			);
		}
	}
	renderEarlierBtn = () => {
			if (this.props.loadEarlierMessagesStarted) {
			return (
				<View style={{ marginTop: 25 }}>
					<ActivityIndicator color='#3DAE58' size='large' />
				</View>
			);
		}
	}
	renderBubble(props) {
		if (
			props.isSameUser(props.currentMessage, props.previousMessage) &&
			props.isSameDay(props.currentMessage, props.previousMessage)
		) {
			return (
				<Bubble
					{...props}
					wrapperStyle={{
						left: {
							backgroundColor: '#FFF',
							marginVertical: 5,
							elevation: 4,
							borderTopLeftRadius: 6,
							borderBottomRightRadius: 6,
							borderTopRightRadius: 6,
							borderBottomLeftRadius: 0
						},
						right: {
							backgroundColor: '#3DAE58',
							marginVertical: 5,
							elevation: 4,
							borderTopRightRadius: 6,
							borderBottomLeftRadius: 6,
							borderTopLeftRadius: 6,
							borderBottomRightRadius: 0
						}
					}}
					textStyle={{
						right: {
							color: 'white',
						},
						left: {
							color: 'black',
						}
					}}
				/>
			);
		}
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					left: {
						backgroundColor: '#FFF',
						marginVertical: 5,
						elevation: 4,
						borderTopLeftRadius: 6,
						borderBottomRightRadius: 6,
						borderTopRightRadius: 6,
						borderBottomLeftRadius: 0
					},
					right: {
						backgroundColor: '#3DAE58',
						marginVertical: 5,
						elevation: 4,
						borderTopRightRadius: 6,
						borderBottomLeftRadius: 6,
						borderTopLeftRadius: 6,
						borderBottomRightRadius: 0
					}
				}}
				textStyle={{
					right: {
						color: 'white',
					},
					left: {
						color: 'black',
					}
				}}
			/>
		);
	}
	//Render send button
	renderSend(props) {
		return (
			<Send {...props}>
				<View
					style={{
						backgroundColor: 'transparent',
						marginBottom: 10,
						marginLeft: 16,
						marginRight: 16
					}}
				>
						<Icon name='telegram-plane' size={22} color='#646464' />
				</View>
			</Send>
		);
	}
	//Add image to room
	addImage() {
		ImagePicker.openPicker({
			width: 500,
			height: 500,
			cropping: false,
			compressImageMaxWidth: 450
		})
		.then(data => {
			if (data) {
				this.props.addMessageImage(data, this.getSessionData(this.props));		
			}
		});
	}
	//Show emoji panel
	showEmojiPanel() {
		this.setState({
			showEmoji: true
		});
	}
	// User typing View
/*	renderFooter() {
		return (
			<View style={styles.footerContainer}>
				<Text style={styles.footerText}>User typing....</Text>
			</View>
		);
	}
	*/
	renderImageButton() {
		if (this.state.inputText.trim().length === 0) {
			return (
					<TouchableOpacity
					onPress={this.addImage}
					style={{
							justifyContent: 'center',
							backgroundColor: 'transparent',
							marginLeft: 16,
							marginRight: 16
						}}
					>
						<Icon name='file-image' size={21} color='#646464' />
					</TouchableOpacity>
			);
		}		
	}
	renderEmojiButton() {
		return (
			<TouchableOpacity
			onPress={this.showEmojiPanel}
			style={{
				justifyContent: 'center',
				backgroundColor: 'transparent',
				marginLeft: 16,
				marginRight: 16
			}}
			>
			<Icon name={this.state.showEmoji ? 'keyboard' : 'grin-alt'} size={21} color='#646464' />
			</TouchableOpacity>
		);
	}
	renderInputToolbar(props) {
     //Add the extra styles via containerStyle
    	return (
    			<InputToolbar {...props} />
    		);
  	}
  	handlePick(emoji) {
    //const { inputText } = this.state;
    //console.warn(emoji);
    this.setState({ inputText: this.state.inputText + emoji });
  }

	render() {
		const { navigation } = this.props;
		const userID = navigation.getParam('user');
		return (
			<View style={{flex:1}}>
			<GiftedChat
				text={this.state.inputText}
				onInputTextChanged={text => this.setCustomText(text)}
				renderInputToolbar={this.renderInputToolbar}
				messages={this.props.messages}
				placeholder='Ваше сообщение'
				locale={'ru'}
				loadEarlier={this.props.loadEarlierMessagesStarted}
				isLoadingEarlier={this.props.loadEarlierMessagesStarted}
				renderBubble={this.renderBubble}
				renderLoadEarlier={this.renderEarlierBtn}
				renderSend={this.renderSend}
				renderImageButton={this.renderImageButton}
				renderEmojiButton={this.renderEmojiButton}
				ref={c => (this._giftedChatRef = c)}
				renderFooter={this.renderFooter}
				renderCustomView={this.renderName}
				renderCustomBubble={this.customBubble}
				onLongPress={(ctx, currentMessage) => {
					this.setState({
						current_user: currentMessage.user.name,
						current_text: currentMessage.text
					});
				}} 
				customTextStyle={{
					fontSize: 16,
					fontFamily: 'LatoRegular'
				}}
				listViewProps={{
						onEndReached: this.loadEarlierMessages,
						onRefresh: this.loadEarlierMessages,
						onEndThreshold: 0.9,
						//refreshing: this.props.loadEarlierMessagesStarted,
				}}
				onSend={message => this.onSend(message)}
				user={{
					_id: userID.id,
					name: userID.userName
				}}
			/>
				<EmojiView visible={this.state.showEmoji} onSelect={this.handlePick} />
			</View>
		);
	}
}
const styles = {
	userBubble: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		color: '#3999CF',
		fontSize: 12,
		fontFamily: 'LatoRegular'
	},
	footerContainer: {
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10
	},
	footerText: {
		fontSize: 14,
		color: '#aaa'
	}
};


const mapStateToProps = state => {
	const { 
		chatuser, 
		messages, 
		message, 
		loadEarlierMessagesStarted,
		addMessageStarted,
		} = state.chat;
	return { 
		chatuser, 
		messages, 
		message,
		loadEarlierMessagesStarted,
		addMessageStarted
		};
};

export default connect(mapStateToProps, {
  connectToChat, 
  receiveMessage, 
  addMessage,
  addMessageImage, 
  messageChanged,
  loadMessages,
  resetStoreMessage,
  loadPreviousMessages
})(UserRoom);
