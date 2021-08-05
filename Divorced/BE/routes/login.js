const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
	try {
		const body = await axios.post(
			process.env.API + process.env.LOGIN_ROUTE,
			{
				email: process.env.MY_EMAIL,
				password: process.env.MY_PASSWORD,
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
