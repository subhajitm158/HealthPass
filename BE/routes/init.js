const express = require('express');
const router = express.Router();
const utils = require('../resources/utils');
const TopicRepository = require('../resources/topic');
const repository = new TopicRepository();

var JSONbig = require('json-bigint');

router.get('/', async (req, res) => {
	try {
		completeCall(res);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

async function completeCall(res) {
	try {
		let http_promise = utils.getNonce();
		let response_body = await http_promise;
		var parsedJson = JSONbig.parse(response_body);
		var nonce = parsedJson.nonce.toString();
		var authId = parsedJson.authorizationId;

		var topic = utils.generateTopic();
		repository.addTopic(topic);

		let payload = '';
		payload = utils.buildJsPayloadJWT(topic, nonce, authId);

		//var jwt_token = jwt.createJWT(nonce, authId, topic)
		//var short_topic = utils.generateTopic()
		//repository.addCustomTopic(short_topic, jwt_token)
		//var short_url = config.host + "/short/" + short_topic
		//console.log(short_url)
		//payload = utils.buildJsPayloadJWTShort(topic, short_url);

		res.send(JSON.stringify(payload));
	} catch (error) {
		// Promise rejected
		res.status(500);
		// Cambialo
		res.send('Error');
		console.log(error);
	}
}

module.exports = router;
