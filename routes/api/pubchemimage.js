var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var wikipedia = require("node-wikipedia");

router.get('/:chemical', function (req, res) {
	wikipedia.page.data(req.params.chemical, { content: true }, function(response) {
		if(!response) {
			res.json({
				url: null
			});
		}

		var html = response.text['*'];
		var $ = cheerio.load(html);
		var ncbi = 
			$('span[title="pubchem.ncbi.nlm.nih.gov"] a').text() ||
			$('span[title="www.nlm.nih.gov"] a').text();
		var ebi =
			$('span[title="www.ebi.ac.uk"] a').text()

		var url;

		if(ncbi.length) {
			url = 
				'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=' + 
				ncbi + 
				'&t=l';
		} else if(ebi.length) {
			url = 'https://www.ebi.ac.uk/chembl/api/data/image/' + ebi;
		} else {
			url = null;
		}

		res.json({
			url: url
		});
		
	});
})

module.exports = router;