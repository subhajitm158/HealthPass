const express = require('express');
const app = express();
const config = require('./configuration/config.json');

app.use(config['init-Route'], require('./routes/init.js'));

app.use(config['details-Route'], require('./routes/details.js'));

app.listen(5000, console.log(`Server running 5000`));
