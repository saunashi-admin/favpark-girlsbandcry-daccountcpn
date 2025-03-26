webpack = require('webpack');
module.exports = {
	mode: 'development',
	devtool: 'source-map',
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	],
	entry: './src/js/main.js',
	output: {
		path: __dirname + '/dist/assets/js/',
		filename: 'main.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
							],
						},
					},
				],
			},
		],
	},
	target: ['web', 'es5'],
};
