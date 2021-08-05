import { buildJsPayloadJWT, generateTopic, getNonce } from './utils';
import { addTopic, setTopic } from '../../Configuration/managetopic';

// export async function CompleteCall(requestId) {
export async function CompleteCall() {
	// const http_promise = 12376186318632871682736;
	const http_promise = await getNonce();

	const nonce = http_promise.nonce;
	const authId = http_promise.authorizationId;

	const topic = await generateTopic();
	await setTopic(topic);
	await addTopic();

	// let payload = buildJsPayloadJWT(topic, nonce, authId, requestId);
	let payload = buildJsPayloadJWT(topic, nonce, authId);
	return payload;
}
