const jwt = require('jsonwebtoken');
const config = require('../configuration/config.json');

var signOptions = {
	algorithm: 'HS256',
};

exports.createJWT = function (nonce, authId, topic) {
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
		gclLoginUrl: config.GCLLoginUrl,
		returnUrl: config.returnUrl,
		topic: topic,
	};
	var token = jwt.sign(
		JSON.stringify(payload),
		Buffer.from(config.jwtKey),
		signOptions
	);
	return token;
};

exports.createJWTDetails = (data) => {
	var token = jwt.sign(
		JSON.stringify(data),
		Buffer.from(config.jwtKey),
		signOptions
	);

	return token;
};

exports.decodeJWT = (token) => {
	var decodedData = jwt.verify(token, Buffer.from(config.jwtKey), signOptions);

	return decodedData;
};
