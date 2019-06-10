import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import {
  ADD_MESSAGE,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAILURE,
  CHANGE_CHANNEL,
  CHANGE_CHANNEL_SUCCESS,
  CHANGE_CHANNEL_FAILURE,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES,
  LOAD_MESSAGES_FAILURE,
  LOAD_CHANNELS,
  LOAD_CHANNELS_SUCCESS,
  LOAD_CHANNELS_FAILURE,
  CREATE_CHANNEL,
  CREATE_CHANNEL_SUCCESS,
  CREATE_CHANNEL_FAILURE,
  RECEIVE_MESSAGE,
  USER_JOINED,
  USER_LEFT,
  TYPING,
  STOP_TYPING,
  RESET_STORE,
  CONNECT,
  DISCONNECT,
  CONNECTION_REQUEST
} from '../../types';

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

export default {
  receiveMessage: messageData => {
    return dispatch => {
      dispatch({ type: RECEIVE_MESSAGE, payload: messageData });
    };
  },
  addMessage: (message, { roomId, user }) => {
    return dispatch => {
      dispatch({ type: ADD_MESSAGE });
      user.sendMessage({
          text: message,
          roomId,
        })
        .then(() => {
          console.log(`Added message to ${roomId}`);
          dispatch({ type: ADD_MESSAGE_SUCCESS, payload: { text: message, senderId: user.id, createdAt: new Date() } });
        })
        .catch(err => {
          console.log(`Error adding message to ${roomId}: ${err}`);
          dispatch({ type: ADD_MESSAGE_FAILURE });
        });
    };
  },
  loadMessages: (roomId, { user }) => {
    return dispatch => {
      dispatch({ type: LOAD_MESSAGES });
      user
        .fetchMessages({
          roomId: roomId,
          direction: 'older',
          limit: 100,
        })
        .then(messages => {
          dispatch({ type: LOAD_MESSAGES_SUCCESS, payload: messages });
        })
        .catch(err => {
          console.log(`Error fetching messages: ${err}`);
          dispatch({ type: LOAD_MESSAGES_FAILURE });
        });
    };
  },
  createChannel: (channelName, { user }) => {
    return dispatch => {
      dispatch({ type: CREATE_CHANNEL });
      user
        .createRoom({
          name: channelName,
          private: false,
          addUserIds: [],
        })
        .then(room => {
          console.log(`Created room called ${room.name}`);
          dispatch({ type: CREATE_CHANNEL_SUCCESS, payload: room });
        })
        .catch(err => {
          console.log(`Error creating room ${err}`);
          dispatch({ type: CREATE_CHANNEL_FAILURE });
        });
    };
  },
  changeChannel: (newRoom, { user }) => {
    return dispatch => {
      dispatch({ type: CHANGE_CHANNEL });
      user.joinRoom({
          roomId: +newRoom,
        })
        .then(room => {
          console.log(`Joined room with ID: ${newRoom}`);
          dispatch({ type: CHANGE_CHANNEL_SUCCESS, payload: room });
        })
        .catch(err => {
          console.log(`Error joining room ${newRoom}: ${err}`);
          dispatch({ type: CHANGE_CHANNEL_FAILURE });
        });
    };
  },
  loadChannels: ({ user }) => {
    return dispatch => {
      dispatch({ type: LOAD_CHANNELS });

      user
        .getJoinableRooms()
        .then(rooms => {
          console.log('Load rooms list');
          dispatch({ type: LOAD_CHANNELS_SUCCESS, payload: rooms });
        })
        .catch(err => {
          console.log(`Error getting join-able rooms: ${err}`);
          dispatch({ type: LOAD_CHANNELS_FAILURE });
        });
    };
  },
  userJoined: user => {
    return dispatch => {
      dispatch({ type: USER_JOINED, payload: user });
    };
  },
  userLeft: user => {
    return dispatch => {
      dispatch({ type: USER_LEFT, payload: user });
    };
  },
  userStartedTyping: user => {
    return dispatch => {
      dispatch({ type: TYPING, payload: user });
    };
  },
  userStoppedTyping: user => {
    return dispatch => {
      dispatch({ type: STOP_TYPING, payload: user });
    };
  }, 
  resetStoreMessage: () => {
    return dispatch => {
      dispatch({ type: RESET_STORE });
    };
  },
   connect: userId => {
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
  },
  disconnect: dispatch => {
    dispatch({ type: DISCONNECT });
  },
};
