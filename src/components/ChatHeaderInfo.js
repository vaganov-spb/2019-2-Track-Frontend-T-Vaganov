import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderTop } from './ListOfChatsHeader';
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
