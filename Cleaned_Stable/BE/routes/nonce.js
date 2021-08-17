const express = require('express');
const router = express.Router();
const { getCall, throwError } = require('../utilities/utils');

router.post('/', async (req, res) => {
	try {
		const response = await getCall(
			`${process.env.GHPURL}${process.env.NONCE_ROUTE}`,
			{},
			{
				headers: {
					traceparent: req.body.trace_id,
				},
			},
		);

		[200, 201].indexOf(response.statusCode) === -1
			? throwError('nonce', 'Nonce not fetched', response.body)
			: null;

		res.status(200).json(response.body);
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;
