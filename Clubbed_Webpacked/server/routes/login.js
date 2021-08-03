const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config.json');

router.post('/', async (req, res) => {
	try {
		const body = await axios.post(
			config['api'] + config['login-route'],
			{
				email: config['MY_EMAIL'],
				password: config['MY_PASSWORD'],
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		res.status(200).json(body.data);
	} catch (err) {
		console.log('ERROR FROM AXIOS PROXY', err);
		res.status(400).json({ msg: err.message || 'axios proxy error' });
	}
});

module.exports = router;
