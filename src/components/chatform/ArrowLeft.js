import React from 'react';
import headStyles from '../../styles/ChatHeader.module.css';
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

