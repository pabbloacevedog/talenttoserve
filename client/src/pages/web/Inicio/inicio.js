import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.component("Inicio", {
	$validates: 1,
	components: {
		Portada: () => import("../portada/index.vue"),
		Historia: () => import("../historia/index.vue"),
		Sobrenosotros: () => import("../sobrenosotros/index.vue"),
		Areas: () => import("../areas/index.vue"),
		Nosotros: () => import("../nosotros/index.vue"),
		Clientes: () => import("../clientes/index.vue"),
		Contacto: () => import("../contacto/index.vue")
	},
	data() {
		return {
			src_fondo: "statics/img/inicio.png"
		};
	},
	computed: {
		...mapGetters({
			isLogin: "Auth/isLogin",
			isAdmin: "Auth/isAdmin"
		})
	},
	methods: {},
	created() {
		console.log("en compontente");
	},
	mounted() {},
	updated() {},
	watch: {}
});
