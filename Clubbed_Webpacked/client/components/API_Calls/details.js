import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import config from '../Configuration/config.json';

export async function CallDetailsLoginApi() {
	return axios
		.post(config['login-route'])
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
		});
}

export async function CallDetailsQRApi(auth_token) {
	return axios
		.post(config['qr-route'], {
			token: auth_token.access_token,
			token_type: auth_token.token_type,
		})
		.then(function (response) {
			return response.data;
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
