const express = require('express');
const router = express.Router();
const axios = require('axios');
const bodyData = require('./body.json');

router.post('/', async (req, res) => {
	try {
		const body = await axios.post(
			process.env.API + process.env.DATA_ROUTE,
			bodyData,
			{
				headers: {
					'Content-Type': 'application/json',
					'x-hpass-issuer-id': process.env.ISSUER_ID,
					Authorization: req.body.token_type + ' ' + req.body.token,
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
