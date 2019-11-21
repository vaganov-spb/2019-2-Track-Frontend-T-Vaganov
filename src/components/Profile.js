/* eslint-disable react/no-unused-state */
import React, { useContext } from 'react';
import { UserContext, UserProvider,  ProfileContext, ProfileProvider } from './UserContext';
import { HeaderTop } from './ChatList';
import { ArrowLeft } from './MessageForm';
import headerStyles from '../styles/ProfileHeader.module.css';
import infoStyles from '../styles/ProfileInfo.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Link = require('react-router-dom').Link;

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

export function Info(props) {
	const user = useContext(UserContext);
	return (
		<div className={infoStyles.container}>
			<div className={infoStyles.img_place}>
				<div className={infoStyles.img_box}>
					<img className={infoStyles.img_content} alt="" src={user.src}/>
					<img className={infoStyles.watermark} alt="" src="https://www.stickpng.com/assets/thumbs/584abf1a2912007028bd9333.png"/>
				</div>
			</div>
			<NameAndBioBox/>
		</div>
	);
}

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

export class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			nick: '',
			bio: '',
			src: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.loadLsData = this.loadLsData.bind(this);
	}

	componentWillMount() {
		this.loadLsData();
	}

	loadLsData() {
		const profile = JSON.parse(localStorage.getItem('profile'));
		this.setState({ name: profile.name });
		this.setState({ nick: profile.nick });
		this.setState({ bio: profile.bio });
		this.setState({ src: profile.src });
		
	}

	handleChange(value, field) {
		if (field === 'Full name') {
			this.setState({ name: value});
		}
		if (field === 'Username') {
			this.setState({ nick: value});
		}
		if (field === 'Bio') {
			this.setState({ bio: value});
		}
	}

	render() {
		return (
			<React.Fragment>
				<ProfileProvider value={this.handleChange}>
					<UserProvider value={this.state}>
						<ProfileHeader/>
						<Info/>
					</UserProvider>
				</ProfileProvider>
			</React.Fragment>
		);
	}
}