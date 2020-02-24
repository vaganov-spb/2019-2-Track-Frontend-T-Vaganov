import {
	CHANGE_INPUT_VAL,
	CLEAR_INPUT_VAL,
} from '../constants/ActionTypes';

const initialState = {};

export const inputValue = (state = initialState, action) => {
	switch(action.type){
		case CHANGE_INPUT_VAL:
			return {
				...state,
				[action.chat]: {
					text: action.payload,
					flag: true,
				},  
			};
		case CLEAR_INPUT_VAL:
			return {
				...state,
				[action.chat]: {
					text: '',
					flag: false,
				},  
			};
		default:
			return state;
	}
};