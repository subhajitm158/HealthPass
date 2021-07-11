const express = require('express');
const router = express.Router();
const utils = require('../resources/utils');

router.get('/', async (req, res) => {
	try {
		const token = req.headers['x-token-auth'];

		if (!token) {
			res.status(400).send('missing auth');
			res.redirect('/api');
		} else {
			completeCall(res, token);
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

async function completeCall(res, token) {
	try {
		let data = utils.getUserDetails(token);

		res.send(JSON.stringify(data));
	} catch (error) {
		res.status(500);
		res.send('Error');
		console.log(error);
	}
}

module.exports = router;
