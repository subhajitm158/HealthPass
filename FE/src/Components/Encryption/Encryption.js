import key from './data';

function EncryptData(data) {
	let encryptedData = '';
	for (var i = 0; i < data.length; i++) {
		let char = data.charAt(i);
		encryptedData += key.encryptionData[char];
		encryptedData += '|';
	}

	return encryptedData;
}

export default EncryptData;
