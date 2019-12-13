import React, { useContext } from 'react';
import { UserContext,  ProfileContext  } from './UserContext';
import infoStyles from '../styles/ProfileInfo.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export function PersonalFields(props) {
	const change = useContext(ProfileContext);

	function onKeyPress(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	}

	function onChange(event, name) {
		change(event.target.value, name);
	}
	return (
		<div className={infoStyles.wrapper}>
			<div className={infoStyles.field_name}> {props.name} </div>
			<textarea 
				className={infoStyles.name} 
				onKeyPress={onKeyPress} 
				onChange={(e) => onChange(e, props.name)} 
				placeholder={props.placeholder} 
				minLength="5" 
				maxLength={props.maxlen}
				rows={props.row}
				value={props.usr}
			/>
			<div className={infoStyles.userlen}> {props.description} </div>
		</div>
	);
}

export function NameAndBioBox(props) {
	const user = useContext(UserContext);

	return (
		<div className={infoStyles.user_fields}>
			<PersonalFields 
				name="Full name" 
				placeholder="Enter your name!" 
				usr={user.name}
				row='1'
				maxlen='25'
			/>
			<PersonalFields 
				name="Username" 
				placeholder="Enter your username!" 
				usr={user.nick}
				description="Minimum lenght is 5 characters"
				row='1'
				maxlen='25'
			/>
			<PersonalFields 
				name="Bio" 
				usr={user.bio}
				description="Any details about you"
				row='3'
				maxlen='75'
			/>
		</div>
	);
}