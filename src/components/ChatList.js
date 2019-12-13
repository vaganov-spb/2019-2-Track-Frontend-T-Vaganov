import React from 'react';
import { ChatPreview } from './ChatPreview';
import { HeaderChatList } from './ListOfChatsHeader';
import listStyles from '../styles/ChatList.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

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
