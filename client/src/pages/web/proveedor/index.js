import Vue from "vue";
import { mapGetters } from "vuex";
import ColorThief from "color-thief";
export default Vue.component("Proveedores", {
	$validates: 1,
	components: {
		// tabla:() => import('./tabla/tabla.vue')
	},
	data() {
		return {
			src_fondo: "statics/proveedores.jpg",
			src_persona: "statics/img/cocinero.png",
			filter: "",
			info: {},
			modal_ver_mas: false,
			proveedors: [],
			webs: [],
			emails: [],
			direcciones: [],
			filtro_proveedor: "",
			filtro_web: "",
			filtro_email: "",
			filtro_direccion: "",
			parametros_tabla: {
				title: "Proveedores",
				acciones: [
					{
						accion: "Eliminar",
						icon: "delete",
						cmd: "eliminar"
					},
					{ accion: "Editar", icon: "update", cmd: "editar" }
				],
				navigationActive: false,
				filter: "",
				selected: [],
				pagination: {
					page: 1,
					rowsPerPage: this.getItemsPerPage()
				},
				selectedkey: "codigo",
				columns: [
					{
						name: "proveedor",
						label: "proveedor",
						align: "left",
						field: "proveedor",
						sortable: true
					},
					{
						name: "descripcion",
						align: "center",
						label: "Descripción",
						field: "descripcion",
						sortable: true
					},
					{
						name: "email",
						align: "center",
						label: "Email",
						field: "email",
						sortable: true
					},
					{
						name: "direccion",
						align: "center",
						label: "Direccion",
						field: "direccion",
						sortable: true
					},
					{
						name: "web",
						align: "center",
						label: "Web",
						field: "web",
						sortable: true
					},
					{
						name: "banner",
						align: "center",
						label: "Banner",
						field: "banner",
						sortable: true
					},
					{
						name: "estado",
						align: "center",
						label: "Estado",
						field: "estado",
						sortable: true
					}
				],
				data: []
			},
			base: process.env.BASE_URL
		};
	},
	computed: {
		...mapGetters({
			isLogin: "Auth/isLogin",
			isAdmin: "Auth/isAdmin",
			dataProveedor: "Proveedor/getData"
		}),
		cardContainerClass() {
			if (this.$q.screen.gt.xs) {
				return "grid-masonry--" + (this.$q.screen.gt.sm ? "5" : "5");
			}

			return void 0;
		}
	},
	methods: {
		async iniciar() {
			this.$q.loading.show();
			await this.$store
				.dispatch("Proveedor/cargarProveedor")
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
						// this.getColorBanner(
						// 	this.dataProveedor
						// );
						// console.log("dataProveedor", this.dataProveedor);
						this.parametros_tabla.data = this.dataProveedor;
						this.cargar_filtros(this.dataProveedor);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getItemsPerPage() {
			4;
			if (this.$q.screen.gt.lg) {
				return 5;
			} else {
				return 4;
			}
		},
		// filtrar(filtro, input) {
		// 	this.clean_filters(input);
		// 	this.parametros_tabla.data = this.dataProveedor;
		// 	const data = this.parametros_tabla.data.filter(obj =>
		// 		Object.keys(obj).some(key => obj[key] == filtro)
		// 	);
		// 	this.parametros_tabla.data = data;
		// },
		filtrar(filtro, input) {
			if (filtro) {
				this.clean_filters(input);
				this.parametros_tabla.data = this.dataProveedor;
				const data = this.parametros_tabla.data.filter(obj =>
					Object.keys(obj).some(key => obj[key] == filtro)
				);
				this.parametros_tabla.data = data;
			} else {
				this.parametros_tabla.data = this.dataProveedor;
			}
		},
		clean_filters(input) {
			if (input === "proveedor") {
				this.filtro_email = "";
				this.filtro_direccion = "";
				this.filtro_web = "";
			} else if (input === "direccion") {
				this.filtro_proveedor = "";
				this.filtro_email = "";
				this.filtro_web = "";
			} else if (input === "email") {
				this.filtro_proveedor = "";
				this.filtro_web = "";
				this.filtro_direccion = "";
			} else {
				this.filtro_proveedor = "";
				this.filtro_email = "";
				this.filtro_direccion = "";
			}
		},
		rowsPerPage() {
			if (this.$q.screen.gt.lg) {
				return 5;
			} else {
				return 4;
			}
		},
		truncate(input) {
			if (input.length > 235) return input.substring(0, 235) + "...";
			else return input;
		},
		truncate_proveedor(input) {
			var newWord = input.replace(/<b>/g, "");
			var newW = newWord.replace("</b>", "");
			if (newW.length > 27) return newW.substring(0, 27) + "...";
			else return newW;
		},
		truncate_direccion(input) {
			if (input.length > 35) return input.substring(0, 35) + "...";
			else return input;
		},
		truncate_web(input) {
			if (input.length > 25) return input.substring(0, 25) + "...";
			else return input;
		},
		mostrar_banner(banner) {
			return this.base + banner;
		},
		ver_mas(info) {
			this.info = info;
			this.modal_ver_mas = true;
		},
		ir_web(web) {
			window.location = "http://" + web;
		},
		color_borde(codigo) {
			if (codigo) {
				const colorThief = new ColorThief();
				const img = document.getElementById(codigo);
				debugger;
				// Make sure image is finished loading
				if (img.complete) {
					console.log(colorThief.getColor(img));
					return colorThief.getColor(img);
				} else {
					image.addEventListener("load", function() {
						console.log(colorThief.getColor(img));
						return colorThief.getColor(img);
					});
				}
			}
		},
		cargar_filtros(data) {
			this.proveedors = [...new Set(data.map(d => d.proveedor))];
			this.emails = [...new Set(data.map(d => d.email))];
			this.direcciones = [...new Set(data.map(d => d.direccion))];
			this.webs = [...new Set(data.map(d => d.web))];
		},
		filtrar_datos() {
			return this.parametros_tabla.data.filter(
				d => (d.proveedor = this.filtro_proveedor)
			);
		}
		// getColorBanner(data){
		// 	const colorThief = new ColorThief();
		// 	data.forEach(element => {
		// 		const img = resolve(
		// 			process.cwd(),
		// 			this.base + element.banner
		// 		);;
		// 		debugger
		// 		// const source = this.$refs[codigo];
		// 		const color = colorThief.getColor(img);
		// 		element.color = color;
		// 	});
		// 	this.parametros_tabla.data = data;
		// 				// console.log(this.$refs[codigo]);
		// 				// debugger;
		// 				// const colorThief = new ColorThief();
		// 				// const source = this.$refs[
		// 				// 	codigo
		// 				// ];
		// 				// const color = colorThief.getColor(
		// 				// 	source
		// 				// );
		// 				// return color;
		// }
	},
	created() {
		this.iniciar();
	},
	mounted() {
		// this.$nextTick(() => {
		// 	const colorThief = new ColorThief();
		// 	debugger;
		// 	this.dataProveedor.forEach(element => {
		// 		debugger;
		// 		const color = colorThief.getColor(
		// 			this.$refs[element.codigo]
		// 		);
		// 		debugger;
		// 		element.color = color;
		// 	});
		// });
	},
	updated() {},
	watch: {
		"$q.screen.name"() {
			this.parametros_tabla.pagination.rowsPerPage = this.getItemsPerPage();
		}
	}
});
