import {
	USER_INFO_ERROR,
	USER_INFO_SUCCESS,
} from '../constants/ActionTypes';

const initialState = {
	info: {},
	isLoaded: false,
	error: null,
};

export const UserInfo = (state = initialState, action) => {
	switch(action.type) {
		case USER_INFO_SUCCESS:
			return {
				...state,
				isLoaded: true,
				info: {
					...state.info,
					...action.payload,
				},
			};
		case USER_INFO_ERROR:
			return {
				...state,
				error: action.payload.error,
			};
		default:
			return state;
	}
};