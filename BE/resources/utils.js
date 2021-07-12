var fs = require('fs');
var cheerio = require('cheerio');
var crypto = require('crypto');
const https = require('https');
const config = require('../configuration/config.json');
const jwt = require('./jwt.js');
const data = require('../configuration/data.json');

function generateTraceId() {
	var id =
		'00-' +
		crypto.randomBytes(16).toString('hex') +
		'-' +
		crypto.randomBytes(8).toString('hex') +
		'-01';
	return id;
}

exports.buildJsPayloadJWT = function (topic, nonce, authId) {
	// var html = fs.readFileSync(__dirname + '/index.html', 'utf8');
	// var $ = cheerio.load(html);
	var jwt_token = jwt.createJWT(nonce, authId, topic);
	// var js = `<script type="text/javascript">
	// let dom = document.getElementById('qrcanvas');
	// let deeplink = document.getElementById('deeplink');
	// startListening("${config.pollEndpoint}?topic=${topic}");
	// generateQRCodeJWT(dom, "${jwt_token}")
	// </script>`;

	// $('body').append(js);

	// return $.html();

	return jwt_token;
};

exports.generateTopic = () => {
	var text = '';
	var possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < 10; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
};

exports.getNonce = function () {
	var trace_id = generateTraceId();
	var options = {
		host: config.gclUrl,
		port: 443,
		path: '/nonce',
		headers: {
			traceparent: trace_id,
		},
	};
	return new Promise((resolve, reject) => {
		https.get(options, (response) => {
			let chunks_of_data = [];

			// Check status code handle
			response.on('data', (fragments) => {
				chunks_of_data.push(fragments);
			});

			response.on('end', () => {
				let response_body = Buffer.concat(chunks_of_data);
				resolve(response_body.toString());
			});

			response.on('error', (error) => {
				reject(error);
			});
		});
	});
};

exports.getUserDetails = (token) => {
	let extraPayload = jwt.decodeJWT(token);

	let newData = data;
	let isPresent = false;
	for (let i = 0; i < newData.length; i++) {
		let index = newData[i];
		if (index.name == 'extraPayload') isPresent = true;
	}
	if (!isPresent) newData.push({ name: 'extraPayload', extraPayload });

	let payload = jwt.createJWTDetails(newData);

	return payload;
};
