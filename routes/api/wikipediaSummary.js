var express = require('express');
var router = express.Router();
var http = require('follow-redirects').http;

router.get('/:page', function(req, res) {
	var page = req.params.page;

	http.get({
		host: 'en.wikipedia.org',
		path: 
			'/w/api.php?action=query&format=json&prop=extracts&titles=' +
			encodeURIComponent(page) +
			'&redirects=1&exintro=1',
		headers: {
			'User-Agent': 'GetWikipediaSummary bot'
		}
	},
	function(httpRes) {
		var data = '';

		httpRes.on('data', function(chunk) {
			data += chunk;
		});
		httpRes.on('end', function() {
			try {
				var JSONResult = JSON.parse(data);
			} catch(e) {
				res.json({html: null});
				return;
			}
			
			var html = JSONResult.query.pages[Object.keys(JSONResult.query.pages)[0]].extract

			res.json({html: html || null});
		});
	}
	).on('error', function(err) {
		res.json({error: err})
	});
})

module.exports = router;