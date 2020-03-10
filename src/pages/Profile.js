/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import Info from '../components/userpage/Info';
import ProfileHeader from '../components/userpage/ProfileHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { userInfoSuccess } from '../actions/index';


class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.loadLsData = this.loadLsData.bind(this);
	}

	componentDidMount() {
		this.loadLsData();
	}

	loadLsData() {
		const profile = JSON.parse(localStorage.getItem('profile'));
		this.props.changeAttr({ 
			Name: profile.Name,
			Nick: profile.Nick, 
			Bio: profile.Bio, 
			src: profile.src,
		});
	}

	render() {
		if(!this.props.isLoaded) {
			return null;
		} 

		return (
			<React.Fragment>
				<ProfileHeader/>
				<Info/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.userinfo.info,
	error: state.userinfo.error,
	isLoaded: state.userinfo.isLoaded,
});

const mapDispatchToProps = (dispatch) => ({
	changeAttr: attrObj => dispatch(userInfoSuccess(attrObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);