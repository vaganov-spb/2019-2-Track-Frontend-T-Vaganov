import React from 'react';
import { Link } from 'react-router-dom';
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
	if(props.type === 'img') {
		content= <img className={ruleStyles.images} src={props.text} alt=''/>;
	}
	return (
		<div className={ruleStyles.message}>
			<div className={[ruleStyles.textMs, ruleStyles.text].join(' ')}>
				{content}
			</div>
			<div className={[ruleStyles.textMs, ruleStyles.rightText].join(' ')}>{props.Date}</div>
		</div>
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

export class Chat extends React.Component {
	static scrollTop() {
		const windowSize = document.getElementById('result');
		windowSize.scrollTop = windowSize.scrollHeight - 400;
	}

	static preventDefaults(e){
		e.preventDefault();
		e.stopPropagation();
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
		};
		this.myRef = React.createRef();
		this.changeText = this.changeText.bind(this);
		this.onSendClick = this.onSendClick.bind(this);
		this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
		this.Geo = this.Geo.bind(this);
		this.FileUpload = this.FileUpload.bind(this);
		this.fileChange = this.fileChange.bind(this);
		this.DragDrop = this.DragDrop.bind(this);
		this.FileTransfer = this.FileTransfer.bind(this);
	}

	componentWillMount() {
		const messages = [];
		const Data = JSON.parse(localStorage.getItem(`${this.chatId}`));
		this.setState({ name: Data.name, url: Data.url });
		if ('mes' in Data && Data.mes != null) {
			Data.mes.forEach((item, index) => {
				messages.push({ text: Data.mes[index].message, date: Data.mes[index].time, type: Data.mes[index].type });
			});
			this.setState({ messages }, Chat.scrollTop);
		}
	}

	componentDidMount() {
		const Data = JSON.parse(localStorage.getItem(`${this.chatId}`));
		Data.flag = true;
		localStorage.setItem(`${this.chatId}`, JSON.stringify(Data));
	}

	onSendClick() {
		const { messages, value } = this.state;
		const time = new Date();
		let hours = time.getHours();
		let minutes = time.getMinutes();
		if (Number(time.getMinutes()) < 10) {
			minutes = `0${String(time.getMinutes())}`;
		}
		if (time.getHours() < 10) {
			hours = `0${time.getHours()}`;
		}
		if (this.state.value !== '') {
			this.setState({ messages: [...messages, { text: this.state.value, date: `${hours}:${minutes}`,type:'text', }]}, () =>
				this.saveToLocalStorage(value, hours, minutes),
			);
			this.setState({ value: '' }, Chat.scrollTop);
		}
	}


	Geo() {
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};
			
		const success = (pos) => {
			const crd = pos.coords;
			this.setState({ value: `https://www.openstreetmap.org/#map=18/${crd.latitude}/${crd.longitude}`}, this.onSendClick);
		};
		
		const error = (err) => {
			this.setState({ value: 'Не удалось отправить геопозицию'});
		};

		navigator.geolocation.getCurrentPosition(success, error, options);
	
	}

	changeText(text) {
		this.setState({ value: text });
	}

	saveToLocalStorage(message, hours, minutes) {
		const obj = JSON.parse(localStorage.getItem(`${this.chatId}`));
		obj.flag = false;
		obj.mes.push({message, time: `${hours}:${minutes}`, type: 'text'});
		localStorage.setItem(`${this.chatId}`, JSON.stringify(obj));
	}

	FileUpload(event) {
		const uploadfile = this.myRef.current;
		uploadfile.click();
		event.preventDefault();
	}

	FileTransfer(event){
		this.fileChange(event.target.files);
	}

	fileChange(files) {
		let { messages } = this.state;
		const message = [];
		if(files) {
			for(let i = 0; i < files.length; i+=1 ) {
				const value = window.URL.createObjectURL(files[i]);
				const time = new Date();
				let hours = time.getHours();
				let minutes = time.getMinutes();
				if (Number(time.getMinutes()) < 10) {
					minutes = `0${String(time.getMinutes())}`;
				}
				if (time.getHours() < 10) {
					hours = `0${time.getHours()}`;
				}
				message.push({text: value, date: `${hours}:${minutes}`, type: 'img'});
				const data = new FormData();
				data.append('image', files[i]);
				fetch('https://tt-front.now.sh/upload', {
					method: 'POST',
					body: data,
				}).then((response) => {console.log(response);});
			}
			messages = messages.concat(message);
			this.setState({ messages }, Chat.scrollTop);
		}
	}

	DragDrop(event) {
		event.preventDefault();
		event.stopPropagation();
		const dt = event.dataTransfer;
		const files = dt.files;
		this.fileChange(files);
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
						onDrop={this.DragDrop}
						onDragLeave={this.preventDefaults}
						onDragOver={this.preventDefaults}
						onDragEnter={this.preventDefaults}
					>
						{messages.map((message, index) => {
							return <Message key={index} text={message.text} Date={message.date} type={message.type} />;
						})}
					</div>
					<div className={messageStyles.inp}>
						<Input
							className={messageStyles.forminput}
							value={this.state.value}
							textevent={this.changeText}
							onEnter={this.onSendClick}
						/>
						<input 
							type="file" 
							ref={this.myRef} 
							accept="image/*" 
							capture style={{display: 'None',}} 
							multiple onChange={this.FileTransfer}
						/>
						<img
							className={messageStyles.image}
							src="https://cdn3.iconfinder.com/data/icons/faticons/32/send-01-512.png"
							alt=""
							onClick={this.FileUpload}
						/>
					</div>
				</form>
			</React.Fragment>
		);
	}
}
/*
<img
className={messageStyles.image}
src="https://cdn3.iconfinder.com/data/icons/faticons/32/send-01-512.png"
alt=""
onClick={this.onSendClick}
/>
<img
className={messageStyles.image}
src="https://cdn3.iconfinder.com/data/icons/faticons/32/send-01-512.png"
alt=""
onClick={this.Geo}
/>
*/