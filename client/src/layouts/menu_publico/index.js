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
				// {
				// 	name: "Home",
				// 	path: "/",
				// 	icon: "fas fa-home",
				// 	pag: false,
				// 	tag: "/"
				// },
				{
					name: "Areas",
					path: "/",
					icon: "fas fa-globe-africa",
					pag: false,
					tag: "/#areas"
				},
				// {name: 'Clientes', path:'/clientes', icon: '', tag: '#clientes'},
				{
					name: "Asesorias",
					path: "/asesorias",
					icon: "fas fa-chart-line",
					pag: true,
					tag: "/asesorias"
				},
				{
					name: "Capacitaciones",
					path: "/capacitaciones",
					icon: "fas fa-chalkboard-teacher",
					pag: true,
					tag: "/capacitaciones"
				},
				{
					name: "Empleos",
					path: "/empleos",
					pag: true,
					icon: "fas fa-briefcase",
					tag: "/empleos"
				},
				{
					name: "Proveedores",
					path: "/Proveedores",
					pag: true,
					icon: "",
					tag: "/Proveedores"
				},
				{
					name: "Clientes",
					path: "/",
					pag: false,
					icon: "fas fa-ad",
					tag: "/#clientes"
				},
				{
					name: "Nosotros",
					path: "/",
					pag: false,
					icon: "fas fa-house-user",
					tag: "/#nosotros"
				},
				{
					name: "Contacto",
					path: "/Contacto",
					icon: "fas fa-phone",
					pag: false,
					tag: "/#contacto"
				}
			],
			link: "",
			ir_home: "",
			src_logo: "../../statics/icono.png",
			scrollPosition: null,
			miniState: true,
			mostrarDrawer: false,
			nombre: ""
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
		scrollToElement(menu) {
			if (!menu.pag) {
				this.mostrarDrawer = false;
				const newID = menu.tag.slice(1);
				let el = document.getElementById(newID);
				const target = getScrollTarget(el);
				const offset = el.offsetTop - 65;
				const duration = 0;
				setScrollPosition(target, offset, duration);
			}
			// else{
			// 	this.$router.push(menu.path);
			// }
		},
		login() {
			this.$router.push("/login");
		},
		irRegistro() {
			this.$router.push("/registry");
		},
		mostrar_drawer(){
			this.mostrarDrawer = !this.mostrarDrawer
			// if (this.mostrarDrawer){
			// 	debugger
			// 	const newID = "#portada";
			// 	let el = document.getElementById(newID);
			// 	const target = getScrollTarget(el);
			// 	const offset = el.offsetTop - 65;
			// 	const duration = 0;
			// 	setScrollPosition(target, offset, duration);
			// }
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
		},
		irPublic() {
			this.$router.push("/");
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
