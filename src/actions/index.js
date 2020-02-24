import {
	LOAD_MESSAGES_SUCCESS,
	LOAD_MESSAGES_ERROR,
	LOAD_CHATS_SUCCESS,
	LOAD_CHATS_ERROR,
	USER_INFO_SUCCESS,
	USER_INFO_ERROR,
	CHANGE_INPUT_VAL,
	CLEAR_INPUT_VAL
} from '../constants/ActionTypes';

export const getMessagesSuccess = (messageList, chatID) => ({
	type: LOAD_MESSAGES_SUCCESS,
	payload: messageList,
	chat: chatID
});

export const getMessagesError = (error, chatID) => ({
	type: LOAD_MESSAGES_ERROR,
	payload: {
		error
	},
	chat: chatID
});

export const getChatsSuccess = (chatsObj)  => ({
	type: LOAD_CHATS_SUCCESS,
	payload: chatsObj,
});

export const getChatsError = (error)  => ({
	type: LOAD_CHATS_ERROR,
	payload: {
		error
	},
});

export const userInfoSuccess = (infoObj) => ({
	type: USER_INFO_SUCCESS,
	payload: infoObj,
});

export const userInfoError = (error) => ({
	type: USER_INFO_ERROR,
	payload: {
		error
	},
});

export const changeMessageInputValue = (text, chatID) => ({
	type: CHANGE_INPUT_VAL,
	chat: chatID,
	payload: text,
});

export const clearMessageInputValue = (chatID) => ({
	type: CLEAR_INPUT_VAL,
	chat: chatID,
});


