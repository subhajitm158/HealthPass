import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export async function CallDetailsDemoApi(requestId) {
	try {
		const response = await axios.post(
			process.env.REACT_APP_BE_URL +
				process.env.REACT_APP_DEMO_ROUTE +
				'?requestId=' +
				requestId,
			{
				demo: true,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return response.data.payload;
	} catch (err) {
		console.error('CallDestailsDemoApiError ->', err.message || err);
	}
}

export async function generateQR(data) {
	try {
		var segs = [
			{
				data: JSON.stringify(data),
				mode: 'byte',
			},
		];
		const imageUrl = await QRCode.toDataURL(segs, {
			errorCorrectionLevel: 'L',
		});
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
		return dataDec;
	} catch (err) {
		console.error(err);
	}
}

export async function encodeJWT(data) {
	try {
		let dataDec = jwt.sign(
			JSON.stringify(data),
			process.env.REACT_APP_JWT_KEY,
			{
				algorithm: 'HS256',
			},
		);
		return dataDec;
	} catch (err) {
		console.error(err);
	}
}

export async function GetName(data) {
	try {
		return (
			data.credentialSubject.recipient.givenName +
			' ' +
			data.credentialSubject.recipient.middleName +
			' ' +
			data.credentialSubject.recipient.familyName
		);
	} catch (err) {
		console.error(err);
	}
}

export async function GetDateofBirth(data) {
	try {
		return data.credentialSubject.recipient.birthDate;
	} catch (err) {
		console.error(err);
	}
}

export async function GetPassExpirationDate(data) {
	try {
		return data.expirationDate;
	} catch (err) {
		console.error(err);
	}
}
