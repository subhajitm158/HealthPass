const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/be/api',
		createProxyMiddleware({
			target: `${process.env.REACT_APP_BE_URL}:${process.env.REACT_APP_BE_PORT}`,
			changeOrigin: true,
		}),
	);

	app.use(
		'/be/api/details',
		createProxyMiddleware({
			target: `${process.env.REACT_APP_BE_URL}:${process.env.REACT_APP_BE_PORT}`,
			changeOrigin: true,
		}),
	);
};
