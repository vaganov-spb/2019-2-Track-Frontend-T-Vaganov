import React from 'react';
import { connect } from 'react-redux';
import { ChatPreview } from './ChatPreview';
import { HeaderChatList } from './ListOfChatsHeader';
import listStyles from '../../styles/ChatList.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { getChatsSuccess } from '../../actions';


class ChatList extends React.Component {
	constructor(props) {
		super(props);
		this.loadLsData = this.loadLsData.bind(this);
	}

	componentWillMount() {
		this.loadLsData();
	}

	loadLsData() {
		const chatsObj = {};
		for (let i = 0; i < localStorage.length; i += 1) {
			const key = localStorage.key(i);
			if (key !== 'profile' && key !== 'group'){
				const chat = JSON.parse(localStorage.getItem(key));
				Object.assign(chatsObj,{[key]: {name: chat.name, flag: chat.flag, url: chat.url, lastMes: chat.mes[chat.mes.length - 1], }});
			}
		}
		this.props.loadChats(chatsObj);
	}

	render() {
		return (
			<React.Fragment>
				<HeaderChatList />
				<div className={listStyles.list}>
					{Object.keys(this.props.chats).map((chatId, index) => (
						<ChatPreview key={index} chat={this.props.chats[chatId]} chat_id={chatId} /* rerender={() => this.props.renderChat(this.keys[index])} */ />
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

const mapStateToProps = (state) => ({
	chats: state.chats.chats,
	isLoaded: state.chats.isLoaded,
	error: state.chats.error,
});

const mapDispatchToProps = (dispatch) => ({
	loadChats: (chatsObj) => dispatch(getChatsSuccess(chatsObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);

