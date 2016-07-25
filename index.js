var express = require('express');
var app = express();

app.get('*', function(req, res) {
	res.send('Test');
});

app.listen(process.env.PORT || 3000, function() {
	console.log(`Listening on port ${process.env.PORT || 3000}.`);
});