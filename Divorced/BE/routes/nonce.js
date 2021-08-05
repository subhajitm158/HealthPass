const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
	try {
		const body = await axios.get(process.env.GHPURL + process.env.NONCE_ROUTE, {
			headers: {
				traceparent: req.body.trace_id,
			},
		});
		res.status(200).json(body.data);
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;
