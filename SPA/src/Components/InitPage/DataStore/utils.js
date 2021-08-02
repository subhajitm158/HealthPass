import config from '../../Configuration/config.json';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export async function getNonce() {
	let trace_id = generateTraceId();

	return fetch(config['nonce-route'], {
		headers: {
			traceparent: trace_id,
		},
	})
		.then((res) => res.json())
		.then((data) => {
			return data;
		});
}

export async function generateTopic() {
	let text = '';
	let possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 10; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	console.log(text);
	return text;
}

export async function buildJsPayloadJWT(topic, nonce, authId) {
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

function createJWT(topic, nonce, authId) {
	var payload = {
		serviceName: config.serviceName,
		serviceDid: config.serviceDidAddress,
		iat: Math.floor(Date.now() / 1000),
		exp: Math.floor(Date.now() / 1000) + parseInt(config.jwtExpSeconds, 10),
		verifiableCredentials: {
			optional: config.verifiableCredentialListOptional,
			mandatory: config.verifiableCredentialListMandatory,
		},
		nonce: nonce,
		authorizationId: authId,
		gclLoginUrl: config.api + config['login-route'],
		returnUrl: config.returnUrl,
		topic: topic,
	};
	var token = jwt.sign(JSON.stringify(payload), Buffer.from(config.jwtKey), {
		algorithm: 'HS256',
	});
	return token;
}
