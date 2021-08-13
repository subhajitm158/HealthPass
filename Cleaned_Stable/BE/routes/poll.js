/**
 * 1. Check incoming data in post /callback call if demo flag is true.
 *  a. if demo is true, do not extract anything
 *  b. if demo is false, extract CLAIM_FIRST_NAME CLAIM_LAST_NAME from req.body
 * 2. Set the extracted data (if applicable), to body.json and mock certain fields
 * 3. send the mocked data to /credentials call and get back response data
 * 4. send response from 3. to frontend and as http response
 */

const express = require('express');
const router = express.Router();
const body = require('../data/body.json');
const io = require('socket.io-client');
const socket = io(process.env.SOCKET_URL);
const { postCall, throwError } = require('../utilities/utils');
const { randomizeCredentialSubject } = require('../utilities/randomizeData');

router.post('/', async (req, res) => {
	// create server
	try {
		// fetch data from req body
		// this data will come either from wallet app due to 1st qr code scanning
		// or from postman post call
		const data = req.body; // refer postpolldata.json for sample
		// console.log(data);
		// check if demo is true
		const dataToSet =
			data?.demo === true
				? false
				: {
						firstName:
							data?.verifiableCredentials[0]?.credentialSubject
								?.CLAIM_FIRST_NAME,
						lastName:
							data?.verifiableCredentials[0]?.credentialSubject
								?.CLAIM_LAST_NAME,
				  };

		console.log(dataToSet);
		// call randomize Data function and pass dataToSet
		const newData = randomizeCredentialSubject(dataToSet, body);
		console.log(newData);
		const requestId = req.query.requestId;
		// use credentials to login
		const response = await postCall(
			`${process.env.API}${process.env.LOGIN_ROUTE}`,
			{ email: process.env.MY_EMAIL, password: process.env.MY_PASSWORD },
			{
				headers: {
					'Content-Type': 'application/json',
					requestId: requestId,
					email: process.env.MY_EMAIL,
					password: process.env.MY_PASSWORD,
				},
			},
		);

		[200].indexOf(response.statusCode) === -1
			? throwError('login', 'Login Failed', response.body)
			: null;

		// login successful, get data
		const dataResponse = await postCall(
			`${process.env.API}${process.env.DATA_ROUTE}`,
			newData,
			{
				headers: {
					'Content-Type': 'application/json',
					'x-hpass-issuer-id': process.env.ISSUER_ID,
					requestId: requestId,
					Authorization:
						response.body?.token_type + ' ' + response.body?.access_token,
				},
			},
		);

		[200, 201].indexOf(dataResponse.statusCode) === -1
			? throwError('data-fetch', 'Data Fetch Failed', dataResponse.body)
			: null;

		// const newData = randomizeCredentialSubject(dataResponse.body);

		socket.emit('login', null, requestId, dataResponse.body); // error first event
		res.setHeader('requestId', requestId);
		res.status(200).json(dataResponse.body);
	} catch (err) {
		console.log('POST POLL ERROR =>', err.message || err);
		socket.emit('login', err, null, null);
		res.status(400).json(err);
	}
});

module.exports = router;
