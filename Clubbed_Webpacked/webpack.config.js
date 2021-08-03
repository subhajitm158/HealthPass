//webpack.config.js
var path = require('path');
var webpack = require('webpack');
var config = require('./client/components/Configuration/config.json');

module.exports = {
	entry: ['babel-polyfill', './client/index.js'],
	output: {
		path: path.join(__dirname, 'client'),
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		historyApiFallback: true,
		proxy: {
			[config['login-route']]: {
				changeOrigin: true,
				cookieDomainRewrite: 'localhost',
				secure: false,
				target: config['api'],
				pathRewrite: { '^/users/login': '' },
				onProxyReq: (proxyReq) => {
					if (proxyReq.getHeader('origin')) {
						proxyReq.setHeader('origin', config['api']);
					}
				},
			},
		},
	},
	plugins: [
		new webpack.ProvidePlugin({
			'React': 'react',
		}),
	],
	module: {
		rules: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['env', 'react'],
				},
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
			},
			{
				test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
				loader: 'url-loader',
			},
		],
	},
};
