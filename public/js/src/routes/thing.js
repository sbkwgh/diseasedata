module.exports = function (Vue) {
	return Vue.extend({
		template: require('html!../../../templates/thing.html'),
		data: function() {
			return {
				html: 'Loading...',
				image: ''
			};
		},
		methods: {
			getJSON: function() {
				var removedLastComma = this.$route.params.name.split(',').slice(0,-1).join(',');

				this.$http
					.get('/api/wikipediaSummary/' + (removedLastComma || this.$route.params.name))
					.then(function(res) {
						if(res.data && res.data.html) {
							this.html = res.data.html;
						} else if(res.data && res.data.html===null) {
							this.html = 'Nothing found for this.'
						}
					}, function(err) {

					});
				this.$http
					.get('/api/pubchemimage/' + this.$route.params.name)
					.then(function(res){
						if(res.data && res.data.url) {
							this.image = res.data.url;
						}
					}, function(err) {

					});
			}
		},
		ready: function() {
			this.getJSON();
		}
	})
}