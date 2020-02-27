import React from 'react';
import { connect } from 'react-redux';
import Chat from './MessageForm';
import { getMessagesSuccess, changeMessageInputValue, clearMessageInputValue } from '../../actions';
import formStyles from '../../styles/FormInput.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function Input (props){
	function onKeyPress(event) {
		if (event.key === 'Enter' && props.canSend) {
			props.addMessages([{message: `${props.currentText}`, type: 'text', time: `${Chat.setTime()}`}], props.chatId);
			props.clearInput(props.chatId);
			event.preventDefault();
		} else if (event.key === 'Enter') {
			event.preventDefault();
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