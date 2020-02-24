/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import  NameAndBioBox from './NameAndBioBox';
import infoStyles from '../../styles/ProfileInfo.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function Info(props) {
	if (!props.isLoaded) {
		return <div />;
	}

	return (
		<div className={infoStyles.container}>
			<div className={infoStyles.img_place}>
				<div className={infoStyles.img_box}>
					<img className={infoStyles.img_content} alt="" src={props.user.src}/>
					<img className={infoStyles.watermark} alt="" src="https://www.stickpng.com/assets/thumbs/584abf1a2912007028bd9333.png"/>
				</div>
			</div>
			<NameAndBioBox/>
		</div>
	);
}

const mapStateToProps = (state) => ({
	user: state.userinfo.info,
	isLoaded: state.userinfo.isLoaded,
	error: state.userinfo.error
});

export default connect(mapStateToProps)(Info);