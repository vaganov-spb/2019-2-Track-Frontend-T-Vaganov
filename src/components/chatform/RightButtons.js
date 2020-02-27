/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setTime } from '../../utils';
import messageStyles from '../../styles/MessageForm.module.css';
import { getMessagesSuccess, clearMessageInputValue } from '../../actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function RightButtons(props) {
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
		if (props.canSend) {
			props.addMessages([{message: `${props.currentText}`, type: 'text', time: `${setTime()}`}], props.chatId);
			props.clearInput(props.chatId);
		}
	}

	useEffect(() => {
		const mimeType = 'audio/webm';
		if (!isRecording && chunks.length > 0) {
			const blob = new Blob(chunks, { type: mimeType });
			const blobUrl = window.URL.createObjectURL(blob);
			const time = setTime();
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

const mapStateToProps = (state, ownProps) => {
	return {
		currentText: state.currentInputText[ownProps.chatId].text,
		canSend: state.currentInputText[ownProps.chatId].flag,
	};
};

const mapDispatchToProps = (dispatch) => ({
	addMessages: (message, chatId) => dispatch(getMessagesSuccess(message, chatId)),
	clearInput: (chatId) => dispatch(clearMessageInputValue(chatId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightButtons);