import { buildJsPayloadJWT, getNonce } from './utils';

export async function CompleteCall(requestId) {
	const http_promise = await getNonce();

	let nonce = '',
		authId = '';

	if (http_promise === undefined) {
		console.error('Nonce route failed...');

		return '';
	} else {
		nonce = http_promise.nonce;
		authId = http_promise.authorizationId;

		let payload = buildJsPayloadJWT(nonce, authId, requestId);

		return payload;
	}
}
