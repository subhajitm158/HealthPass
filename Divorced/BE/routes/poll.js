const express = require('express');
const needle = require('needle');
const router = express.Router();
const body = require('./body.json');
const io = require('socket.io-client');
const socket = io(process.env.SOCKET_URL + ':' + (process.env.PORT || '8080'));

// socket.on('open', () => {
// 	console.log('connected');
// });

let data = {
	msg: 'No Data',
};

router.post('/', async (req, res) => {
	// create server
	try {
		const data = req.body; // user credentials (email and password) from wallet app
		const requestId = req.query.requestId;
		// use credentials to login
		const response = await needle(
			'post',
			`${process.env.API}${process.env.LOGIN_ROUTE}`,
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					requestId: requestId,
				},
			},
		);
		const status = response.statusCode;
		if ([200].indexOf(response.statusCode) === -1) {
			throw {
				status: 'NOT OK',
				level: 'login',
				reason: 'Login Failed',
				...response.body,
			};
		}
		// console.log('response from login', response.body);
		// login successful, get data
		const dataResponse = await needle(
			'post',
			`${process.env.API}${process.env.DATA_ROUTE}`,
			body,
			{
				headers: {
					'Content-Type': 'application/json',
					'x-hpass-issuer-id': process.env.ISSUER_ID,
					requestId: requestId,
					Authorization:
						response.body.token_type + ' ' + response.body.access_token,
				},
			},
		);
		// console.log('status code for data fetch', dataResponse.statusCode);
		if ([200, 201].indexOf(dataResponse.statusCode) === -1) {
			throw {
				status: 'NOT OK',
				level: 'data-fetch',
				reason: 'Data Fetch Failed',
				...dataResponse.body,
			};
		}
		socket.emit('login', null, requestId, dataResponse.body); // error first event
		res.setHeader('requestId', requestId);
		res.status(200).json(dataResponse.body);
	} catch (err) {
		console.log('POST POLL ERROR =>', err.message || err);
		socket.emit('login', err, null, null);
		res.status(400).json(err);
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
