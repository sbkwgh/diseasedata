function $() {
	var parentEl, queryString;
	
	if(typeof arguments[0] === 'object') {
		parentEl = arguments[0];
		queryString = arguments[1];
	} else {
		parentEl = document;
		queryString = arguments[0];
	}

	return parentEl.querySelector(queryString);
}

if(module && module.exports) {
	module.exports = $;
}