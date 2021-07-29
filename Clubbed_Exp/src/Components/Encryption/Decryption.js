import key from './data';

function DecryptData(data) {
	let decryptedData = '';
	let array = data.split('|');
	for (var i = 0; i < array.length; i++) {
		let char = array[i];
		if (char !== '') decryptedData += key.DecryptionData[char];
	}

	return decryptedData;
}

export default DecryptData;
