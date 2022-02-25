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
			],
			items: [
				{
					src: "statics/clientes/atix.png",
					nombre: "ATIX HOTEL"
				},
				{
					src: "statics/clientes/casadoca.png",
					nombre: "CASADOCA"
				},
				{
					src: "statics/clientes/castillo_rojo.png",
					nombre: "CASTILLO ROJO"
				},
				{
					src: "statics/clientes/don_luis.png",
					nombre: "DON LUIS"
				},
				{
					src: "statics/clientes/gp.png",
					nombre: "GP"
				},
				{
					src: "statics/clientes/hp.png",
					nombre: "HP"
				},
				{
					src: "statics/clientes/icon.jpg",
					nombre: "ICON"
				},
				{
					src: "statics/clientes/taka.png",
					nombre: "TAKA"
				},
				{
					src: "statics/clientes/terral",
					nombre: "TERRAL"
				}
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
