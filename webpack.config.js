module.exports = {
	context: __dirname + '/public/js',
	entry: './src/app.js',
	output: {
		filename: 'bundle.js',
		path: './public/js'
	}
};