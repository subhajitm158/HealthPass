import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';
import config from '../Configuration/config.json';
import body from './body.json';

export async function CallDetailsLoginApi() {
	return fetch(config['login-route'], {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: config['MY_EMAIL'],
			password: config['MY_PASSWORD'],
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			return data;
		});
}

export async function CallDetailsQRApi(auth_token) {
	return fetch(config['qr-route'] + '?type=', {
		// return fetch(config['qr-route'] + '?output=qrcode', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-hpass-issuer-id': config['x-hpass-issuer-id'],
			Authorization: auth_token.token_type + ' ' + auth_token.access_token,
		},
		body: JSON.stringify(body),
	})
		.then((res) => res.json())
		.then((data) => {
			return data;
		});
}

export async function generateQR(data) {
	try {
		var segs = [
			{
				data,
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
		let dataDec = jwt.verify(data, config['jwtKey'], {
			algorithm: 'HS256',
		});
		return dataDec;
	} catch (err) {
		console.error(err);
	}
}

export async function GetName(data) {
	try {
		return (
			data.payload.credentialSubject.recipient.givenName +
			' ' +
			data.payload.credentialSubject.recipient.middleName +
			' ' +
			data.payload.credentialSubject.recipient.familyName
		);
	} catch (err) {
		console.error(err);
	}
}

export async function GetDateofBirth(data) {
	try {
		return data.payload.credentialSubject.recipient.birthDate;
	} catch (err) {
		console.error(err);
	}
}

export async function GetPassExpirationDate(data) {
	try {
		return data.payload.expirationDate;
	} catch (err) {
		console.error(err);
	}
}
