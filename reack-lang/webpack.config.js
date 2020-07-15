
const path = require('path');

module.exports = {
	entry: './src/react_lang_export.js',
	module: {
		
	},
	resolve: {
		
	},
	output: {
		path: path.resolve(__dirname, 'dist/'),
		publicPath: '',
		filename: 'reack_lang.js',
		libraryTarget: 'umd',
	},
};
