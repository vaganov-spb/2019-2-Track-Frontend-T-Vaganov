import React from 'react';
import previewStyles from '../styles/ChatPreview.module.css';
import headerStyles from '../styles/ChatListHeader.module.css';
import listStyles from '../styles/ChatList.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Link = require('react-router-dom').Link;

export function HeaderTop(props) {
	return (
		<div className={headerStyles.icons}>
			<div className={headerStyles.top_icons}>
				<div className={headerStyles.place_top_icons}>
					<span className={headerStyles.fa_icons}>
						<i className="fa fa-circle" />
					</span>
					<span className={headerStyles.fa_icons}>
						<i className="fa fa-battery-three-quarters" />
					</span>
					<span className={headerStyles.fa_icons}>
						<i className="fa fa-apple" />
					</span>
				</div>
			</div>
		</div>
	);
}

export function HeaderChatList(props) {
	return (
		<div className={headerStyles.mess_header}>
			<HeaderTop />
			<div className={headerStyles.mes_list_bottom}>
				<div className={headerStyles.burger}>
					<div className={headerStyles.burg_icon}>
						<Link to="/profile/">
							<img className={headerStyles.br} src="https://static.thenounproject.com/png/696519-200.png" alt="" />
						</Link>
					</div>
				</div>
				<div className={headerStyles.written}>
					<span className={headerStyles.Message}>Messenger</span>
				</div>
				<div className={headerStyles.search_engine}>
					<div className={headerStyles.search_icon}>
						<span className={headerStyles.fa_search_icon}>
							<i className="fa fa-search" />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export function ChatPreview(props) {
	const { chat } = props;
	let lastMes = '';
	let time = '';
	let src = '';
	if (chat.mes.length) {
		lastMes = chat.mes[chat.mes.length - 1][0];
		time = `${chat.mes[chat.mes.length - 1][1]}:${chat.mes[chat.mes.length - 1][2]}`;
	}

	if (chat.flag === true) {
		src = 'https://cdn.iconscout.com/icon/premium/png-512-thumb/double-tick-2-571364.png';
	}
	if (chat.flag === false) {
		src =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Google_Material_Design_check.svg/1024px-Google_Material_Design_check.svg.png';
	}

	return (
		<Link style={{textDecoration: 'none',}} to={{ pathname: '/chat/', search: `?chatId=${props.chat_id}`, }}>
			<div className={previewStyles.chat_pre} /* onClick={() => props.rerender()} */>
				<div className={previewStyles.foto}>
					<img className={previewStyles.user_foto} alt="" src={chat.url} />
				</div>
				<div className={previewStyles.pers_info}>
					<div className={previewStyles.user_info}>
						<div className={previewStyles.Name}>
							<span className={previewStyles.usr_name}>{chat.name}</span>
						</div>
						<div className={previewStyles.last_mes}>
							<div className={previewStyles.last_ms}>{lastMes}</div>
						</div>
					</div>
					<div className={previewStyles.time_check}>
						<div className={previewStyles.Time}>
							<span className={previewStyles.time}>{time}</span>
						</div>
						<div className={previewStyles.indicate}>
							<div className={previewStyles.indicate_img}>
								<img className={previewStyles.indicator} src={src} alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export class ChatList extends React.Component {
	constructor(props) {
		super(props);
		this.keys = [];
		this.state = { chats: [] };
		this.localStGetKeys = this.localStGetKeys.bind(this);
		this.loadLsData = this.loadLsData.bind(this);
	}

	componentWillMount() {
		this.localStGetKeys();
		this.loadLsData();
	}

	loadLsData() {
		const { chats } = this.state;
		for (let i = 0; i < this.keys.length; i += 1) {
			const num = this.keys[i];
			const chat = JSON.parse(localStorage.getItem(num));
			chats.push(chat);
		}
		this.setState({ chats });
	}

	localStGetKeys() {
		for (let i = 0; i < localStorage.length; i += 1) {
			const key = localStorage.key(i);
			if (key !== 'profile'){
				this.keys.push(key);
			}
		}
	}

	render() {
		const { chats } = this.state;
		return (
			<React.Fragment>
				<HeaderChatList />
				<div className={listStyles.list}>
					{chats.map((chat, index) => (
						<ChatPreview key={index} chat={chat} chat_id={this.keys[index]} /* rerender={() => this.props.renderChat(this.keys[index])} */ />
					))}
					<div className={listStyles.new_chat}>
						<img
							className={listStyles.Cr_chat}
							src="https://cdn1.iconfinder.com/data/icons/ui-5/502/chat-512.png"
							alt=""
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
