const express = require('express');
const router = express.Router();
const utils = require('../resources/utils');
const TopicRepository = require('../resources/topic');
const repository = new TopicRepository();

var JSONbig = require('json-bigint');

router.get('/', async (req, res) => {
	try {
		completeCall(res);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

async function completeCall(res) {
	try {
		let data = utils.getUserDetails();

		res.send(JSON.stringify(data));
	} catch (error) {
		// Promise rejected
		res.status(500);
		// Cambialo
		res.send('Error');
		console.log(error);
	}
}

module.exports = router;
