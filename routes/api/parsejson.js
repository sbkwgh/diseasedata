console.time('\nSuccess');

var fs = require('fs');
var JSONStream = require('JSONStream');

var sets = fs
	.readdirSync('sets')
	.map(item => item.split('.')[0])
	.filter(item => item.length);

var duplicates = {};
var processedData = {};

function processData(data, set) {
	var secondColumn = data[1];
	var thirdColumn = data[2];

	if(!processedData[set]) {
		processedData[set] = [];
		duplicates[set] = [];
	}

	if(thirdColumn.symbol && duplicates[set].indexOf(thirdColumn.symbol) === -1) {
		duplicates[set].push(thirdColumn.symbol);

		processedData[set].push(data);
	} else if(thirdColumn.pref_name && duplicates[set].indexOf(thirdColumn.pref_name) === -1) {
		duplicates[set].push(thirdColumn.pref_name);

		processedData[set].push(data);
	} else if(secondColumn.sentence_text && !data[3] && duplicates[set].indexOf(secondColumn.sentence_text) === -1) {
		duplicates[set].push(secondColumn.sentence_text);

		processedData[set].push(data);
	}
}

var saveToFileCount = 0;
function saveToFile(set) {
	saveToFileCount++;
	console.timeEnd('Processed ' + set);

	if(saveToFileCount === sets.length) {
		fs.writeFile(__dirname + '/processedData.json', JSON.stringify(processedData), function(err) {
			if(err) throw err;
			else console.timeEnd('\nSuccess');
		});
	}
}

sets.forEach(function(set) {
	console.time('Processed ' + set);
	fs
		.createReadStream(__dirname + '/sets/' + set + '.json')
		.pipe(JSONStream.parse('data.*.row.0'))
		.on('data', function(data) {
			processData(data, set);
		})
		.on('end', function() {
			saveToFile(set);
		});
});