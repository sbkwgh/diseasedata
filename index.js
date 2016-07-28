var express = require('express');
var app = express();

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.use('/api/search', require('./routes/api/search.js'));
app.use('/api/pubchemimage', require('./routes/api/pubchemimage.js'));
app.use('/api/data', require('./routes/api/data.js'));
app.use('/api/wikipediaSummary', require('./routes/api/wikipediaSummary.js'));

app.listen(process.env.PORT || 3000, function() {
	console.log(`Listening on port ${process.env.PORT || 3000}.`);
});