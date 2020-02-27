/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import ruleStyles from '../../styles/MessageRule.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export function ImageMessage(props){
	const img = props.img;
	const date = props.Date;
	return (
		<div className={ruleStyles.imagewrap}>
			<img className={ruleStyles.image} src={img} alt=''/>
			<div className={ruleStyles.date}>{date}</div>
		</div>
	);
}