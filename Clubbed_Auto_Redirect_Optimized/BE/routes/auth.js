const express = require('express');
const router = express.Router();
const utils = require('../resources/utils');

let data = {};

router.post('/', async (req, res) => {
	try {
		data = req.body.data;
		completeCall(res, req);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

router.get('/', async (req, res) => {
	try {
		res.status(200).json({ data });
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

async function completeCall(res, req) {
	try {
		if (!utils.checkValidity()) {
			res.status(400).send('invalid user requested');
		} else {
			res.status(200).json({ data: req.body.data });
		}
	} catch (error) {
		// Promise rejected
		res.status(500);
		// Cambialo
		res.send('Error');
		console.log(error);
	}
}

async function clearBody(res) {
	res.status(200).send('');
}

module.exports = router;
