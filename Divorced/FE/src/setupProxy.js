const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		process.env.REACT_APP_LOGIN_ROUTE,
		createProxyMiddleware({
			target:
				process.env.REACT_APP_BE_URL + ':' + process.env.REACT_APP_BE_PORT,
			secure: false,
			changeOrigin: true,
		}),
	);

	app.use(
		process.env.REACT_APP_DATA_ROUTE,
		createProxyMiddleware({
			target:
				process.env.REACT_APP_BE_URL + ':' + process.env.REACT_APP_BE_PORT,
			secure: false,
			changeOrigin: true,
		}),
	);

	app.use(
		process.env.REACT_APP_NONCE_ROUTE,
		createProxyMiddleware({
			target:
				process.env.REACT_APP_BE_URL + ':' + process.env.REACT_APP_BE_PORT,
			secure: false,
			changeOrigin: true,
		}),
	);
};
