import QRCode from 'qrcode';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from '../Configuration/config.json';

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
	return fetch(config['qr-route'] + '?output=qrcode', {
		method: 'POST',
		params: {
			output: 'qrcode',
		},
		headers: {
			'Content-Type': 'application/json',
			'x-hpass-issuer-id': config['x-hpass-issuer-id'],
			Authorization: auth_token,
		},
		body: JSON.stringify({
			schemaID:
				'did:hpass:19b0cf0d5fc7017dd66ddd2374fbd9b796d988aced083d709abbaa0f7480b474:c4d1492e81bfcb951d028c0a4bd3c1edec16d32aed77a608c76ed917f3231f7e;id=ghp-vaccination-credential;version=0.4',
			type: ['VerifiableCredential', 'GoodHealthPass', 'VaccinationCredential'],
			data: {
				type: 'Vaccination Card',
				display: '#32CD32',
				recipient: {
					givenName: 'Jane',
					middleName: 'Sarah',
					familyName: 'Smith',
					birthDate: '2000-10-10',
				},
				disease: 'COVID-19',
				medicinalProductName: 'Comirnaty',
				medicinalProductCode: 'EU/1/20/1528',
				vaccineType: '208',
				marketingAuthorizationHolder: 'PFizer-Biontech',
				dateOfVaccination: '2020-12-30',
				doseNumber: 2,
				dosesPerCycle: 2,
				batchNumber: '12345',
				stateOfVaccination: 'ca',
				countryOfVaccination: 'us',
			},
			expirationDate: '2021-12-31T00:00:00Z',
		}),
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
