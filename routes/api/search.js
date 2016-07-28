var express = require('express');
var router = express.Router();

var http = require('http');

router.get('/:searchTerm', function(req, res) {
	http.get(
		'http://marathon.stratified:31085/api/entity/search?queryString=' + req.params.searchTerm,
		function(httpRes) {
			var data = [];

			httpRes.on('data', function(chunk) {
				data.push(chunk);
			});
			httpRes.on('end', function() {
				res.json({
					results: JSON.parse(data.join(''))
				});
			});
		}
	);

});

module.exports = router;