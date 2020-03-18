import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import messageStyles from '../styles/MessageForm.module.css';
import { getMessagesSuccess, clearMessageInputValue } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import  { LeftButtons } from '../components/chatform/LeftButtons';
import RightButtons from '../components/chatform/RightButtons';
import Input from '../components/chatform/Input';
import { setTime, scrollTop, preventDefaults } from '../utils';
import { Message } from '../components/chatform/Message';
import { ImageMessage } from '../components/chatform/ImageMessage';
import { VoiceMessage } from '../components/chatform/VoiceMessage';
import HeaderChat from '../components/chatform/HeaderChat';


class Chat extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};
		// this.author = null;
		// this.id = null;
		// this.attachments= [];
		// this.pollItems = this.pollItems.bind(this);
		this.getMessages = this.getMessages.bind(this);
		// this.changeText = this.changeText.bind(this);
		this.onSendClick = this.onSendClick.bind(this);
		// this.fileChange = this.fileChange.bind(this);
		this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
		// this.dragDrop = this.dragDrop.bind(this);
		// this.onSendAudioandImage = this.onSendAudioandImage.bind(this);
	}

	componentDidMount() {
		const {addMessages, fillInput, chatId} = this.props;
		const Data = JSON.parse(localStorage.getItem(chatId));

		addMessages(Data.mes, chatId);
		fillInput(chatId);
		/*
		this.setState({ name: Data.name, url: Data.url });
		if (this.chatId !== 'group') {
			if ('mes' in Data && Data.mes != null) {
				Data.mes.forEach((item, index) => {
					messages.push({ text: Data.mes[index].message, date: Data.mes[index].time, type: Data.mes[index].type });
				});
				this.setState({ messages }, Chat.scrollTop);
			}
		} else {
			this.author = prompt('Перед входом в чат укажите имя', '');
			fetch(`http://localhost:8000/users/auth/?name=${this.author}`)
				.then(res => {
					console.log(res.status);
					if (res.status !== 403){
						res.json()
							.then(data => {
								this.id = data; 
								fetch(`http://localhost:8000/users/${this.id}/messages/?chatId=21`)
									.then(response => {
										console.log(response.status);
										if (response.status === 200){
											response.json().then(mData => {
												this.getMessages(mData);
												interval = setInterval(this.pollItems, 5000); this.setState({interval});
											});
										} else {
											alert('You are not in this chat');
											history.go(-2);
										}
									})
									.catch(err => console.log(err));});
					} else {
						alert('Not Allowed');
						history.goBack();
					}
				})
				.catch(err => console.log(err));
		}
		if (this.chatId !== 'group') {
			if (this.state.messages.length){
				const data = JSON.parse(localStorage.getItem(`${this.chatId}`));
				Data.flag = true;
				localStorage.setItem(`${this.chatId}`, JSON.stringify(data));
			}
		} */
		
	}

	/* componentWillUnmount(){
		this.attachments.forEach((item) => {
			window.URL.revokeObjectURL(item);
		});
		clearInterval(this.state.interval);
	} */

	onSendClick() {
		const { messages, value } = this.state;
		const time = setTime();
		
		if (this.state.value !== '') {
			if(this.chatId !== 'group') {
				this.setState({ messages: [...messages, { text: this.state.value, date: time, type:'text', }]}, () =>
					this.saveToLocalStorage(value, time),
				);
				this.setState({ value: '' }, scrollTop);
			} else {
				const data = new FormData();
				data.append('chatId', 21);
				data.append('content', this.state.value);
				
				fetch(`http://localhost:8000/chats/${this.id}/newmessage/`, {
					method: 'POST',
					body: data,
				})
					.then(res => { console.log(res); this.setState({ value: '' }, scrollTop); })
					.catch(err => console.log(err));
			}
		}
	}

	/* onSendAudioandImage(message) {
		let { messages } = this.state;
		if (message) {
			messages = messages.concat(message);
			this.setState({ messages }, Chat.scrollTop);
			for (let i = 0; i < message.length; i+=1) {
				this.attachments.push(message[i].text);
				const data = new FormData();
				if (message[i].type === 'audio') {
					data.append('audio', message[i].text);
					fetch('https://tt-front.now.sh/upload', {
						method: 'POST',
						body: data,
					}).then((response) => {console.log(response);});
				} else {
					data.append('image', message[i].text);
					fetch('https://tt-front.now.sh/upload', {
						method: 'POST',
						body: data,
					}).then((response) => {console.log(response);});
				}
			}
		}
	} */

	getMessages(data){
		let time = null;
		let { messages } = this.state;
		const message = [];
		if (data.length) {
			data.forEach((item) => {
				time = moment(item.time).tz('Europe/Moscow').format('HH:mm');
				console.log(time);
				message.push({text: item.text, date: time, type: 'text', user: item.user,});
			});
			messages = messages.concat(message);
			
			this.setState({messages}, scrollTop);
		}
	}

	/* pollItems = () => {
		fetch(`http://localhost:8000/users/${this.id}/messages/?chatId=21&new=yes`)
			.then(resp => resp.json())
			.then(data => this.getMessages(data));
	} 

	changeText(text) {
		this.setState({value: text});
	} */

	saveToLocalStorage(message, time) {
		const obj = JSON.parse(localStorage.getItem(`${this.chatId}`));
		obj.flag = false;
		obj.mes.push({message, time, type: 'text'});
		localStorage.setItem(`${this.chatId}`, JSON.stringify(obj));
	}

	/* dragDrop(event) {
		event.preventDefault();
		event.stopPropagation();
		const dt = event.dataTransfer;
		const files = dt.files;
		this.fileChange(files);
	}

	fileChange(files) {
		const message = [];
		const images = [];
		if(files) {
			for(let i = 0; i < files.length; i+=1 ) {
				const value = window.URL.createObjectURL(files[i]);
				const time = Chat.setTime();
				images.push(value);
				message.push({text: value, date: time, type: 'img'});
			}
			
			this.onSendAudioandImage(message);
		}
	} */

	render() {
		if (!this.props.messages) {
			return null;
		}

		return (
			<React.Fragment>
				<HeaderChat chatId={this.props.chatId}/>
				<form>
					<div
						className={messageStyles.result}
						id="result"
						onDrop={preventDefaults} // onDrop={this.dragDrop}
						onDragLeave={preventDefaults}
						onDragOver={preventDefaults}
						onDragEnter={preventDefaults}
					>
						{this.props.messages.map((message, index) => {
							if (message.type === 'text') {
								return <Message key={index} text={message.message} Date={message.time}/>;
							} 
							if (message.type === 'img') {
								return <ImageMessage key={index} img={message.message} Date={message.time}/>;
							}
							if (message.type === 'audio'){
								return <VoiceMessage key={index} audio={message.message}/>;
							}
							return <div key={index}/>;
						})}
					</div>
					<div className={messageStyles.inp}>
						<LeftButtons /* change={this.changeText}  send={this.onSendClick} */ fileChange={this.fileChange}/>
						<Input
							className={messageStyles.forminput}
							// value={this.currentText}
							chatId={this.props.chatId}
							// textevent={this.changeText}
							// onEnter={this.onSendClick}
						/>
						<RightButtons /* send={this.onSendClick} */ chatId={this.props.chatId} audio={this.onSendAudioandImage}/>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const params = new URLSearchParams(ownProps.location.search);
	const chatId = params.get('chatId');

	return {
		chatId,
		messages: state.messages.messages[chatId],
		error: state.messages.errors[chatId],
		isLoaded: state.messages.isLoaded,
	};
};

const mapDispatchToProps = (dispatch) => ({
	addMessages: (message, chatId) => dispatch(getMessagesSuccess(message, chatId)),
	fillInput: (chatId) => dispatch(clearMessageInputValue(chatId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
