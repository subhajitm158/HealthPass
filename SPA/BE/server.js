const config = require('./config.json');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

dotenv.config();

app.use(bodyParser.json());

app.use(config['poll-route'], require('./routes/poll.js'));

app.listen(
	process.env.REACT_APP_BE_PORT,
	console.log(`Server running ${process.env.REACT_APP_BE_PORT}`),
);
