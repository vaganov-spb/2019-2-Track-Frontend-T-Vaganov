import React, { useState, useEffect } from 'react';
import { Chat } from './MessageForm';
import messageStyles from '../styles/MessageForm.module.css';
import formStyles from '../styles/FormInput.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export function RightButtons(props) {
	const [isRecording, setRecordState] = useState(false);
	const [chunks, setChunks] = useState([]);
	const [recorder, setRecorder] = useState(null);
	const [stream, setStream] = useState(null);

	async function onAudio(){
		try {
			if (!isRecording) {
				const streaming = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false
				});
				setStream(streaming);
				const mimeType = 'audio/webm';
				const audio =  new MediaRecorder(streaming, { type: mimeType });
				audio.addEventListener('dataavailable', (event) => {
					if (event.data.size > 0) {
						setChunks([...chunks, event.data]);
					}
				});
				audio.start();
				setRecorder(audio);
				setRecordState(true);
			} else {
				setRecordState(false);
				recorder.stop();
				const track = stream.getTracks()[0];
				track.stop();
			}
		} catch {
			console.log('You denied access to the microphone.');
		}
	} 

	function Send() {
		props.send();
	}

	useEffect(() => {
		const mimeType = 'audio/webm';
		if (!isRecording && chunks.length > 0) {
			const blob = new Blob(chunks, { type: mimeType });
			const blobUrl = window.URL.createObjectURL(blob);
			const time = Chat.setTime();
			props.audio([{ text: blobUrl, date: time, type: 'audio' }]);
			setChunks([]);
		}
	}, [chunks, isRecording]);

	return(
		<React.Fragment>
			<img
				className={messageStyles.image}
				src="https://cdn3.iconfinder.com/data/icons/faticons/32/send-01-512.png"
				alt=""
				onClick={Send}
			/>
			<img
				className={messageStyles.image}
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsxjWUIon_ELBJrEW9VYKM_OX6OHJcSVuOO7_6S_F0KGbDNmHT8w&s"alt=""
				onClick={onAudio}
			/>
		</React.Fragment>
	);
}

export function Input(props) {
	function onKeyPress(event) {
		if (event.key === 'Enter') {
			props.onEnter();
			props.textevent('');
			event.preventDefault();
		}
	}

	function handleChange(event) {
		props.textevent(event.target.value);
	}
	return (
		<input
			className={formStyles.form}
			type="text"
			value={props.value}
			placeholder="Cooбщение"
			onChange={handleChange}
			onKeyPress={onKeyPress}
		/>
	);
}


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
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};
			
		const success = (pos) => {
			const crd = pos.coords;
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