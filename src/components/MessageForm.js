/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { history } from '../routes/index';
import messageStyles from '../styles/MessageForm.module.css';
import { HeaderTop } from './ChatList';
import formStyles from '../styles/FormInput.module.css';
import ruleStyles from '../styles/MessageRule.module.css';
import headStyles from '../styles/ChatHeader.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


export function ArrowLeft(props) {
	return (
		<div className={headStyles.arrow}>
			<span className={headStyles.left_icon}>
				{props.children}
			</span>
		</div>
	);
}

export function HeaderChat(props) {
	return (
		<div className={headStyles.main_head}>
			<HeaderTop />
			<div className={headStyles.message_header_bottom}>
				<ArrowLeft>
					<Link style={{color: 'var(--white)',}} to="/">
						<i className="fa fa-arrow-left"/>
					</Link>
				</ArrowLeft>
				<div className={headStyles.message_header_img}>
					<img className={headStyles.avatar} alt="" src={props.url} />
				</div>

				<div className={headStyles.username}>
					<span className={headStyles.user}>{props.name}</span>
					<p className={headStyles.online}>в сети 2 часа назад</p>
				</div>
				<div className={headStyles.search_icons}>
					<span className={headStyles.right_icons}>
						<i className="fa fa-search" />
					</span>
					<span className={headStyles.right_icons}>
						<i className="fa fa-ellipsis-v" />
					</span>
				</div>
			</div>
		</div>
	);
}

export function Message(props) {
	const value = props.text;
	let content = props.text;
	if(value.startsWith('http')) {
		content = <a href={value}> {value}</a>;
	} 
	return (
		<div className={ruleStyles.message}>
			<div className={[ruleStyles.textMs, ruleStyles.text].join(' ')}>
				{content}
			</div>
			<div className={[ruleStyles.textMs, ruleStyles.rightText].join(' ')}>{props.Date} from {props.user}</div>
		</div>
	);
}

export function ImageMessage(props){
	const img = props.img;
	const date = props.Date;
	return (
		<div className={ruleStyles.imagewrap}>
			<img className={ruleStyles.image} src={img} alt=''/>
			<div className={ruleStyles.date}>{date}</div>
		</div>
	);
}

export function VoiceMessage(props) {
	return(
		<audio className={ruleStyles.audio} controls="controls">
			<source src={props.audio} />
		</audio> 
	);
}

export function RightButtons(props) {
	const [isRecording, setRecordState] = useState(false);
	const [chunks, setChunks] = useState([]);
	const [recorder, setRecorder] = useState(null);
	const [stream, setStream] = useState(null);

	async function onAudio(){
		try {
			if (!isRecording) {
				const streaming = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false
				});
				setStream(streaming);
				const mimeType = 'audio/webm';
				const audio =  new MediaRecorder(streaming, { type: mimeType });
				audio.addEventListener('dataavailable', (event) => {
					if (event.data.size > 0) {
						setChunks([...chunks, event.data]);
					}
				});
				audio.start();
				setRecorder(audio);
				setRecordState(true);
			} else {
				setRecordState(false);
				recorder.stop();
				const track = stream.getTracks()[0];
				track.stop();
			}
		} catch {
			console.log('You denied access to the microphone.');
		}
	} 

	function Send() {
		props.send();
	}

	useEffect(() => {
		const mimeType = 'audio/webm';
		if (!isRecording && chunks.length > 0) {
			const blob = new Blob(chunks, { type: mimeType });
			const blobUrl = window.URL.createObjectURL(blob);
			const time = Chat.setTime();
			props.audio([{ text: blobUrl, date: time, type: 'audio' }]);
			setChunks([]);
		}
	}, [chunks, isRecording]);

	return(
		<React.Fragment>
			<img
				className={messageStyles.image}
				src="https://cdn3.iconfinder.com/data/icons/faticons/32/send-01-512.png"
				alt=""
				onClick={Send}
			/>
			<img
				className={messageStyles.image}
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsxjWUIon_ELBJrEW9VYKM_OX6OHJcSVuOO7_6S_F0KGbDNmHT8w&s"alt=""
				onClick={onAudio}
			/>
		</React.Fragment>
	);
}

export function Input(props) {
	function onKeyPress(event) {
		if (event.key === 'Enter') {
			props.onEnter();
			props.textevent('');
			event.preventDefault();
		}
	}

	function handleChange(event) {
		props.textevent(event.target.value);
	}
	return (
		<input
			className={formStyles.form}
			type="text"
			value={props.value}
			placeholder="Cooбщение"
			onChange={handleChange}
			onKeyPress={onKeyPress}
		/>
	);
}


export function LeftButtons(props){
	const myRef = React.createRef();

	function fileUpload(event) {
		const uploadfile = myRef.current;
		uploadfile.click();
		event.preventDefault();
	}

	function fileTransfer(event){
		props.fileChange(event.target.files);
	}


	function onGeo() {
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};
			
		const success = (pos) => {
			const crd = pos.coords;
			props.change(`https://www.openstreetmap.org/#map=18/${crd.latitude}/${crd.longitude}`);
			props.send();
		};
		
		const error = (err) => {
			alert('Не удалось отправить геопозицию');
		};

		navigator.geolocation.getCurrentPosition(success, error, options);
	
	}

	return(
		<React.Fragment>
			<input 
				type="file" 
				ref={myRef} 
				accept="image/*" 
				capture style={{display: 'None',}} 
				multiple onChange={fileTransfer}
			/>
			<img
				className={messageStyles.image}
				src="https://cdn1.iconfinder.com/data/icons/social-17/48/photos2-512.png"
				alt=""
				onClick={fileUpload}
			/>
			<img
				className={messageStyles.image}
				src="https://i.pinimg.com/originals/9c/91/98/9c919823b4cac48bec5af1f236a39efd.png"
				alt=""
				onClick={onGeo}
			/>
		</React.Fragment>
	);
}

export class Chat extends React.Component {

	static scrollTop() {
		const windowSize = document.getElementById('result');
		windowSize.scrollTop = windowSize.scrollHeight - 400;
	}


	static preventDefaults(e){
		e.preventDefault();
		e.stopPropagation();
	}


	static setTime() {
		const time = new Date();
		let hours = time.getHours();
		let minutes = time.getMinutes();
		if (Number(time.getMinutes()) < 10) {
			minutes = `0${String(time.getMinutes())}`;
		}
		if (time.getHours() < 10) {
			hours = `0${time.getHours()}`;
		}
		return `${hours}:${minutes}`;
	}


	constructor(props) {
		super(props);
		const params = new URLSearchParams(props.location.search);
		this.chatId = params.get('chatId');
		this.state = {
			messages: [],
			value: '',
			name: '',
			url: '',
			interval: null,
		};
		this.author = null;
		this.id = null;
		this.attachments= [];
		this.pollItems = this.pollItems.bind(this);
		this.getMessages = this.getMessages.bind(this);
		this.changeText = this.changeText.bind(this);
		this.onSendClick = this.onSendClick.bind(this);
		this.fileChange = this.fileChange.bind(this);
		this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
		this.dragDrop = this.dragDrop.bind(this);
		this.onSendAudioandImage = this.onSendAudioandImage.bind(this);
	}

	componentWillMount() {
		let { interval } = this.state;
		const messages = [];
		const Data = JSON.parse(localStorage.getItem(`${this.chatId}`));
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
	}

	componentDidMount() {
		if (this.chatId !== 'group') {
			if (this.state.messages.length){
				const Data = JSON.parse(localStorage.getItem(`${this.chatId}`));
				Data.flag = true;
				localStorage.setItem(`${this.chatId}`, JSON.stringify(Data));
			}
		}
	}

	componentWillUnmount(){
		this.attachments.forEach((item) => {
			window.URL.revokeObjectURL(item);
		});
		clearInterval(this.state.interval);
	}

	onSendClick() {
		const { messages, value } = this.state;
		const time = Chat.setTime();
		if (this.state.value !== '') {
			if(this.chatId !== 'group') {
				this.setState({ messages: [...messages, { text: this.state.value, date: time, type:'text', }]}, () =>
					this.saveToLocalStorage(value, time),
				);
				this.setState({ value: '' }, Chat.scrollTop);
			} else {
				const data = new FormData();
				data.append('chatId', 21);
				data.append('content', this.state.value);
				
				fetch(`http://localhost:8000/chats/${this.id}/newmessage/`, {
					method: 'POST',
					body: data,
				})
					.then(res => console.log(res))
					.catch(err => console.log(err));
			}
		}
	}

	onSendAudioandImage(message) {
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
	}

	getMessages(data){
		let { messages } = this.state;
		const message = [];
		data.forEach((item) => {
			message.push({text: item.text, date: item.time, type: 'text', user: item.user, });
		});
		messages = messages.concat(message);
		
		this.setState({messages}, Chat.scrollTop);
	}

	pollItems = () => {
		fetch(`http://localhost:8000/users/${this.id}/messages/?chatId=21&new=yes`)
			.then(resp => resp.json())
			.then(data => this.getMessages(data));
	}

	changeText(text) {
		this.setState({ value: text });
	}

	saveToLocalStorage(message, time) {
		const obj = JSON.parse(localStorage.getItem(`${this.chatId}`));
		obj.flag = false;
		obj.mes.push({message, time, type: 'text'});
		localStorage.setItem(`${this.chatId}`, JSON.stringify(obj));
	}

	dragDrop(event) {
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
				const time =Chat.setTime();
				images.push(value);
				message.push({text: value, date: time, type: 'img'});
			}
			this.onSendAudioandImage(message);
		}
	}


	render() {
		const { messages } = this.state;
		return (
			<React.Fragment>
				<HeaderChat name={this.state.name} url={this.state.url}/>
				<form>
					<div
						className={messageStyles.result}
						id="result"
						onDrop={this.dragDrop}
						onDragLeave={Chat.preventDefaults}
						onDragOver={Chat.preventDefaults}
						onDragEnter={Chat.preventDefaults}
					>
						{messages.map((message, index) => {
							if (message.type === 'text') {
								return <Message key={index} text={message.text} Date={message.date} user={message.user}/>;
							} 
							if (message.type === 'img') {
								return <ImageMessage key={index} img={message.text} Date={message.date}/>;
							}
							if (message.type === 'audio'){
								return <VoiceMessage key={index} audio={message.text}/>;
							}
							return <div key={index}/>;
						})}
					</div>
					<div className={messageStyles.inp}>
						<LeftButtons change={this.changeText} send={this.onSendClick} fileChange={this.fileChange}/>
						<Input
							className={messageStyles.forminput}
							value={this.state.value}
							textevent={this.changeText}
							onEnter={this.onSendClick}
						/>
						<RightButtons send={this.onSendClick} audio={this.onSendAudioandImage}/>
					</div>
				</form>
			</React.Fragment>
		);
	}
}