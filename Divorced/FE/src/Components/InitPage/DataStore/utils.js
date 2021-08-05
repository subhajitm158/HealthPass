import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export async function getNonce() {
	let trace_id = generateTraceId();

	return axios
		.post(process.env.REACT_APP_NONCE_ROUTE, {
			trace_id: trace_id,
		})
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
		});
}

export async function generateTopic() {
	let text = '';
	let possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 10; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	// console.log(text);
	return text;
}

// export async function buildJsPayloadJWT(topic, nonce, authId, requestId) {
export async function buildJsPayloadJWT(topic, nonce, authId) {
	// var jwt_token = createJWT(topic, nonce, authId, requestId);
	var jwt_token = createJWT(topic, nonce, authId);

	return jwt_token;
}

function generateTraceId() {
	let id =
		'00-' +
		crypto.randomBytes(16).toString('hex') +
		'-' +
		crypto.randomBytes(8).toString('hex') +
		'-01';
	return id;
}

// function createJWT(topic, nonce, authId, requestId) {
function createJWT(topic, nonce, authId) {
	var payload = {
		serviceName: process.env.REACT_APP_SERVICE_NAME,
		serviceDid: process.env.REACT_APP_SERVICE_ADDRESS,
		iat: Math.floor(Date.now() / 1000),
		exp:
			Math.floor(Date.now() / 1000) +
			parseInt(process.env.REACT_APP_JWT_EXP, 10),
		verifiableCredentials: {
			optional: process.env.REACT_APP_CREDENTIAL_LIST_OPTIONAL,
			mandatory: process.env.REACT_APP_CREDENTIAL_LIST_MANDATORY,
		},
		nonce: nonce,
		authorizationId: authId,
		ghpLoginUrl: process.env.REACT_APP_API + process.env.REACT_APP_LOGIN_ROUTE,
		// returnUrl: `${process.env.REACT_APP_RETURN_URL}?requestId=${requestId}`,
		returnUrl: `${process.env.REACT_APP_RETURN_URL}`,
		topic: topic,
	};
	var token = jwt.sign(
		JSON.stringify(payload),
		Buffer.from(process.env.REACT_APP_JWT_KEY),
		{
			algorithm: 'HS256',
		},
	);
	return token;
}
