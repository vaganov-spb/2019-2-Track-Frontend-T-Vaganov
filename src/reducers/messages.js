import {
	LOAD_MESSAGES_SUCCESS,
	LOAD_MESSAGES_ERROR,
} from '../constants/ActionTypes';

const initialState = {
	messages: {},
	errors: {},
	isLoaded: false,
};

export const messages = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_MESSAGES_SUCCESS:
			return {
				messages: {
					...state.messages,
					[action.chat]: [...state.messages[action.chat] || [], ...action.payload],
				},
				errors: {
					...state.errors,
					[action.chat]: null,
				},
				isLoaded: true,
			};
		case LOAD_MESSAGES_ERROR:
			return {
				messages: {
					...state.messages,
				},
				errors: {
					...state.errors,
					[action.chat] : action.payload.error,
				}
			};
		default:
			return state;
	}
};
