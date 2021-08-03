const config = require('./config.json');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();

dotenv.config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use('/api', require('./routes/route.js'));

app.use('/details', require('./routes/route.js'));

app.use(config['poll-route'], require('./routes/poll.js'));

app.use(config['login-route'], require('./routes/login.js'));

app.use(config['qr-route'], require('./routes/data.js'));

module.exports = app;
