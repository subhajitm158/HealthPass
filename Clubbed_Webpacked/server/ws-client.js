const requestId = '123456';
const ws = require('ws');
const socket = new ws('ws://localhost:3000');
ws.onopen = () => {
	// on connecting, do nothing but log it to the console
	console.log('connected');
};

ws.onmessage = (evt) => {
	// listen to data sent from the websocket server
	const message = JSON.parse(evt.data);
	// this.setState({ dataFromServer: message });
	console.log(message);
};
ws.on(requestId, (data) => {
	console.log(
		'------------------------- DATA FROM WS SERVER =======================',
	);
	console.log(data);
});
