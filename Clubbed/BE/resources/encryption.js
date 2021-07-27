const key = require('../../src/Components/Encryption/data.json');

exports.EncryptDataBE = function (data) {
	let encryptedData = '';
	for (var i = 0; i < data.length; i++) {
		let char = data.charAt(i);
		encryptedData += key.encryptionData[char];
		encryptedData += '|';
	}

	return encryptedData;
};
