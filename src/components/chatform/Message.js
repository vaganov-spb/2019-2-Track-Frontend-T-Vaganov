/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import ruleStyles from '../../styles/MessageRule.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export function Message(props) {
	const value = props.text;
	let content = props.text;
	if(value && value.startsWith('http')) {
		content = <a href={value}> {value}</a>;
	} 
	return (
		<div className={ruleStyles.message}>
			<div className={[ruleStyles.textMs, ruleStyles.text].join(' ')}>
				{content}
			</div>
			<div className={[ruleStyles.textMs, ruleStyles.rightText].join(' ')}>{props.Date} from {props.user}</div>
		</div>
	);
}
