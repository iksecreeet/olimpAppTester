import { ChatManager, TokenProvider } from '@pusher/chatkit-client/react-native';
import {
  ADD_MESSAGE,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAILURE,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES,
  LOAD_MESSAGES_FAILURE,
  LOAD_EARLIER,
  LOAD_EARLIER_MESSAGES_FAILURE,
  LOAD_EARLIER_MESSAGES_SUCCESS,
  RECEIVE_MESSAGE,
  USER_JOINED,
  USER_LEFT,
  TYPING,
  STOP_TYPING,
  MESSAGE_TEXT,
  CONNECT,
  DISCONNECT,
  CONNECTION_REQUEST,
  LOAD_CHANNELS,
  LOAD_CHANNELS_SUCCESS,
  LOAD_CHANNELS_FAILURE,
  RESET_STORE
} from './types';

const CHATKIT_INSTANCE_LOCATOR = 'v1:us1:3d2ff32d-fa02-4961-9233-13d072068430';
const TOKEN_PROVIDER_URL = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/3d2ff32d-fa02-4961-9233-13d072068430/token'
const chatManager = userId =>
  new ChatManager({
    instanceLocator: CHATKIT_INSTANCE_LOCATOR,
    userId: userId,
    tokenProvider: new TokenProvider({
      url: TOKEN_PROVIDER_URL,
    }),
  });

export const messageChanged = (text) => {
  return {
    type: MESSAGE_TEXT,
    payload: text
  };
};
export const receiveMessage = (messageData) => {
  return dispatch => {
      dispatch({ 
        type: RECEIVE_MESSAGE, 
        payload: messageData 
      });
    };
  };

export const addMessage = (message, { roomId, user }) => {
  return dispatch => {
      dispatch({ type: ADD_MESSAGE });
      user.sendMessage({
          text: message.text,
          roomId,
        })
        .then((data) => {
          console.log(`Added message to ${roomId}`);
          dispatch({ 
            type: ADD_MESSAGE_SUCCESS, 
            payload: {
              _id: data,  
              text: message.text, 
              user: { _id: user.id, name: user.name },
              sent: true,
              createdAt: new Date() 
            } 
          });
        })
        .catch(err => {
          console.log(`Error adding message to ${roomId}: ${err}`);
          dispatch({ type: ADD_MESSAGE_FAILURE });
        });
    };
};
export const addMessageImage = (data, { roomId, user }) => {
  return dispatch => {
      dispatch({ type: ADD_MESSAGE });
      user.sendMessage({
          text: ' ', // cannot be empty string or null
          roomId,
          attachment: {
            file: {
              uri: data.path,
              type: 'image/jpeg',
              name: 'image.jpg',
            },
            name: 'myfile.jpg',
          }
        })
        .then((id) => {
          console.log(`Added message to ${roomId}`);
          console.log(data);
          dispatch({ 
            type: ADD_MESSAGE_SUCCESS, 
            payload: {
              _id: id,  
              text: data.text, 
              user: { 
                _id: user.id, 
                name: user.name
              },
              image: data.path,
              //room: roomId, 
              createdAt: new Date() 
            } 
          });
        })
        .catch(err => {
          console.log(`Error adding message to ${roomId}: ${err}`);
          dispatch({ type: ADD_MESSAGE_FAILURE });
        });
    };
};
export const loadMessages = ({ roomId, user }) => {
      return dispatch => {
      dispatch({ type: LOAD_MESSAGES });
      user
        .fetchMessages({
          roomId: roomId,
          direction: 'older',
          limit: 20,
        })
        .then(messages => {
          //dispatch({ 
            //type: LOAD_MESSAGES_SUCCESS, 
            //payload: messages 
          //});
          loadedMessages(dispatch, messages, user);
        })
        .catch(err => {
          console.log(`Error fetching messages: ${err}`);
          dispatch({ type: LOAD_MESSAGES_FAILURE });
        });
    };
  };
export const loadPreviousMessages = ({ id, roomId, user }) => {
      return dispatch => {
      dispatch({ type: LOAD_EARLIER });
      user
        .fetchMessages({
          roomId: roomId,
          initialId: id,
          direction: 'older',
          limit: 20,
        })
        .then(messages => {
          //dispatch({ 
           // type: LOAD_EARLIER_MESSAGES_SUCCESS, 
            //payload: messages 
          //});
          console.log(messages);
          loadedEarlierMessages(dispatch, messages, user);
        })
        .catch(err => {
          console.log(`Error fetching messages: ${err}`);
          dispatch({ type: LOAD_EARLIER_MESSAGES_FAILURE });
        });
    };
  };
  export const userJoined = (user) => {
    return dispatch => {
      dispatch({ type: USER_JOINED, payload: user });
    };
  };

  export const userLeft = (user) => {
    return dispatch => {
      dispatch({ type: USER_LEFT, payload: user });
    };
  };

  export const userStartedTyping = (user) => {
    return dispatch => {
      dispatch({ type: TYPING, payload: user });
    };
  };

  export const userStoppedTyping = (user) => {
    return dispatch => {
      dispatch({ type: STOP_TYPING, payload: user });
    };
  };
  export const loadChannels = (user) => {
    return dispatch => {
      dispatch({ type: LOAD_CHANNELS });
      user.getJoinableRooms()
        .then(rooms => {
          console.log('Load rooms list');
          dispatch({ type: LOAD_CHANNELS_SUCCESS, payload: rooms });
        })
        .catch(err => {
          console.log(`Error getting join-able rooms: ${err}`);
          dispatch({ type: LOAD_CHANNELS_FAILURE });
        });
    };
  };
  export const connectToChat = (userId) => {
  return dispatch => {
      dispatch({ type: CONNECTION_REQUEST });
      chatManager(userId)
        .connect()
        .then(currentUser => {
          console.log(`Successful connection ${currentUser}`);
          dispatch({ type: CONNECT, payload: currentUser });
        })
        .catch(err => {
          console.error(`Error on connection ${err}`);
          dispatch({ type: DISCONNECT });
        });
    };
};

export const disconnectFromChat = (dispatch) => {
    dispatch({ type: DISCONNECT });
};

const loadedMessages = (dispatch, messages) => {
  const oldMessages = [];
  let currentMessages = [];
  messages.forEach(msg => {
    if (msg.attachment) {
      oldMessages.push({
        _id: msg.id.toString(),
        key: msg.id,
        user: {
          _id: msg.sender.id,
          name: msg.sender.name
          //avatar:
          //  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA'
        },
        createdAt: new Date(msg.createdAt),
        image: msg.attachment.link,
        received: true,
      });
    }
    if (!msg.attachment) {
      oldMessages.push({
        _id: msg.id.toString(),
        key: msg.id,
        user: {
          _id: msg.sender.id,
          name: msg.sender.name
          //avatar:
          //  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA'
        },
        text: msg.text,
        createdAt: new Date(msg.createdAt),
        avatar: msg.avatar,
        received: true,
        system: msg.sender.id === 'Olimp' ? 1 : 0
      });
    }
});
    currentMessages = oldMessages.reverse();
    dispatch({
      type: LOAD_MESSAGES_SUCCESS,
      payload: currentMessages
    });
};

const loadedEarlierMessages = (dispatch, messages) => {
  const olderMessages = [];
  messages.forEach(msg => {
    if (msg.attachment) {
      olderMessages.push({
        _id: msg.id.toString(),
        key: msg.id,
        user: {
          _id: msg.sender.id,
          name: msg.sender.name
          //avatar:
          //  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA'
        },
        createdAt: new Date(msg.createdAt),
        image: msg.attachment.link,
        received: true,
      });
    }
    if (!msg.attachment) {
      olderMessages.push({
        _id: msg.id.toString(),
        key: msg.id,
        user: {
          _id: msg.sender.id,
          name: msg.sender.name
          //avatar:
          //  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA'
        },
        text: msg.text,
        createdAt: new Date(msg.createdAt),
        avatar: msg.avatar,
        received: true,
        system: msg.sender.id === 'Olimp' ? 1 : 0
      });
    }
});
    dispatch({
      type: LOAD_EARLIER_MESSAGES_SUCCESS,
      payload: olderMessages
    });
};

export const resetStoreMessage = () => {
    return dispatch => {
      dispatch({ type: RESET_STORE });
    };
  };
