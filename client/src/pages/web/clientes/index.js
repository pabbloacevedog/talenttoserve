import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.component("Clientes", {
	$validates: 1,
	components: {
		// tabla:() => import('./tabla/tabla.vue')
	},
	data() {
		return {
			src_fondo: "statics/img/1.jpg",
			url: "https://placeimg.com/500/300/nature",
			transitions: [
				"slide-right",
				"slide-left",
				"slide-up",
				"slide-down",
				"fade",
				"scale",
				"rotate",
				"flip-right",
				"flip-left",
				"flip-up",
				"flip-down",
				"jump-right",
				"jump-left",
				"jump-up",
				"jump-down"
			]
		};
	},
	computed: {
		...mapGetters({
			isLogin: "Auth/isLogin",
			isAdmin: "Auth/isAdmin"
		})
	},
	methods: {
		trigger() {
			this.url = "https://placeimg.com/500/300/nature?t=" + Math.random();
		}
	},
	created() {
		console.log("en compontente");
	},
	mounted() {},
	updated() {},
	watch: {}
});
