const faker = require('faker');
const body = require('../data/body.json');
const medicinalProductMap = new Map();
medicinalProductMap
	.set(0, 'Comirnaty:EU/1/20/1528:208:PFizer-Biontech')
	.set(1, 'Covaxin:EU/1/20/1518:209:Amgen')
	.set(2, 'Covishield:EU/1/20/1535:210:Cipla');

const fetchMedicinalProductDetails = () => {
	let medicine = medicinalProductMap.get(generateRandomNumberBetween(0, 2)).split(':');
	return {
		medicinalProductName: medicine[0],
		medicinalProductCode: medicine[1],
		vaccineType: medicine[2],
		marketingAuthorizationHolder: medicine[3],
	};
};

const randomizeCredentialSubject = (dataToSet, staticData) => {
	try {
		const randomNumGender = generateRandomNumberBetween(0, 1);
		const credentialSubject = {
			schemaID: staticData.schemaID,
			type: staticData.type,
			data: {
				type: staticData?.data?.type || 'Vaccination Card',
				display: staticData?.data?.display || '#32CD32',
				recipient: {
					givenName: dataToSet?.firstName || faker.name.firstName(randomNumGender),
					middleName: dataToSet?.firstName ? ' ' : faker.name.middleName(randomNumGender),
					familyName: dataToSet?.lastName || faker.name.lastName(randomNumGender),
					birthDate: '2000-10-10', //TODO: fake it
				},
				disease: staticData?.data?.disease || 'COVID-19',
				...fetchMedicinalProductDetails(),
				dateOfVaccination: '2020-12-30',
				doseNumber: generateRandomNumberBetween(1, 2),
				dosesPerCycle: generateRandomNumberBetween(1, 2),
				batchNumber: generateRandomBatch(),
				stateOfVaccination: faker.address.stateAbbr(),
				countryOfVaccination: faker.address.countryCode(),
			},
			expirationDate: '2021-12-31T00:00:00Z',
		};

		return credentialSubject;
	} catch (err) {
		console.log('[utils] :: randomizeCredentialSubjectError', err.message || err);
		return data;
	}
};

/**
 *
 * @param {*} min
 * @param {*} max
 */
function generateRandomNumberBetween(min = 0, max = 9) {
	return Math.round(Math.random() * (max - min) + min);
}

function generateRandomBatch() {
	let batch = '';
	for (let i = 0; i < 5; i++) {
		batch += generateRandomNumberBetween(1, 9).toString();
	}
	return batch;
}

module.exports = { randomizeCredentialSubject };
