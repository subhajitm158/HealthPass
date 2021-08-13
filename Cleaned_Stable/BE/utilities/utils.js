const needle = require('needle');

/**
 *
 * @param {*} url
 * @param {*} data
 * @param {*} options
 * @returns
 */
const postCall = async (url, data, options) => {
	const response = await needle('post', url, data, options);
	return response;
};

const checkStatusCode = (codeArr, statusCode, level, details) => {
	try {
		if (codeArr.indexOf(statusCode) === -1) {
			return errMsg;
		}
		return -1;
	} catch (err) {
		console.log('[utils] :: checkStatusCodeError', err.message || err);
		throw { message: err.message || 'check status code failed' };
	}
};

const throwError = (level = '', reason = '', details = {}) => {
	throw {
		status: 'NOT OK',
		level,
		reason,
		details,
	};
};

module.exports = {
	postCall,
	checkStatusCode,
	throwError,
};
