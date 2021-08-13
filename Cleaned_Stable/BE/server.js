const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '8080';

io.on('connection', (socket) => {
	console.log('a client connected', socket.id);

	socket.on('disconnect', () => {
		console.log('client', socket.id, 'disconnected');
	});
	socket.on('login', (err, requestId, data) => {
		if (err) console.log(err.message || 'login error event received at server');

		io.sockets.emit(requestId, data);
	});
});

app.use(cors());

app.use(bodyParser.json());

app.use(process.env.NONCE_ROUTE, require('./routes/nonce.js'));

app.use(process.env.POLL_ROUTE, require('./routes/poll.js'));

app.use(process.env.DEMO_ROUTE, require('./routes/demo'));

server.listen(port, host, () => {
	console.log('server listening on ', host, ':', port);
});
