import Vue from "vue";
import { mapGetters } from "vuex";
import { scroll } from "quasar";
import { getUserFromToken } from "@utils/authService";
import CryptoJS from "crypto-js";
const { getScrollTarget, setScrollPosition } = scroll;
export default Vue.component("MenuPublico", {
	$validates: 1,
	components: {},
	data() {
		return {
			menu: [
				{
					name: "Areas",
					path: "/",
					icon: "",
					pag: false,
					tag: "/#areas"
				},
				// {name: 'Clientes', path:'/clientes', icon: '', tag: '#clientes'},
				{
					name: "Asesorias",
					path: "/asesorias",
					icon: "",
					pag: true,
					tag: "/asesorias"
				},
				{
					name: "Capacitaciones",
					path: "/capacitaciones",
					icon: "",
					pag: true,
					tag: "/capacitaciones"
				},
				{
					name: "Empleos",
					path: "/empleos",
					pag: true,
					icon: "",
					tag: "/empleos"
				},
				// {
				// 	name: "Practicas laborales",
				// 	path: "/practicas",
				// 	pag: true,
				// 	icon: "",
				// 	tag: "/practicas"
				// },
				{
					name: "Clientes",
					path: "/",
					pag: false,
					icon: "",
					tag: "/#clientes"
				},
				{
					name: "Nosotros",
					path: "/",
					pag: false,
					icon: "",
					tag: "/#nosotros"
				},
				{
					name: "Contacto",
					path: "/Contacto",
					icon: "",
					pag: false,
					tag: "/#contacto"
				}
			],
			link: "",
			ir_home: "",
			src_logo: "../../statics/icono.png",
			scrollPosition: null
		};
	},
	computed: {
		...mapGetters({
			isLogin: "Auth/isLogin",
			isAdmin: "Auth/isAdmin"
		})
	},
	methods: {
		updateScroll() {
			this.scrollPosition = window.scrollY;
		},
		scrollToElement(id, pag) {
			if (!pag) {
				const newID = id.slice(1);
				let el = document.getElementById(newID);
				const target = getScrollTarget(el);
				const offset = el.offsetTop - 65;
				const duration = 0;
				setScrollPosition(target, offset, duration);
			}
		},
		login() {
			this.$router.push("/login");
		},
		irRegistro(){
			this.$router.push("/registry");
		},
		logout() {
			this.$q.loading.show();
			this.$store
				.dispatch("Auth/logout", {})
				.then(res => {
					this.$q.loading.hide();
					this.$router.push("/login");

					// location.reload();
				})
				.catch(err => {
					console.error("ERROR: ", err);
				});
		},
		getDatosUser(datos) {
			this.nombre = datos.nombre;
		},
		irAdmin() {
			var pass = process.env.PASSPHRASE;
			var ruta = localStorage.getItem("path_default");
			ruta = ruta
				? CryptoJS.AES.decrypt(ruta, pass).toString(CryptoJS.enc.Utf8)
				: null;
			if (ruta == null || ruta == "") {
				ruta = "/";
			}
			this.$router.push(ruta);
		}
	},
	created() {
		if (this.isLogin) {
			const token = localStorage.getItem("token");
			const datos = getUserFromToken(token);
			this.getDatosUser(datos.datosUsuario);
		}
	},
	mounted() {
		window.addEventListener("scroll", this.updateScroll);
	},
	updated() {},
	watch: {}
});
