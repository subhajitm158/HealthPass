import QRCode from 'qrcode';
import config from '../Configuration/config.json';
import jwt from 'jsonwebtoken';

export async function CallInitApi() {
	// return fetch(config['init-route'])
	return fetch('/be/poll')
		.then((res) => res.json())
		.then((data) => {
			return data;
		});
}

export async function generateQR(data) {
	try {
		const imageUrl = await QRCode.toDataURL(data);
		return imageUrl;
	} catch (error) {
		console.error(error);
	}
}

export async function decodeJWT(data) {
	try {
		let dataDec = jwt.verify(data, config['jwtKey'], {
			algorithm: 'HS256',
		});
		return JSON.stringify(dataDec);
	} catch (err) {
		console.error(err);
	}
}
