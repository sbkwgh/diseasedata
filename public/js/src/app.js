var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.filter('removeHTML', function(text) {
	var div = document.createElement('div');
	div.innerHTML = text;

	return div.textContent;
});
Vue.filter('getPubMedId', function(text) {
	return text.split(':')[1];
});

var App = Vue.extend({
	data: function() {
		return {
			ui: {
				showSearchResults: false
			},
			searchQuery: '',
			searchResults: []
		};
	},
	methods: {
		showResults: function() {
			this.ui.showSearchResults = true;
		},
		hideResults: function(ev) {
			if(document.querySelector('#search').contains(ev.target) && !ev.target.matches('#resultsBox .item')) return;

			this.ui.showSearchResults = false;
		},
		search: function() {
			if(!this.searchQuery.trim().length) {
				this.searchResults = [];
				return;
			}

			this.$http
				.get('/api/search/' + this.searchQuery)
				.then(function(res) {
					var results = res.data.results;
					this.searchResults = results;
				}, function(err) {
					console.log(err);
				});
		}
	}
});
var router = new VueRouter();

router.map({
	'/': {
		component: require('./routes/index.js')(Vue)
	},
	'/thing/:name': {
		component: require('./routes/thing.js')(Vue)
	}
});

router.start(App, '#app');