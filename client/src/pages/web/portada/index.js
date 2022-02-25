import Vue from 'vue'
import { mapGetters } from 'vuex'
import {scroll} from 'quasar'
const {getScrollTarget, setScrollPosition} = scroll
export default Vue.component("Portada", {
	$validates: 1,
	components: {
		// Historia:() => import('../historia/index.vue')
	},
	data() {
		return {
			src_fondo: "statics/img/inicio.png",
			src_fondo_mobile: "statics/img/inicio_mobile.png",
			src_logo: "statics/img/logo-clean.png"
		};
	},
	computed: {
		...mapGetters({
			isLogin: "Auth/isLogin",
			isAdmin: "Auth/isAdmin",
			total: "Usuario/getNUsuarios"
		})
	},
	methods: {
		async iniciar() {
			this.$q.loading.show();
			await this.$store
				.dispatch("Usuario/contarUsuarios")
				.then(res => {
					this.$q.loading.hide();
					if (this.error) {
						var message = this.error.message.replace(
							"GraphQL error: ",
							""
						);
						this.$q.notify({
							message: message,
							timeout: 3000,
							type: "negative", // Available values: 'positive', 'negative', 'warning', 'info'
							position: "bottom",
							icon: "report_problem"
						});
					} else {
						console.log("total", this.total);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		scrollToElement(id) {
			let el = document.getElementById(id);
			const target = getScrollTarget(el);
			const offset = el.offsetTop - 0;
			const duration = 150;
			setScrollPosition(target, offset, duration);
		}
	},
	created() {
		this.iniciar()
	},
	mounted() {},
	updated() {},
	watch: {}
});
