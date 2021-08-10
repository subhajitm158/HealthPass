const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
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

app.use(process.env.LOGIN_ROUTE, require('./routes/login.js'));

app.use(process.env.DATA_ROUTE, require('./routes/data.js'));

server.listen(port, host, () => {
	console.log('server listening on ', host, ':', port);
});
