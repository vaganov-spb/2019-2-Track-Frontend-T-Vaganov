import {
	LOAD_CHATS_ERROR,
	LOAD_CHATS_SUCCESS,
} from '../constants/ActionTypes';

const initialState = {
	chats: {},
	error: null,
	isLoaded: false,
};

export const chats = (state = initialState, action) => {
	switch(action.type){
		case LOAD_CHATS_SUCCESS:
			return {
				...state,
				chats: action.payload,
				isLoaded: true,
			};
		case LOAD_CHATS_ERROR:
			return {
				...state,
				error: action.payload.error,
			};
		default:
			return state;
	}
};