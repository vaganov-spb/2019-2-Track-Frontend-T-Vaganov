import React from 'react';
import { connect } from 'react-redux';
import { userInfoSuccess } from '../../actions/index';
import infoStyles from '../../styles/ProfileInfo.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function PersonalFields(props) {
	function onKeyPress(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	}

	function onChange(event, name) {
		props.changeAttr({[name]: event.target.value });
	}

	if (!props.isLoaded) {
		return null;
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
				value={props.user[props.name]}
			/>
			<div className={infoStyles.userlen}> {props.description} </div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	user: state.userinfo.info,
	error: state.userinfo.error,
	isLoaded: state.userinfo.isLoaded,
});

const mapDispatchToProps = (dispatch) => ({
	changeAttr: attrObj => dispatch(userInfoSuccess(attrObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalFields);