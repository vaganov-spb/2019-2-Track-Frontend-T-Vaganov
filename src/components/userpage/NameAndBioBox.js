import React from 'react';
import { connect } from 'react-redux';
import PersonalFields from './PersonalFields';
import infoStyles from '../../styles/ProfileInfo.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function NameAndBioBox(props) {
	if (!props.isLoaded) {
		return null;
	}

	return (
		<div className={infoStyles.user_fields}>
			<PersonalFields 
				name="Name" 
				placeholder="Enter your name!" 
				row='1'
				maxlen='25'
			/>
			<PersonalFields 
				name="Nick" 
				placeholder="Enter your username!" 
				description="Minimum lenght is 5 characters"
				row='1'
				maxlen='25'
			/>
			<PersonalFields 
				name="Bio" 
				description="Any details about you"
				row='3'
				maxlen='75'
			/>
		</div>
	);
}

const mapStateToProps = (state) => ({
	user: state.userinfo.info,
	error: state.userinfo.error,
	isLoaded: state.userinfo.isLoaded,
});

export default connect(mapStateToProps)( NameAndBioBox);