import { buildJsPayloadJWT, generateTopic, getNonce } from './utils';
import TopicRepository from '../../Configuration/topic';
import { addTopic, getTopic, setTopic } from '../../Configuration/managetopic';
const repository = new TopicRepository();

export async function CompleteCall() {
	const http_promise = await getNonce();

	const nonce = http_promise.nonce;
	const authId = http_promise.authorizationId;

	const topic = await generateTopic();
	await setTopic(topic);
	await addTopic();

	let payload = buildJsPayloadJWT(topic, nonce, authId);
	return payload;
}
