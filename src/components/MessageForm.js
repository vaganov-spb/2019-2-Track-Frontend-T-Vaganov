import React from 'react';
import messageStyles from '../styles/MessageForm.module.css';
import { HeaderTop } from './ChatList';
import formStyles from '../styles/FormInput.module.css';
import ruleStyles from '../styles/MessageRule.module.css';
import headStyles from '../styles/ChatHeader.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export function HeaderChat(props) {
	return (
		<div className={headStyles.main_head}>
			<HeaderTop />
			<div className={headStyles.message_header_bottom}>
				<div className={headStyles.arrow}>
					<span className={headStyles.left_icon}>
						<i className="fa fa-arrow-left" onClick={() => props.rerender()} />
					</span>
				</div>
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
	return (
		<div className={ruleStyles.message}>
			<div className={[ruleStyles.textMs, ruleStyles.text].join(' ')}>{props.text}</div>
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

	constructor(props) {
		super(props);
		this.chatId = props.chatId;
		this.state = {
			messages: [],
			value: '',
			name: '',
			url: '',
		};

		this.changeText = this.changeText.bind(this);
		this.onSendClick = this.onSendClick.bind(this);
		this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
	}

	componentWillMount() {
		const messages = [];
		const Data = JSON.parse(localStorage.getItem(`${this.chatId}`));
		this.setState({ name: Data.name, url: Data.url });
		if ('mes' in Data && Data.mes != null) {
			Data.mes.forEach((item) => {
				messages.push({ text: `${item[0]}`, date: `${item[1]}:${item[2]}` });
			});
			this.setState({ messages }, Chat.scrollTop);
		}
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
			this.setState({ messages: [...messages, { text: this.state.value, date: `${hours}:${minutes}` }] }, () =>
				this.saveToLocalStorage(value, hours, minutes),
			);
			this.setState({ value: '' }, Chat.scrollTop);
		}
	}

	changeText(text) {
		this.setState({ value: text });
	}

	saveToLocalStorage(message, hours, minutes) {
		const obj = JSON.parse(localStorage.getItem(`${this.chatId}`));
		obj.flag = false;
		obj.mes.push([message, hours, minutes]);
		localStorage.setItem(`${this.chatId}`, JSON.stringify(obj));
	}

	render() {
		const { messages } = this.state;
		return (
			<React.Fragment>
				<HeaderChat name={this.state.name} url={this.state.url} rerender={this.props.renderChatList} />
				<form>
					<div className={messageStyles.result} id="result">
						{messages.map((message, index) => (
							<Message key={index} text={message.text} Date={message.date} />
						))}
					</div>
					<div className={messageStyles.inp}>
						<Input
							className={messageStyles.forminput}
							value={this.state.value}
							textevent={this.changeText}
							onEnter={this.onSendClick}
						/>
						<img
							className={messageStyles.image}
							src="https://cdn3.iconfinder.com/data/icons/faticons/32/send-01-512.png"
							alt=""
							onClick={this.onSendClick}
						/>
					</div>
				</form>
			</React.Fragment>
		);
	}
}
