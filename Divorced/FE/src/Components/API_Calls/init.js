import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';

export async function CallInitPoll() {
	return fetch(process.env.REACT_APP_POLL_ROUTE)
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
		let dataDec = jwt.verify(data, process.env.REACT_APP_JWT_KEY, {
			algorithm: 'HS256',
		});
		return JSON.stringify(dataDec);
	} catch (err) {
		console.error(err);
	}
}
