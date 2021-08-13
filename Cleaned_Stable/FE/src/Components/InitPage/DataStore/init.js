import { buildJsPayloadJWT, generateTopic, getNonce } from './utils';
import { addTopic, setTopic } from '../../Configuration/managetopic';

export async function CompleteCall(requestId) {
	const http_promise = await getNonce();

	let nonce = '',
		authId = '';

	if (http_promise === undefined) {
		console.error('Nonce route failed...');
	} else {
		nonce = http_promise.nonce;
		authId = http_promise.authorizationId;
	}

	const topic = await generateTopic();
	await setTopic(topic);
	await addTopic();

	let payload = buildJsPayloadJWT(topic, nonce, authId, requestId);

	return payload;
}
