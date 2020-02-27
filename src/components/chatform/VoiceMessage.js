/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import ruleStyles from '../../styles/MessageRule.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export function VoiceMessage(props) {
	return(
		<audio className={ruleStyles.audio} controls="controls">
			<source src={props.audio} />
		</audio> 
	);
}