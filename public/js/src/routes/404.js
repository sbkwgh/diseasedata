module.exports = function(Vue) {
	return Vue.extend({
		template: 
			`<div class="center-message">
				<div>404 page not found</div>
				<div class='small' v-on:click='goHome()'>
					Click here to go home.
				</div>
			</div>`,
		methods: {
			goHome: function() {
				this.$router.go('/');
			}
		}
	});
}