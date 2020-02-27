/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import messageStyles from '../../styles/MessageForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export function LeftButtons(props){
	const myRef = React.createRef();

	function fileUpload(event) {
		const uploadfile = myRef.current;
		uploadfile.click();
		event.preventDefault();
	}

	function fileTransfer(event){
		props.fileChange(event.target.files);
	}


	function onGeo() {
		// TODO: move to utils
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};
			
		const success = (pos) => {
			const crd = pos.coords;
			// TODO: get rid of this "props" dependency
			props.change(`https://www.openstreetmap.org/#map=18/${crd.latitude}/${crd.longitude}`);
			props.send();
		};
		
		const error = (err) => {
			alert('Не удалось отправить геопозицию');
		};

		navigator.geolocation.getCurrentPosition(success, error, options);
	}

	return(
		<React.Fragment>
			<input 
				type="file" 
				ref={myRef} 
				accept="image/*" 
				capture style={{display: 'None',}} 
				multiple onChange={fileTransfer}
			/>
			<img
				className={messageStyles.image}
				src="https://cdn1.iconfinder.com/data/icons/social-17/48/photos2-512.png"
				alt=""
				onClick={fileUpload}
			/>
			<img
				className={messageStyles.image}
				src="https://i.pinimg.com/originals/9c/91/98/9c919823b4cac48bec5af1f236a39efd.png"
				alt=""
				onClick={onGeo}
			/>
		</React.Fragment>
	);
}
