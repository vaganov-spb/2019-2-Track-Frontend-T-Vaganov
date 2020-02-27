import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { HeaderTop } from '../chatslist/HeaderTop';
import { ArrowLeft } from './ArrowLeft';
import headStyles from '../../styles/ChatHeader.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function HeaderChat(props) {
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
					<img className={headStyles.avatar} alt="" src={props.src} />
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


const mapStateToProps = (state, ownProps) => {
	const chatId = ownProps.chatId;
	const obj = {
		chatId,
		name: state.chats.chats[chatId].name,
		src: state.chats.chats[chatId].url,
		isLoaded: state.chats.isLoaded,
		error: state.chats.error,
	};

	return obj;
};

export default connect(mapStateToProps)(HeaderChat);
