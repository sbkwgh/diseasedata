var express = require('express');
var router = express.Router();
var fs = require('fs');

var data = JSON.parse(fs.readFileSync(__dirname + '/processedData.json'));

router.get('/', function (req, res) {
	if(['NEK1', 'TP53'].indexOf(req.query.set) === -1) {
		res.json({
			error: 'No such data set availible'
		});
	} else {
		res.json(data[req.query.set]);
	}
	
});

module.exports = router;