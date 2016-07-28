var express = require('express');
var router = express.Router();
var fs = require('fs');

var data = JSON.parse(fs.readFileSync(__dirname + '/processedData.json'));
var sets = fs.readdirSync(__dirname + '/sets').map(item => item.split('.')[0]);

router.get('/', function (req, res) {
	if(sets.indexOf(req.query.set) === -1) {
		res.json({
			error: 'No such data set availible'
		});
	} else {
		res.json(data[req.query.set]);
	}
	
});

module.exports = router;