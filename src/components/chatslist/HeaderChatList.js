import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderTop } from './HeaderTop';
import headerStyles from '../../styles/ChatListHeader.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

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