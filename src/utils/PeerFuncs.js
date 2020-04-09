export async function peerHandshake(centrifuge, id, peerId){
	let connectionId = null;
	try {
		const response = await fetch(`http://localhost:8000/centrifugo/?user_id=${id}`);
		const data = await response.json();
		
		return await new Promise((resolve, reject) =>{
			centrifuge.setToken(data.token);
		
			centrifuge.on('connect', (context) => {
				peerHandshakeMessage(centrifuge, {'type': 'request', 'my_id': id});
			});
			centrifuge.subscribe('secret:chat', (message) => {
				console.log(message);
				if(message.data.my_id != id){
					if(message.data.type === 'request'){
						peerHandshakeMessage(centrifuge, {'type': 'reply', 'my_id': id, 'hash': `${message.data.my_id * 2 + 1}`});
					}
					if(message.data.type === 'reply'){
						if((parseInt(message.data.hash, 10) - 1) / 2 == id){
							peerHandshakeMessage(centrifuge, {'type': 'connection', 'my_id': id, 'peer': peerId});
						} else {
							peerHandshakeMessage(centrifuge, {'type': 'rejected'});
						}
					}
					if(message.data.type === 'connection'){
						if(!connectionId){
							peerHandshakeMessage(centrifuge, {'type': 'connection', 'my_id': id, 'peer': peerId});
						}
						connectionId = message.data.peer;
						resolve(connectionId);
					}
				}
			});
			centrifuge.connect();
		});
	} 
	catch(err) {
		peerHandshakeMessage(centrifuge, {'type': 'rejected'});
		return err;
	}
}


export function peerHandshakeMessage(centrifuge, message){
	centrifuge.publish('secret:chat', message)
		.then((res) => {
			console.log('successfully published');
		}, (err) => {
			console.log('publish error', err);
		});
}