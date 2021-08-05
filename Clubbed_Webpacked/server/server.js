const config = require('./config.json');
const dotenv = require('dotenv');
const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const ws = require('ws');
const wss = new ws.Server({ port: 3000 });
wss.on('connection', (ws, req) => {
	ws.on('message', (data) => {
		console.log(data);
	});
	ws.on('upgrade', req);
});
dotenv.config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
// session middleware
app.use((req, res, next) => {
	req.wss = wss;
	next();
});
app.use('/api', require('./routes/route.js'));

app.use('/details', require('./routes/route.js'));

app.use(config['poll-route'], require('./routes/poll.js')); //return url requestId

app.use(config['login-route'], require('./routes/login.js'));

app.use(config['qr-route'], require('./routes/data.js'));

module.exports = app;
