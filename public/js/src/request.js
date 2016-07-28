var Request = {};

Request.useJSON = false;

Request.serializeData = function(object) {
	var temp = '';
	var serializedString = '';
	for(var key in object) {
		if(object[key] === undefined) continue;
		if(typeof object[key] === 'object') {
			temp = '&' + key + '=' + encodeURIComponent(JSON.stringify(object[key]));
		} else {
			temp = '&' + key + '=' + encodeURIComponent(object[key]);
		}
		serializedString += temp;
	}
	return serializedString.slice(1);
};

Request.request = function(method, url, data, cb) {
	var http = new XMLHttpRequest();

	http.addEventListener('load', function() {
		var JSONResult;

		try {
			JSONResult = JSON.parse(this.responseText)
		} catch(err) {
			console.log(err);
			console.log(this.responseText);
		}

		if(cb) {
			cb(JSONResult);
		} else {
			data(JSONResult);
		}
	})

	http.open(method, url, true);

	if(typeof data !== 'function') {

		if(this.useJSON) {
			http.setRequestHeader('Content-type', 'application/json');
			http.send(JSON.stringify(data));
		} else {
			http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			http.send(this.serializeData(data));
		}	

	} else {
		http.send();
	}
}
Request.post = function(url, data, cb) {
	this.request('post', url, data, cb);
};
Request.delete = function(url, data, cb) {
	this.request('delete', url, data, cb);
};
Request.put = function(url, data, cb) {
	this.request('put', url, data, cb);
};
Request.get = function(url, data, cb) {
	var http = new XMLHttpRequest();

	http.addEventListener('load', function() {
		var JSONResult;

		try {
			JSONResult = JSON.parse(this.responseText)
		} catch(err) {
			console.log(err);
			console.log(this.responseText);
		}

		if(cb) {
			cb(JSONResult);
		} else if(typeof data === 'function') {
			data(JSONResult);
		}
	})

	if(typeof data !== 'function') {
		http.open('GET', url + '/?' + this.serializeData(data || {}), true);
	} else {
		http.open('GET', url, true);
	}
	
	http.send();
};

if(module && module.exports) {
	module.exports = Request;
}