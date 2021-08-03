const express = require('express');
const router = express.Router();

let data = {
	'msg': 'No Data',
};

router.post('/', async (req, res) => {
	try {
		data = req.body;
		res.send(req.body);
	} catch (err) {
		console.error(err);
		res.send(500).send('Server Error');
	}
});

router.get('/', async (req, res) => {
	try {
		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
