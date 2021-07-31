import QRCode from 'qrcode';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from '../Configuration/config.json';

export async function CallDetailsApi() {
	return axios
		.get(config['details-route'], {
			headers: {
				'x-token-auth': sessionStorage.getItem('session'),
			},
		})
		.then((response) => {
			return response;
		})
		.catch(function (error) {
			console.log(error);
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
		const decodedPayload = await decodeJWT(data);
		return (
			decodedPayload.payload.credentialSubject.recipient.givenName +
			' ' +
			decodedPayload.payload.credentialSubject.recipient.middleName +
			' ' +
			decodedPayload.payload.credentialSubject.recipient.familyName
		);
	} catch (err) {
		console.error(err);
	}
}

export async function GetDateofBirth(data) {
	try {
		const decodedPayload = await decodeJWT(data);
		return decodedPayload.payload.credentialSubject.recipient.birthDate;
	} catch (err) {
		console.error(err);
	}
}

export async function GetPassExpirationDate(data) {
	try {
		const decodedPayload = await decodeJWT(data);
		return decodedPayload.payload.expirationDate;
	} catch (err) {
		console.error(err);
	}
}
