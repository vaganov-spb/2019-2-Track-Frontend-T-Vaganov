/* eslint-disable react/no-unused-state */
import React, { useContext } from 'react';
import { UserContext, UserProvider, ProfileProvider } from './UserContext';
import { NameAndBioBox } from './UserInfoFields';
import { ProfileHeader } from './ProfileHeader';
import infoStyles from '../styles/ProfileInfo.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

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