const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./Components/Configuration/config.json');

module.exports = function (app) {
	app.use(
		config['login-route'],
		createProxyMiddleware({
			target: config['api'],
			secure: false,
			changeOrigin: true,
		}),
	);

	app.use(
		config['qr-route'],
		createProxyMiddleware({
			target: config['api'],
			secure: false,
			changeOrigin: true,
		}),
	);

	app.use(
		config['nonce-route'],
		createProxyMiddleware({
			target: config['gclUrl'],
			secure: false,
			changeOrigin: true,
		}),
	);
};
