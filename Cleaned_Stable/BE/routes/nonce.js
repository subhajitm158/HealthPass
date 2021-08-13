const express = require('express');
const router = express.Router();
const axios = require('axios');
const { postCall, throwError } = require('../utilities/utils');

router.post('/', async (req, res) => {
	try {
		const body = await postCall(
			process.env.GHPURL + process.env.NONCE_ROUTE,
			{},
			{
				headers: {
					traceparent: req.body.trace_id,
				},
			},
		);

		[200].indexOf(response.statusCode) === -1
			? throwError('nonce', 'Nonce not fetched', response.body)
			: null;

		res.status(200).json(body.data);
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;
