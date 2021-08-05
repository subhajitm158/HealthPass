const express = require('express');
const router = express.Router();

let data = {
	'msg': 'No Data',
};

router.post('/', async (req, res) => {
	// create server
	try {
		data = req.body;
		const requestId = req.query.requestId;
		// req.rawListeners.emit(requestId, data);
		req.wss.emit('123456', { status: 'ok' });
		// res.send(req.body);
		// Store data in redis
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
