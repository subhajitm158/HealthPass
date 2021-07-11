const express = require('express');
const app = express();
const config = require('./configuration/config.json');

app.use(config['init-Route'], require('./routes/init.js'));

app.use(config['details-Route'], require('./routes/details.js'));

app.listen(config['PORT'], console.log(`Server running ${config['PORT']}`));
