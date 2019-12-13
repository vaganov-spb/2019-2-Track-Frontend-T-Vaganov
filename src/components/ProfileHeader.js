/* eslint-disable react/no-unused-state */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { HeaderTop } from './ListOfChatsHeader';
import { ArrowLeft } from './ChatHeaderInfo';
import headerStyles from '../styles/ProfileHeader.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export function ProfileHeader(props) {
	const user = useContext(UserContext);

	function SaveToLS() {
		localStorage.setItem('profile', JSON.stringify(user));
	}
	
	return (
		<div className={headerStyles.main_head}>
			<HeaderTop/>
			<div className={headerStyles.message_header_bottom}>
				<ArrowLeft>
					<Link style={{color: 'var(--white)',}} to="/">
						<i className="fa fa-arrow-left" />
					</Link>
				</ArrowLeft>
				<div className={headerStyles.center}>
					<span className={headerStyles.edit_profile}>
                        Edit Profile
					</span>
				</div>     
				<div className={headerStyles.mark}>
					<img className={headerStyles.mark_img} onClick={SaveToLS}src="https://icon-library.net/images/check-icon-png/check-icon-png-13.jpg" alt=""/>
				</div>  
			</div>
		</div>
	);
}