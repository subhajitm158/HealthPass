const express = require('express');
const app = express();
const config = require('./configuration/config.json');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

app.use(bodyParser.json());

app.use(config['init-Route'], require('./routes/init.js'));

app.use(config['auth-Route'], require('./routes/auth'));

app.use(config['details-Route'], require('./routes/details.js'));

app.listen(
	process.env.REACT_APP_BE_PORT,
	console.log(`Server running ${process.env.REACT_APP_BE_PORT}`),
);
