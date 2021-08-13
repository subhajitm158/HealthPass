import crypto from 'crypto';
import { encodeJWT } from '../../API_Calls/details';
import axios from 'axios';

export async function getNonce() {
	let trace_id = generateTraceId();

	return axios
		.post(process.env.REACT_APP_BE_URL + process.env.REACT_APP_NONCE_ROUTE, {
			trace_id: trace_id,
		})
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
		});
}

export async function buildJsPayloadJWT(nonce, authId, requestId) {
	var jwt_token = createJWT(nonce, authId, requestId);

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

function createJWT(nonce, authId, requestId) {
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
		returnUrl: `${
			process.env.REACT_APP_BE_URL + process.env.REACT_APP_POLL_ROUTE
		}?requestId=${requestId}`,
	};

	var token = encodeJWT(payload);

	return token;
}
