import React from 'react';
import headerStyles from '../../styles/ChatListHeader.module.css';
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