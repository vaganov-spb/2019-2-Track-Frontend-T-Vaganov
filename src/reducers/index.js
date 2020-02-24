import { combineReducers } from 'redux';
import counter from './counter'; 
import { chats } from './chats';
import { messages } from './messages';
import { UserInfo } from './UserInfo';
import { inputValue } from './currentInputMessage';

const rootReducer = combineReducers({
	counter,
	chats,
	messages,
	userinfo: UserInfo,
	currentInputText: inputValue
});

export default rootReducer;
