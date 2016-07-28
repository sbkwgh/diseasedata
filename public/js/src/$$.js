function $$() {
	var parentEl, queryString, res;
	
	if(typeof arguments[0] === 'object') {
		console.log(parentEl)
		parentEl = arguments[0];
		queryString = arguments[1];
	} else {
		parentEl = document;
		queryString = arguments[0];
	}

	res = [].map.call(parentEl.querySelectorAll(queryString), function(el) {
		return el;
	});

	return res;
}

if(module && module.exports) {
	module.exports = $$;
}