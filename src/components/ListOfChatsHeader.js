import React from 'react';
import { Link } from 'react-router-dom';
import headerStyles from '../styles/ChatListHeader.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

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