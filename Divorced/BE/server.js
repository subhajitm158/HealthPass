const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

dotenv.config();

app.use(bodyParser.json());

app.use(process.env.NONCE_ROUTE, require('./routes/nonce.js'));

app.use(process.env.POLL_ROUTE, require('./routes/poll.js'));

app.use(process.env.LOGIN_ROUTE, require('./routes/login.js'));

app.use(process.env.DATA_ROUTE, require('./routes/data.js'));

app.listen(
	process.env.PORT,
	console.log('Server Running At', process.env.PORT),
);
