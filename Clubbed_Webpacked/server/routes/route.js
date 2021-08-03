const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		res.render('index');
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
