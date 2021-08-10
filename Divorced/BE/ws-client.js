const io = require('socket.io-client');
const socket = io('http://localhost:3000/');
// console.log(socket);
socket.on('open', () => {
	console.log('connected');
});
socket.emit('hello', 'server');
socket.on('abcdef', (data) => {
	console.log('data received from server for request id: asfdldsj39dfsj');
	console.log(data);
});
