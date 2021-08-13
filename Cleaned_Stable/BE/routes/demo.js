/**
 * 1. create a simple post call that takes in data, randomizes it and sends mock response back
 */
const express = require('express');
const router = express.Router();
const body = require('../data/body.json');
const { postCall, throwError } = require('../utilities/utils');
const { randomizeCredentialSubject } = require('../utilities/randomizeData');

router.post('/', async (req, res) => {
	try {
		const data = req.body;
		// check if demo is true
		const dataToSet =
			data?.demo === true
				? false
				: {
						firstName: data?.verifiableCredentials[0]?.credentialSubject?.CLAIM_FIRST_NAME,
						lastName: data?.verifiableCredentials[0]?.credentialSubject?.CLAIM_LAST_NAME,
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
			}
		);

		[200].indexOf(response.statusCode) === -1 ? throwError('login', 'Login Failed', response.body) : null;

		// login successful, get data
		const dataResponse = await postCall(`${process.env.API}${process.env.DATA_ROUTE}`, newData, {
			headers: {
				'Content-Type': 'application/json',
				'x-hpass-issuer-id': process.env.ISSUER_ID,
				requestId: requestId,
				Authorization: response.body?.token_type + ' ' + response.body?.access_token,
			},
		});

		[200, 201].indexOf(dataResponse.statusCode) === -1 ? throwError('data-fetch', 'Data Fetch Failed', dataResponse.body) : null;

		res.setHeader('requestId', requestId);
		res.status(200).json(dataResponse.body);
	} catch (err) {
		console.log('POST DEMO ROUTE ERROR =>', err.message || err);
		res.status(400).json(err);
	}
});

module.exports = router;
