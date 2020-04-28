/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import Peer from 'peerjs';
import moment from 'moment-timezone';
import messageStyles from '../styles/MessageForm.module.css';
import { getMessagesSuccess, clearMessageInputValue } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import  { LeftButtons } from '../components/chatform/LeftButtons';
import RightButtons from '../components/chatform/RightButtons';
import Input from '../components/chatform/Input';
import { setTime, scrollTop, preventDefaults } from '../utils/index';
import { peerHandshake } from '../utils/PeerFuncs';
import { Message } from '../components/chatform/Message';
import { ImageMessage } from '../components/chatform/ImageMessage';
import { VoiceMessage } from '../components/chatform/VoiceMessage';
import HeaderChat from '../components/chatform/HeaderChat';
import { CENTRIFUGE_URL, messageListUrl, tokenUrl } from '../constants/urls';

const Centrifuge = require('centrifuge');

class Chat extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			centrifuge: null,
			connection: null,
			peer: null,
			peer_id: null,
		};
		
		this.id = null;
		this.getMessages = this.getMessages.bind(this);
		this.onSendClick = this.onSendClick.bind(this);
		this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
	}


	componentDidMount() {
		const {addMessages, fillInput, chatId} = this.props;
		if(chatId !== 'Group Chat'){
			const Data = JSON.parse(localStorage.getItem(chatId));
			addMessages(Data.mes, chatId);
		}  
		if (chatId === 'Group Chat'){
			this.id = 1;
			fetch(messageListUrl(21))
				.then((response) => {
					if(response.status !== 200) {
						console.log('Invalid  query!');
					}
					response.json()
						.then((data) => {
							addMessages(data, chatId);
							scrollTop();
						});
				})
				.catch((err) => {
					console.log(err);
				});
			
			const centrifuge = new Centrifuge(CENTRIFUGE_URL);

			fetch(tokenUrl(this.id))
				.then(response => {
					response.json()
						.then(data => {
							centrifuge.setToken(data.token);
							centrifuge.subscribe('chat:21', function(message){
								addMessages([message.data.message,], chatId);
								scrollTop();
							});
				
							centrifuge.connect();
							this.setState({centrifuge, });
						});
				});
		}


		if(chatId === 'PEER JS'){
			const id = prompt('Enter Your ID');
			this.id = id;
			const centrifuge = new Centrifuge(CENTRIFUGE_URL);
			const peer =  new Peer();
			this.setState({peer, });
			peer.on('connection', (con) => {
				con.on('open', () => {
					con.on('data', (message) => {
						addMessages([message,], chatId);
						scrollTop();
					});
				});
				this.setState({connection: con});
			});

			peer.on('open', (Id) => {
				this.setState({peer_id: Id});
				peerHandshake(centrifuge, id, Id)
					.then((conn) => {
						if (conn < Id) {
							const connection = peer.connect(conn);
							connection.on('open', () => {
								connection.on('data', (message) => {
									addMessages([message,], chatId);
									scrollTop();
									
								});
							});
							this.setState({connection,});
						}
					});
			});
			this.setState({centrifuge, });
		}
		fillInput(chatId);
	}

	componentWillUnmount(){
		if(this.props.chatId === 'Group Chat' || this.props.chatId === 'PEER JS'){
			if(this.props.chatId === 'PEER JS'){
				this.state.peer.destroy();
			}
			this.state.centrifuge.disconnect();
		};
	}


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

	
	saveToLocalStorage(message, time) {
		const obj = JSON.parse(localStorage.getItem(`${this.chatId}`));
		obj.flag = false;
		obj.mes.push({message, time, type: 'text'});
		localStorage.setItem(`${this.chatId}`, JSON.stringify(obj));
	}



	render() {
		if (!this.props.messages) {
			return null;
		}

		const chatId = this.props.chatId;
		return (
			<React.Fragment>
				<HeaderChat chatId={chatId}/>
				<form>
					<div
						className={messageStyles.result}
						id="result"
						onDrop={preventDefaults}
						onDragLeave={preventDefaults}
						onDragOver={preventDefaults}
						onDragEnter={preventDefaults}
					>
						{this.props.messages.map((message, index) => {
							if (message.type === 'text') {
								return <Message key={index} text={message.message} Date={(chatId !== 'Group Chat') ? message.time : moment(message.time).tz('Europe/Moscow').format('HH:mm')}/>;
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
						<LeftButtons fileChange={this.fileChange}/>
						<Input
							className={messageStyles.forminput}
							chatId={chatId}
							connection={this.state.connection}
						/>
						<RightButtons chatId={this.props.chatId} audio={this.onSendAudioandImage}/>
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