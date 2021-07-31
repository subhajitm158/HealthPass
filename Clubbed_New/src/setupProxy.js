const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./Components/Configuration/config.json');

module.exports = function (app) {
	app.use(
		config['login-route'],
		createProxyMiddleware({
			target: config['api'],
			secure: false,
			changeOrigin: true,
		})
	);

	app.use(
		config['qr-route'] + '?output=qrcode',
		createProxyMiddleware({
			target: config['api'],
			secure: false,
			changeOrigin: true,
		})
	);

	app.use(
		config['init-route'],
		createProxyMiddleware({
			target: `${process.env.REACT_APP_BE_URL}:${process.env.REACT_APP_BE_PORT}`,
			changeOrigin: true,
		})
	);

	app.use(
		config['details-route'],
		createProxyMiddleware({
			target: `${process.env.REACT_APP_BE_URL}:${process.env.REACT_APP_BE_PORT}`,
			changeOrigin: true,
		})
	);
};
