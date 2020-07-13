const path = require('path');

module.exports = {
	entry: './src/react_fake_export.js',
	module: {
		
	},
	resolve: {
		
	},
	output: {
		path: path.resolve(__dirname, 'dist/'),
		publicPath: '',
		filename: 'reack_fake.js',
		libraryTarget: 'umd',
	},
};
