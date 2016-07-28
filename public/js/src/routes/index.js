module.exports = function (Vue) {
	return Vue.extend({
		template: require('html!../../../templates/index.html'),
		data: function() {
			return {
				relationships: [],
				gene: '',
				disease: '',
				associatedGenes: [],
				sets: [{name: 'NEK1', value: 'NEK1'}, {name: 'TP53', value: 'TP53'}],
				selectedSet: '...'
			};
		},
		methods: {
			getJSON: function(transition) {
				if(!this.$route.query.set)  {
					this.relationships = [];
					this.associatedGenes = [];

					transition.next();
				}

				this.$http
					.get('/api/data?set=' + this.$route.query.set)
					.then(function(res) {
						var results;
						var duplicates = [];
						var self = this;

						if(res.data && !res.data.error) {
							results = 
								res.data
									.map(function(collection) {
										return collection.map(function(item, index, array) {
											if(item.sentence_text) {
												var text = item.sentence_text;
												var div = document.createElement('div');
												
												div.innerHTML = text;
												text = div.textContent;

												var prev = array[index-1];
												var next = array[index+1];

												if(prev && prev.symbol) {
													text = text.replace(new RegExp('(' + prev.symbol + ')', 'gi'), '<b class="wiki-click">$1</b>');
												}
												if(next && next.symbol) {
													text = text.replace(new RegExp('(' + next.symbol + ')', 'gi'), '<b class="wiki-click">$1</b>');
												}

												item.sentence_text = text;
											}

											if(index === 2 && item.symbol) {
												self.associatedGenes.push(item.symbol);
											}

											return item;
										});
									})
							this.relationships = results;
							this.gene = res.data[0][0].symbol;
							this.disease = res.data[0].slice(-1)[0].name;

							transition.next();
						}
					}, function(err) {

					});
			},
			select: function(set) {
				this.$router.go('/?set=' + this.selectedSet);
			}
		},
		route: {
			data: function(transition) {
				this.getJSON(transition);
			}
		},
		ready: function() {
			var self = this;

			document.body.addEventListener('click', function(ev) {
				if(ev.target.classList.contains('wiki-click')) {
					self.$router.go('/thing/' + ev.target.innerHTML);
				}
			});
		}
	})
};
















