export const CENTRIFUGE_URL = 'ws://localhost:9000/connection/websocket';
export const tokenUrl = (id) => {
	return `http://localhost:8000/centrifugo/?user_id=${id}`;
};

export const messageListUrl = (id) => {
	return `http://localhost:8000/users/1/messages/?chat_id=${id}`;
};