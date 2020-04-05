import React from 'react';
import { connect } from 'react-redux';
import { setTime } from '../../utils';
import { getMessagesSuccess, changeMessageInputValue, clearMessageInputValue } from '../../actions';
import formStyles from '../../styles/FormInput.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function Input (props){
	function onKeyPress(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			if(props.canSend) {
				if(props.chatId !== 'Group Chat'){
					props.addMessages(
						[{message: `${props.currentText}`, type: 'text', time: `${setTime()}`}],
						props.chatId
					);
				}  else {
					fetch('http://localhost:8000/chats/1/newmessage/',{
						method: 'POST',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({content: `${props.currentText}`, chatId:21})
					});
				}
				props.clearInput(props.chatId);
			}
		}
	}

	function handleChange(event) {
		if(event.target.value) {
			props.changeInput(event.target.value, props.chatId);
		} else {
			props.clearInput(props.chatId);
		}
	};

	return (
		<input
			className={formStyles.form}
			type="text"
			value={props.currentText}
			placeholder="Cooбщение"
			onChange={handleChange}
			onKeyPress={onKeyPress}
		/>
	);
}


const mapStateToProps = (state, ownProps) => {
	return {
		currentText: state.currentInputText[ownProps.chatId].text,
		canSend: state.currentInputText[ownProps.chatId].flag,
	};
};

const mapDispatchToProps = (dispatch) => ({
	addMessages: (message, chatId) => dispatch(getMessagesSuccess(message, chatId)),
	changeInput: (text, chatId) => dispatch(changeMessageInputValue(text, chatId)),
	clearInput: (chatId) => dispatch(clearMessageInputValue(chatId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Input);